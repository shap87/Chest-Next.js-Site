// libs
import { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import * as yup from "yup";

// components
import { H4 } from "../../common/H4/H4";
import { Button } from "../../common/Button/Button";

import {
  signInWithEmail,
  signInWithGoogleUser,
  useFirebase,
} from "../../../context/firebase";
import { routes } from "../../../utils/routes";
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";

interface ISignUp {
  setStep: (value: string) => void;
}

const validationSchemaLogin = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  name: yup.string().required("Name is required"),
});

export const SignUp = ({ setStep }: ISignUp) => {
  const router = useRouter();
  const firebaseApp = useFirebase();

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
          console.log("Success");
          router.push(routes.welcome);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const handleSignUpWithGoogle = () => {
    signInWithGoogleUser(firebaseApp)
      .then((res) => {
        console.log(res.user);
        router.push(routes.welcome);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleSignUpWithEmail = (email: string) => {
    signInWithEmail(
      firebaseApp,
      email,
      `${process.env.NEXT_PUBLIC_EMAIL_LINK_AUTH_URL}/sign-up`!
    )
      .then(() => {
        setStep("check-email");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="md:max-w-[344px]">
      <H4>Sign Up</H4>
      <Button
        classname="w-full !border-[#D0D5DD]"
        onClick={handleSignUpWithGoogle}
      >
        <img src={"./google.svg"} alt="" />
        Continue with Google
      </Button>
      <div className="relative flex py-3 md:py-6 px-2 md:px-4 items-center">
        <div className="flex-grow border-t border-[#EAECF0]" />
        <span className="flex-shrink mx-4 text-[#98A2B3]">or</span>
        <div className="flex-grow border-t border-[#EAECF0]" />
      </div>
      <Formik
        validationSchema={validationSchemaLogin}
        initialValues={{ email: "", name: "" }}
        onSubmit={(values) => handleSignUpWithEmail(values.email)}
      >
        {({ isValid, values }) => (
          <Form>
            <div className="field">
              <label htmlFor="email">Name*</label>
              <Field type="text" name="name" placeholder="Enter your name" />
              <ErrorMessage className="field-error" name="name" component="p" />
            </div>
            <div className="field">
              <label htmlFor="email">Email*</label>
              <Field type="email" name="email" placeholder="Enter your email" />
              <ErrorMessage
                className="field-error"
                name="email"
                component="p"
              />
            </div>
            <Button
              htmlType="submit"
              disabled={!isValid}
              classname="w-full !py-2 !text-base"
              target="_blank"
              color="pink"
            >
              Continue
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
