import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  initializeApp,
  FirebaseApp,
  FirebaseOptions,
} from "firebase/app";
// import {
//   initializeAppCheck,
//   ReCaptchaEnterpriseProvider,
// } from "firebase/app-check";
import {
  browserLocalPersistence,
  browserPopupRedirectResolver,
  connectAuthEmulator,
  initializeAuth,
  User,
} from "firebase/auth";
import {
  connectFirestoreEmulator,
  getFirestore,
} from "firebase/firestore/lite";
// import { useRouter } from "next/router";
import Splash from "../components/Splash";

const options: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

interface Firebase {
  app: FirebaseApp;
  // appCheck: AppCheck;
  // analytics: Analytics;
  // auth: Auth;
  user: User | null;
  // firestore: Firestore;
}

export const FirebaseContext = createContext<Firebase>(null!);

export const useFirebase = () => useContext(FirebaseContext);
// export const useAppCheck = () => useContext(FirebaseContext).appCheck;
// export const useAnalytics = () => useContext(FirebaseContext).analytics;
// export const useAuth = () => useContext(FirebaseContext).auth;
export const useUser = () => useContext(FirebaseContext).user;
// export const useFirestore = () => useContext(FirebaseContext).firestore;

export const FirebaseContextProvider = (props: PropsWithChildren<{}>) => {
  const [user, setUser] = useState<Firebase["user"]>(undefined!);
  const [loaded, setLoaded] = useState<boolean>(false);
  const app = initializeApp(options);

  useEffect(() => {
    // const appCheck = initializeAppCheck(app, {
    //   provider: new ReCaptchaEnterpriseProvider(
    //     process.env.NEXT_PUBLIC_RECAPTCHA_ENTERPRISE_PROVIDER as string
    //   ),
    //   isTokenAutoRefreshEnabled: true, // Set to true to allow auto-refresh.
    // });
    // analytics = initializeAnalytics(app, {
    //   config: {
    //     send_page_view: false,
    //   },
    // });

    const auth = initializeAuth(app, {
      persistence: browserLocalPersistence,
      popupRedirectResolver: browserPopupRedirectResolver,
    });
    // connectAuthEmulator(auth, "http://localhost:9099", {
    //   disableWarnings: true,
    // });
    const firestore = getFirestore(app);
    // connectFirestoreEmulator(firestore, "localhost", 8080);
    return auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoaded(true);
    });
  }, []);

  if (!loaded) return <Splash />;

  return (
    <FirebaseContext.Provider
      value={{
        app,
        user,
      }}
      {...props}
    />
  );
};
