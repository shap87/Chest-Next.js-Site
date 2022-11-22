// libs
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

//components
import { Paragraph } from "../components/common/Paragraph/Paragraph";
import { Button } from "../components/common/Button/Button";
import { Layout } from "../components/common/Layout/Layout";
import { H4 } from "../components/common/H4/H4";

// assets
import styles from "../styles/login.module.scss";
import "swiper/css";
import "swiper/css/pagination";
import { signInWithGoogleUser, useFirebase } from "../context/firebase";

const validationSchemaLogin = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

export default function Login() {
  const firebaseApp = useFirebase()

  const handleSignInWithGoogle = () => {
    signInWithGoogleUser(firebaseApp).then((res) => {
      console.log(res.user);
    }).catch((error) => {
      console.log(error.message)
    })
  };

  return (
    <Layout title="Get Started | Chestr" description='"Get Started | Chestr"'>
      <section className="py-6 md:py-12 text-center">
        <div className="container">
          <div className="flex flex-wrap items-start justify-between">
            <div className="md:pt-4 w-full md:w-[51%] order-2">
              <Swiper
                modules={[Pagination]}
                spaceBetween={10}
                slidesPerView={1}
                pagination={{ clickable: true }}
              >
                <SwiperSlide>
                  <div className={styles.slide}>
                    <div className={styles.image}>
                      <img src={"./images/get-started.jpg"} alt="" />
                    </div>
                    <Paragraph classname={styles.desc}>
                      Save items into wishlists from any online store.
                    </Paragraph>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className={styles.slide}>
                    <div className={styles.image}>
                      <img src={"./images/get-started.jpg"} alt="" />
                    </div>
                    <Paragraph classname={styles.desc}>
                      Save items into wishlists from any online store.
                    </Paragraph>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className={styles.slide}>
                    <div className={styles.image}>
                      <img src={"./images/get-started.jpg"} alt="" />
                    </div>
                    <Paragraph classname={styles.desc}>
                      Save items into wishlists from any online store.
                    </Paragraph>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="text-left w-full md:w-[34%] order-1 md:order-3 mb-10 md:0">
              <div className="md:max-w-[344px]">
                <H4>Login</H4>
                <Button classname="w-full !py-2 !border-[#D0D5DD]" onClick={handleSignInWithGoogle}>
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
                  onSubmit={(values) => {
                    console.log(values, "values");
                  }}
                >
                  {({ isValid }) => (
                    <Form>
                      <div className="field">
                        <label htmlFor="email">Email*</label>
                        <Field
                          tepe="email"
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
            </div>
          </div>
          <Paragraph classname="mt-16 md:mt-36 text-[#98A2B3] !text-xs max-w-[310px] mx-auto">
            By continuing, you agree to the{" "}
            <Link href="#">
              <a className='text-primary text-xs'>Terms and Conditions</a>
            </Link>{" "}
            and{" "}
            <Link href="#">
              <a className='text-primary text-xs'>Privacy Policy</a>
            </Link>
            .
          </Paragraph>
        </div>
      </section>
    </Layout>
  );
}
