import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useFirebase } from "../context/firebase";
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";

import firebaseService from "../services/firebase.service";
import { routes } from "../utils/routes";

//components
import { Layout } from "../components/common";
import { GetStartedLayout } from "../components/layout/get-started/GetStartedLayout/GetStartedLayout";
import { CheckYourEmail } from "../components/layout/get-started/CheckYourEmail/CheckYourEmail";
import { SignUp } from "../components/layout/get-started/SignUp/SignUp";
import Splash from "../components/layout/Splash";

// assets
import "swiper/css";
import "swiper/css/pagination";

export default function SignUpLayout() {
  const router = useRouter();
  const firebaseApp = useFirebase();

  const [step, setStep] = useState({
    email: "",
    state: "",
  });

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
      }

      let name = window.localStorage.getItem("nameForSignIn");
      if (!name) {
        name = window.prompt("Please provide your name")!;
      }

      signInWithEmailLink(auth, email!, window.location.href)
        .then(async () => {
          window.localStorage.removeItem("emailForSignIn");
          window.localStorage.removeItem("nameForSignIn");

          await firebaseService.addNewUser(firebaseApp, String(name));
          router.push(routes.welcome);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [router]);

  if (Number(router.query?.isEmailLink)) {
    return <Splash />;
  }

  return (
    <Layout title="Sign Up | Chestr" description="Sign Up | Chestr">
      <GetStartedLayout>
        {step.state === "check-email" ? (
          <CheckYourEmail setStep={setStep} email={step.email} />
        ) : step.state === "welcome" ? (
          ""
        ) : (
          <SignUp setStep={setStep} />
        )}
      </GetStartedLayout>
    </Layout>
  );
}
