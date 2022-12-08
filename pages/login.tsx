// libs
import {useEffect, useState} from 'react';

//components
import {Layout} from '../components/common';
import {
  GetStartedLayout,
  CheckYourEmail,
  Login,
} from '../components/layout/get-started';

// assets
import 'swiper/css';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {setExampleState} from '../store/modules/exampleSlice';

export default function LoginPage() {
  const [step, setStep] = useState({
    email: '',
    state: '',
  });

  return (
    <Layout title="Login | Chestr" description="Login | Chestr">
      <GetStartedLayout>
        {step.state === 'check-email' ? (
          <CheckYourEmail setStep={setStep} email={step.email} />
        ) : (
          <Login setStep={setStep} />
        )}
      </GetStartedLayout>
    </Layout>
  );
}
