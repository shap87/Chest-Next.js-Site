import uuid from 'react-uuid';
import {FirebaseApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import {getFunctions, httpsCallable} from 'firebase/functions';

import {generateUsernameHelper} from '../utils/helpers/generateUsernameHelper';

// ! Change later
const profilePictireURL_Example =
  'https://firebasestorage.googleapis.com/v0/b/chestr-app.appspot.com/o/constants%2Fuser.png?alt=media&token=b1f74d09-46bd-45de-8930-c5c23440613a';
const folderImageUrl_Example =
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

  async addNewFolder(app: FirebaseApp, name: string, isPrivate: boolean) {
    const user = getAuth(app).currentUser;
    if (!user) return;

    const db = getFirestore(app);

    const uniqueId = uuid();

    console.log('New folder', uniqueId);

    await setDoc(doc(db, 'folders', uniqueId), {
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
    });
  }

  async addNewItem(app: FirebaseApp, url: string) {
    const functions = getFunctions(app);
    const result = await httpsCallable(functions, 'fetchProductData')({url});

    if (!result?.data) return;

    const db = getFirestore(app);

    const fetchedData: any = result.data;
    const uniqueId = uuid();

    console.log('New product', uniqueId);

    await setDoc(doc(db, 'products', uniqueId), {
      id: uniqueId,
      productUrl: url,
      description: fetchedData?.description ?? null,
      brand: fetchedData?.brand ?? '',
      title: fetchedData?.title ?? null,
      priceHistory: [fetchedData?.price] ?? null,
      priceCurrency: fetchedData.priceCurrency ?? null,
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
      parent: null, // Folder id
    });
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

  async getFodlers(app: FirebaseApp) {
    const user = getAuth(app).currentUser;
    if (!user) return;

    const db = getFirestore(app);
    const querySnapshot = await getDoc(doc(db, 'users', user?.uid!));
  }
}

export default new FirebaseService();
