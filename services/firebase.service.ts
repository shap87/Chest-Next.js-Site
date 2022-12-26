import FetchedProduct from '../types/FetchedProduct';
import {Product} from '../types/Product';
import Folder, {Visibility} from '../types/Folder';

import uuid from 'react-uuid';
import {FirebaseApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  Timestamp,
  where,
} from 'firebase/firestore';

import {generateUsernameHelper} from '../utils/helpers/generateUsernameHelper';
import {chunk} from '../utils/helpers/ArrayUtils';

// ! Change later
const profilePictireURL_Example =
  'https://firebasestorage.googleapis.com/v0/b/chestr-app.appspot.com/o/constants%2Fuser.png?alt=media&token=b1f74d09-46bd-45de-8930-c5c23440613a';
export const folderImageUrl_Example =
  'https://firebasestorage.googleapis.com/v0/b/chestr-app.appspot.com/o/constants%2Fdefault-folder.png?alt=media&token=e0dd49a0-d3ab-41b6-95ca-3a1dc02cdf8f';

class FirebaseService {
  async addNewUser(app: FirebaseApp, name: string) {
    const auth = getAuth(app);
    const db = getFirestore(app);

    const user = auth.currentUser;

    if (!user) return; // No user is signed in.

    const querySnapshot = await getDocs(collection(db, 'users'));
    const usersUID = querySnapshot.docs.map(userDoc => userDoc.id);

    if (usersUID.includes(user.uid)) return; // User alredy exists in Firestore

    await setDoc(doc(db, 'users', user.uid), {
      name,
      id: user.uid,
      username: await generateUsernameHelper(name, app),
      onboardingCompleted: false,
      profilePictureUrl: profilePictireURL_Example,
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
    });
  }

  async addNewFolder(
    app: FirebaseApp,
    name: string,
    isPrivate: boolean,
    parentFolder: string = '',
  ) {
    const user = getAuth(app).currentUser;
    if (!user) return;

    const db = getFirestore(app);

    const uniqueId = uuid();

    const newFodler = {
      name,
      private: isPrivate,
      id: uniqueId,
      userId: user.uid,
      imageUrl: folderImageUrl_Example,
      numItems: 0,
      numViews: 0,
      visibility: 1,
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
      parent: parentFolder ? parentFolder : null,
    };

    console.log('New folder', newFodler);

    await setDoc(doc(db, 'folders', uniqueId), newFodler);
  }

  async addNewItem(
    app: FirebaseApp,
    product: FetchedProduct,
    additionalData: {notes: string; folder: string},
  ) {
    const user = getAuth(app).currentUser;
    if (!user) return;

    const db = getFirestore(app);
    const uniqueId = uuid();

    console.log('New product', uniqueId);

    const newProductItem = {
      id: uniqueId,
      productUrl: product.url,
      imageUrl: product.image ?? '',
      description: product?.description ?? null,
      brand: product?.brand ?? '',
      title: product?.title ?? null,
      price: product?.price ?? null,
      priceCurrency: product.priceCurrency ?? null,
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
      parent: additionalData.folder, // Folder userId
      note: additionalData.notes,
      userId: user.uid,
    };

    console.log('newProductItem', newProductItem);

    await setDoc(doc(db, 'products', uniqueId), newProductItem);

    if (product.price) {
      const id = uuid();
      setDoc(doc(db, `products/${uniqueId}/priceHistory`, id), {
        createdAt: Timestamp.fromDate(new Date()),
        price: product.price,
      });
    }
  }

  async getUser(app: FirebaseApp) {
    const user = getAuth(app).currentUser;
    if (!user) return;

    const db = getFirestore(app);
    const querySnapshot = await getDoc(doc(db, 'users', user?.uid!));
    const data = querySnapshot.data();

    console.log(data);

    return {
      username: data?.username,
      name: data?.name,
      uid: user?.uid!,
    };
  }

  getFolder = async (app: FirebaseApp, id?: string) => {
    const db = getFirestore(app);
    const querySnapshot = await getDoc(doc(db, 'folders', id!));
    return querySnapshot.data() as Folder;
  };

  isItemPublic = async (
    app: FirebaseApp,
    parentId: string,
  ): Promise<boolean> => {
    // if the parentId is undefined or empty string, set as public
    if (!parentId || parentId.length === 0) return true;

    const currentFolder = await this.getFolder(app, parentId);

    return currentFolder?.visibility === Visibility.Public;
  };

  getHomeFeed = async (
    app: FirebaseApp,
    userIds: string[],
    hoursAgo: number,
    gap: number,
  ) => {
    const db = getFirestore(app);
    const oldest = new Date(new Date().getTime() - hoursAgo * 60 * 60 * 1000);
    const start = new Date(
      new Date().getTime() - (hoursAgo - gap) * 60 * 60 * 1000,
    );

    const batchProducts = await Promise.all(
      chunk(userIds, 10).map(
        async chunkedUserIds =>
          await (
            await getDocs(
              query(
                collection(db, 'products'),
                where('createdAt', '>', oldest),
                where('createdAt', '<', start),
                where('userId', 'in', chunkedUserIds),
              ),
            )
          ).docs.map(d => d.data() as Product),
      ),
    );

    const allProducts: Product[] = batchProducts.flat();

    return allProducts.filter(
      async product => await this.isItemPublic(app, product.parent),
    );
  };
}

export default new FirebaseService();
