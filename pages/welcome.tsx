//components
import { Layout } from "../components/common/Layout/Layout";
import { DownloadApp } from "../components/welcome/DownloadApp/DownloadApp";
import { PinReminder } from "../components/welcome/PinReminder/PinReminder";
import { useState } from "react";

export default function Login() {
  const [isReminderStep, setIsReminderStep] = useState(false);

  return (
    <Layout noButton title="Welcome | Chestr" description="Welcome | Chestr">
      <section className='text-center py-4 md:py-8'>
        <div className='container'>
          {isReminderStep ? <PinReminder /> : <DownloadApp setIsReminderStep={setIsReminderStep} />}
        </div>
      </section>
    </Layout>
  );
}
