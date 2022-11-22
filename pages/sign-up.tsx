import { useState } from "react";

//components
import { Layout } from "../components/common/Layout/Layout";
import { GetStartedLayout } from "../components/get-started/GetStartedLayout/GetStartedLayout";
import { CheckYourEmail } from "../components/get-started/CheckYourEmail/CheckYourEmail";
import { SignUp } from "../components/get-started/SignUp/SignUp";

// assets
import "swiper/css";
import "swiper/css/pagination";

export default function Login() {
  const [step, setStep] = useState('');

  return (
    <Layout title="Get Started | Chestr" description='"Get Started | Chestr"'>
      <GetStartedLayout>
        {step === 'check-email'
          ? <CheckYourEmail setStep={setStep} />
          : step === 'welcome' ? ''
            : <SignUp setStep={setStep} />}
      </GetStartedLayout>
    </Layout>
  );
}
