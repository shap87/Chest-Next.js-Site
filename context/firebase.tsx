import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import {FirebaseApp, initializeApp} from 'firebase/app';
import {
  ActionCodeSettings,
  Auth,
  browserLocalPersistence,
  browserPopupRedirectResolver,
  connectAuthEmulator,
  getAuth,
  GoogleAuthProvider,
  initializeAuth,
  isSignInWithEmailLink,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  connectFirestoreEmulator,
  Firestore,
  initializeFirestore,
} from 'firebase/firestore';
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from 'firebase/app-check';
import {initializeAnalytics} from 'firebase/analytics';
import {
  getFunctions,
  connectFunctionsEmulator,
  Functions,
} from 'firebase/functions';
import {Timestamp} from 'firebase/firestore';
import SuperJSON from 'superjson';

import Splash from '../components/layout/Splash';

import {firebaseConfig} from './firebaseConfig';

SuperJSON.registerCustom<Timestamp, number>(
  {
    isApplicable: (v): v is Timestamp => v?.constructor.name === 'Timestamp',
    serialize: v => v.toDate().getTime(),
    deserialize: v => Timestamp.fromMillis(v),
  },
  'firestore.Timestamp',
);

export const FirebaseContext = createContext<{
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
  functions: Functions;
}>(null!);

export const useFirebase = () => useContext(FirebaseContext).app;
export const useAuth = () => useContext(FirebaseContext).auth;
export const useFirestore = () => useContext(FirebaseContext).firestore;
export const useFunctions = () => useContext(FirebaseContext).functions;

export const FirebaseContextProvider = (props: PropsWithChildren<{}>) => {
  const [app, setApp] = useState<FirebaseApp>(null!);
  const [auth, setAuth] = useState<Auth>(null!);
  const [firestore, setFirestore] = useState<Firestore>(null!);
  const [functions, setFunctions] = useState<Functions>(null!);

  useEffect(() => {
    try {
      const app = initializeApp(firebaseConfig);
      const auth = initializeAuth(app, {
        persistence: browserLocalPersistence,
        popupRedirectResolver: browserPopupRedirectResolver,
      });
      // connectAuthEmulator(auth, "http://localhost:9099", {
      //   disableWarnings: true,
      // });
      const firestore = initializeFirestore(app, {});

      // connectFirestoreEmulator(firestore, "localhost", 8080);
      // const appCheck = initializeAppCheck(app, {
      //   provider: new ReCaptchaEnterpriseProvider(
      //     process.env.NEXT_PUBLIC_RECAPTCHA_ENTERPRISE_PROVIDER as string
      //   ),
      //   isTokenAutoRefreshEnabled: true, // Set to true to allow auto-refresh.
      // });

      const analytics = initializeAnalytics(app, {
        config: {
          send_page_view: false,
        },
      });

      const functions = getFunctions(app);

      // connectFunctionsEmulator(functions, "localhost", 5001);

      setApp(app);
      setAuth(auth);
      setFirestore(firestore);
      setFunctions(functions);
    } catch {}
  }, []);

  return (
    <FirebaseContext.Provider
      value={{app, auth, firestore, functions}}
      {...props}
    />
  );
};

export function FirebaseReady(props: PropsWithChildren<{}>) {
  const app = useFirebase();

  if (!app) return <Splash />;

  return <>{props.children}</>;
}

export function AuthStateReady(props: PropsWithChildren<{}>) {
  const [isReady, setIsReady] = useState(false);

  const app = useFirebase();

  useEffect(() => {
    if (app) onAuthStateChanged(getAuth(app), () => setIsReady(true));
  }, [app]);

  if (!isReady) return <Splash />;

  return <>{props.children}</>;
}

export const logout = (app: FirebaseApp) => signOut(getAuth(app));

export const signInWithGoogleUser = (app: FirebaseApp) => {
  const auth = getAuth(app);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});

  return signInWithPopup(auth, provider);
};

export const signInWithEmail = (
  app: FirebaseApp,
  email: string,
  link: string,
) => {
  const auth = getAuth(app);

  console.log(link);

  const actionCodeSettings: ActionCodeSettings = {
    url: link,
    handleCodeInApp: true,
  };

  return sendSignInLinkToEmail(auth, email, actionCodeSettings);
};
