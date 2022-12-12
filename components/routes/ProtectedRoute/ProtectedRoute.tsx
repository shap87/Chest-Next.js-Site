import {getAuth} from 'firebase/auth';
import {
  collection,
  doc,
  getFirestore,
  onSnapshot,
  where,
} from 'firebase/firestore';
import {query} from 'firebase/firestore/lite';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {useFirebase, useFirestore} from '../../../context/firebase';
import {useAppDispatch} from '../../../hooks/redux';

import firebaseService from '../../../services/firebase.service';
import {FolderType, setFolders} from '../../../store/modules/folders/foldersSlice';
import {getUser} from '../../../store/modules/user/actionCreator';

import {routes} from '../../../utils/routes';

export const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
  const router = useRouter();
  const app = useFirebase();
  const firestore = useFirestore();
  const dispatch = useAppDispatch();

  const user = getAuth(app).currentUser;

  useEffect(() => {
    const ref = query(
      collection(firestore, 'folders'),
      where('userId', '==', user?.uid ?? ''),
    );
    const unsub = onSnapshot(ref, querySnapshot => {
      const folders: FolderType[] = [];
      querySnapshot.forEach(doc => {
        folders.push(doc.data() as FolderType);
      });

      dispatch(setFolders(folders));
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user) {
      router.push(routes.login);
    } else {
      dispatch(getUser(app));
    }
  }, [user]);

  return <>{children}</>;
};
