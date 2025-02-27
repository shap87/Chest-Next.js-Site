import { useState } from "react";

// libs
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import * as yup from "yup";
import cn from "classnames";


// components
import { Button, H4, LoadingSpinner } from "../../../common";

import {
  signInWithEmail,
  signInWithGoogleUser,
  useFirebase,
} from "../../../../context/firebase";
import firebaseService from "../../../../services/firebase.service";
import { routes } from "../../../../utils/routes";

interface ISignUp {
  setStep: any;
}

const validationSchemaSignUp = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  name: yup.string().required("Name is required"),
});

export const SignUp = ({ setStep }: ISignUp) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const firebaseApp = useFirebase();

  const handleSignUpWithGoogle = () => {
    signInWithGoogleUser(firebaseApp)
      .then(async (res) => {
        console.log(res.user);
        await firebaseService.addNewUser(firebaseApp, String('User'));
        router.push(routes.welcome);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleSignUpWithEmail = (email: string, name: string) => {
    setLoading(true);

    signInWithEmail(
      firebaseApp,
      email,
      `${process.env.NEXT_PUBLIC_EMAIL_LINK_AUTH_URL}sign-up?isEmailLink=1`!
    )
      .then(() => {
        setLoading(false);
        window.localStorage.setItem("emailForSignIn", email);
        window.localStorage.setItem("nameForSignIn", name);
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
        <H4>Sign Up</H4>
        <Button
          classname="w-full !border-[#D0D5DD]"
          onClick={handleSignUpWithGoogle}
          icon="icon-left"
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
          validationSchema={validationSchemaSignUp}
          initialValues={{ email: "", name: "" }}
          onSubmit={(values) => handleSignUpWithEmail(values.email, values.name)}
        >
          {({ isValid, errors }) => (
            <Form>
              <div className="field">
                <label htmlFor="name">Name*</label>
                <Field
                  className={cn({ 'field-error': errors.name })}
                  type="text"
                  name="name"
                  placeholder="Enter your name" />
                <ErrorMessage className="error-message" name="name" component="p" />
              </div>
              <div className="field">
                <label htmlFor="email">Email*</label>
                <Field
                  className={cn({ 'field-error': errors.email })}
                  type="email"
                  name="email"
                  placeholder="Enter your email" />
                <ErrorMessage
                  className="error-message"
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
    </>
  );
};
