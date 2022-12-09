import {getAuth} from 'firebase/auth';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {useFirebase} from '../../../context/firebase';
import {useAppDispatch} from '../../../hooks/redux';
import firebaseService from '../../../services/firebase.service';
import {routes} from '../../../utils/routes';

export const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
  const router = useRouter();
  const app = useFirebase();
  const dispatch = useAppDispatch();

  const user = getAuth(app).currentUser;

  useEffect(() => {
    if (!user) {
      router.push(routes.login);
    } else {
      firebaseService.getUser(app).then(userData => {
        console.log(userData);

        dispatch({
          type: 'UPDATE_USER',
          payload: userData,
        });
      });
    }
  }, [user]);

  return <>{children}</>;
};
