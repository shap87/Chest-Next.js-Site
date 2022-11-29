// components
import { H1, Paragraph, Button } from "../../../common";

interface IDownloadApp {
  setIsReminderStep: (value: boolean) => void
}

export const DownloadApp = ({ setIsReminderStep }: IDownloadApp) => {
  return (
    <>
      <H1 classname='!mb-5'>Welcome to Chestr!</H1>
      <div className='max-w-[343px] mx-auto'>
        <Paragraph classname='md:text-xl'>
          We also have an iPhone app that let’s you save things from mobile.
        </Paragraph>
        <div className='md:px-11'>
          <div className='relative pt-6 md:pt-0'>
            <div
              className='absolute left-1/2 md:-left-6 top-4 md:top-1/2 -translate-x-1/2 md:-translate-x-full md:-translate-y-1/2'>
              <Paragraph
                classname='whitespace-nowrap py-1 px-3 bg-[#FFEBF6] text-[#CC0174] font-medium rounded-full text-sm'>
                Scan to download
              </Paragraph>
              <img className='hidden md:block ml-auto w-[80px]' src={"./line.svg"} alt="" />
            </div>
            <img className='mt-4 md:mt-8 mb-6 md:mb-8' src={"./images/qr-code.jpg"} alt="" />
          </div>
          <Button href="#" classname='w-full mb-8 md:mb-16' color='light-pink'>
            <img src={"./apple.svg"} alt="" />
            Download on App Store
          </Button>
        </div>
        <Button onClick={() => setIsReminderStep(true)} classname='w-full' color='pink'>Continue</Button>
      </div>
    </>
  )
}