import {FirebaseApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import uuid from 'react-uuid';
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

  async addNewFolder(app: FirebaseApp, name: string) {
    console.log(name);

    const user = getAuth(app).currentUser;
    if (!user) return;

    const db = getFirestore(app);

    const uniqueId = uuid();

    await setDoc(doc(db, 'folders', uniqueId), {
      name,
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
}

export default new FirebaseService();
