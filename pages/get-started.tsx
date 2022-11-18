// libs
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

//components
import { Paragraph } from "../components/common/Paragraph/Paragraph";
import { Button } from "../components/common/Button/Button";
import { Layout } from "../components/common/Layout/Layout";
import { H5 } from "../components/common/H5/H5";

const validationSchemaLogin = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
});

export default function GetStarted() {
  return (
    <Layout
      title='Get Started | Chestr'
      description='"Get Started | Chestr"'>
      <section className='py-12 md:py-28 text-center'>
        <div className='container'>
          <div className='flex flex-wrap items-center justify-between'>
            <div className='w-full md:w-[50%] order-2'>
              <div className='rounded-lg border-8 border-[#F9FAFB]'>
                <img className='rounded-lg' src={'./images/get-started.jpg'} alt='' />
                <Paragraph classname='mt-10'>Save items into wishlists from any online store.</Paragraph>
              </div>
            </div>
            <div className='text-left w-full md:w-[34%] order-1 md:order-3 mb-10 md:0'>
              <H5>Login</H5>
              <Formik
                validationSchema={validationSchemaLogin}
                initialValues={{ email: '' }}
                onSubmit={(values) => {
                  console.log(values, 'values')
                }}>
                <Form>
                  <div className='field'>
                    <label htmlFor="email">Email*</label>
                    <Field tepe='email' name='email' placeholder='Enter your email' />
                    <ErrorMessage className='field-error' name="email" component="p" />
                  </div>
                </Form>
              </Formik>
              <Button classname='w-full !py-2' target='_blank' type='second'>
                Continue
              </Button>
            </div>
          </div>
          <Paragraph classname='mt-20'>
            By continuing, you agree to the <Link href='#'><a>Terms and Conditions</a></Link> and <Link href='#'><a>Privacy
            Policy</a></Link>.
          </Paragraph>
        </div>
      </section>
    </Layout>
  );
}