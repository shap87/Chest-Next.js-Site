// libs
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

//components
import { Button } from "../components/common/Button/Button";
import { Layout } from "../components/common/Layout/Layout";
import { H4 } from "../components/common/H4/H4";

// assets
import "swiper/css";
import "swiper/css/pagination";
import { signInWithGoogleUser, useFirebase } from "../context/firebase";
import { useRouter } from "next/router";
import { routes } from "../utils/routes";
import { GetStartedLayout } from "../components/get-started/GetStartedLayout/GetStartedLayout";

const validationSchemaLogin = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  name: yup
    .string()
    .required("Name is required"),
});

export default function Login() {
  const router = useRouter();
  const firebaseApp = useFirebase()

  const handleSignInWithGoogle = () => {
    signInWithGoogleUser(firebaseApp).then((res) => {
      console.log(res.user);
      router.push(routes.profile)
    }).catch((error) => {
      console.log(error.message)
    })
  };

  return (
    <Layout title="Get Started | Chestr" description='"Get Started | Chestr"'>
      <GetStartedLayout>
        <div className="md:max-w-[344px]">
          <H4>Sign Up</H4>
          <Button classname="w-full !py-2 !border-[#D0D5DD]" onClick={handleSignInWithGoogle}>
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
            onSubmit={(values) => {
              console.log(values, "values");
            }}
          >
            {({ isValid }) => (
              <Form>
                <div className="field">
                  <label htmlFor="email">Name*</label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                  />
                  <ErrorMessage
                    className="field-error"
                    name="name"
                    component="p"
                  />
                </div>
                <div className="field">
                  <label htmlFor="email">Email*</label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                  />
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
                  type="second"
                >
                  Continue
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </GetStartedLayout>
    </Layout>
  );
}
