// libs
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import * as yup from "yup";

// components
import { Button, H4 } from "../../../common";

import {
  signInWithEmail,
  signInWithGoogleUser,
  useFirebase,
} from "../../../../context/firebase";
import { routes } from "../../../../utils/routes";
import { generateUsernameHelper } from "../../../../utils/helpers/generateUsernameHelper";

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

  const firebaseApp = useFirebase();

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

  const handleSignUpWithEmail = (email: string, name: string) => {
    signInWithEmail(
      firebaseApp,
      email,
      `${
        process.env.NEXT_PUBLIC_EMAIL_LINK_AUTH_URL
      }sign-up?isEmailLink=1`!
    )
      .then(() => {
        window.localStorage.setItem("emailForSignIn", email);
        window.localStorage.setItem("nameForSignIn", name);
        setStep({
          email,
          state: "check-email",
        });
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
        {({ isValid }) => (
          <Form>
            <div className="field">
              <label htmlFor="name">Name*</label>
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
