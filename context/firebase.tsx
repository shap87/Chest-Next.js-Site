import { FirebaseApp, initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  browserPopupRedirectResolver,
  connectAuthEmulator,
  getAuth,
  GoogleAuthProvider,
  initializeAuth,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import {
  connectFirestoreEmulator,
  initializeFirestore,
} from "firebase/firestore";
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "firebase/app-check";
import { initializeAnalytics } from "firebase/analytics";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import Splash from "../components/Splash";
import { Timestamp } from "firebase/firestore";
import SuperJSON from "superjson";

import { firebaseConfig } from "./firebaseConfig";

SuperJSON.registerCustom<Timestamp, number>(
  {
    isApplicable: (v): v is Timestamp => v?.constructor.name === "Timestamp",
    serialize: (v) => v.toDate().getTime(),
    deserialize: (v) => Timestamp.fromMillis(v),
  },
  "firestore.Timestamp"
);

export const FirebaseContext = createContext<FirebaseApp>(null!);
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseContextProvider = (props: PropsWithChildren<{}>) => {
  const [app, setApp] = useState<FirebaseApp>(null!);

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
    } catch {}
  }, []);

  return <FirebaseContext.Provider value={app} {...props} />;
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

export const signInWithGoogleUser = (app: FirebaseApp) => {
  const auth = getAuth(app);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  return signInWithPopup(auth, provider);
};