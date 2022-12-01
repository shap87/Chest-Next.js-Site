// libs
import cn from "classnames";

// components
import { H1,Paragraph,Button } from "../../../common";
import { routes } from "../../../../utils/routes";

// assets
import styles from "./PinReminder.module.scss";

export const PinReminder = () => {
  return (
    <>
      <div
        className='hidden md:block fixed right-16 top-6'>
        <img className={cn('-rotate-90 -scale-1 ml-auto w-[80px] mb-7', styles.scale)}
             src={"./line.svg"}
             alt="" />
        <Paragraph
          classname='whitespace-nowrap py-1 px-3 bg-[#FFEBF6] text-[#CC0174] font-medium rounded-full text-sm'>
          Pin extension up here!
        </Paragraph>
      </div>
      <H1 classname='!mb-10'>One last thing</H1>
      <div className='max-w-[620px] mx-auto'>
        <Paragraph classname='md:text-xl'>
          Pin the Chestr plugin for easy access.
        </Paragraph>
        <img className='pt-10 md:pt-20 pb-12 md:pb-24' src={"./images/get-started.jpg"} alt="" />
        <Button href={routes.profile} classname='w-full max-w-[343px]' color='pink'>Go to Your Profile</Button>
      </div>
    </>
  )
}