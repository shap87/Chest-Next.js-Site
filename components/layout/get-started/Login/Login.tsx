import { useEffect, useState } from "react";

// libs
import { useRouter } from "next/router";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import * as yup from "yup";
import cn from "classnames";

// components
import { Button, H4, LoadingSpinner } from "../../../common";
import { signInWithEmail, signInWithGoogleUser, useFirebase } from "../../../../context/firebase";
import firebaseService from "../../../../services/firebase.service";
import { routes } from "../../../../utils/routes";

const validationSchemaLogin = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

interface ILogin {
  setStep: any;
}


export const Login = ({ setStep }: ILogin) => {
  const router = useRouter();
  const firebaseApp = useFirebase();

  const [loading, setLoading] = useState(false);

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
          console.log("Success - Home");
          router.push(routes.home);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const handleSignInWithGoogle = () => {
    signInWithGoogleUser(firebaseApp)
      .then(async (res) => {
        console.log(res.user);
        await firebaseService.addNewUser(firebaseApp, String('User'));
        router.push(routes.profile);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleSignInWithEmail = (email: string) => {
    setLoading(true);
    signInWithEmail(firebaseApp, email, `${process.env.NEXT_PUBLIC_EMAIL_LINK_AUTH_URL}/login`!)
      .then(() => {
        setLoading(false);
        window.localStorage.setItem("emailForSignIn", email);
        setStep({
          email,
          state: "check-email",
        });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="md:max-w-[344px]">
        <H4>Login</H4>
        <Button
          classname="w-full !border-[#D0D5DD]"
          onClick={handleSignInWithGoogle}
          icon="icon-left">
          <img src={"./google.svg"} alt="" />
          Get Chestr - It’s Free
        </Button>
        <div className="relative flex py-3 md:py-6 px-2 md:px-4 items-center">
          <div className="flex-grow border-t border-[#EAECF0]" />
          <span className="flex-shrink mx-4 text-[#98A2B3]">or</span>
          <div className="flex-grow border-t border-[#EAECF0]" />
        </div>
        <Formik
          validationSchema={validationSchemaLogin}
          initialValues={{ email: "" }}
          onSubmit={(values) => handleSignInWithEmail(values.email)}
        >
          {({ isValid, errors }) => (
            <Form>
              <div className="field">
                <label htmlFor="email">Email*</label>
                <Field
                  className={cn({ 'field-error': errors.email })}
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  className="error-message"
                  name="email"
                  component="p"
                />
              </div>
              <Button
                htmlType="submit"
                disabled={!isValid}
                classname="w-full !text-base"
                target="_blank"
                color="pink">
                Continue
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}