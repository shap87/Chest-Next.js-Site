import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useFirebase } from "../context/firebase";
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";

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

  console.log(router.query);

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
      }
      signInWithEmailLink(auth, email!, window.location.href)
        .then(() => {
          window.localStorage.removeItem("emailForSignIn");
          console.log("Success - Welcome");
          router.push(routes.welcome);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

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
