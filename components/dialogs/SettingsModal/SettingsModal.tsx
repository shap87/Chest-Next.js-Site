// libs
import { FC } from "react";

// components
import { Button, ModalBaseLayout } from "../../common";

interface EditProfileProps {
  show: boolean;
  onClose: () => void;
}

export const SettingsModal: FC<EditProfileProps> = ({ show, onClose }) => {

  return (
    <ModalBaseLayout
      show={show}
      maxWidth="673"
      onClose={onClose}
      title={
        <div className="flex flex-row items-center justify-start ">
          <img className="w-5 h-5" src={"./settings.svg"} alt="" />
          <p className="text-[#667085]text-lg font-semibold ml-2.5">
            Settings
          </p>
        </div>
      }>
      <div className="w-full flex flex-col items-center py-10 md:py-24 max-w-[250px] mx-auto">
        <Button classname="w-full mb-10 group" icon="icon-right">
          Sign out
          <img className="group-hover:invert" src={'./sign-out.svg'} alt='' />
        </Button>
        <Button classname="w-full group" icon="icon-right" color="red">
          Delete my account
          <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              className="group-hover:stroke-white"
              d="M11.8333 4.99984V4.33317C11.8333 3.39975 11.8333 2.93304 11.6517 2.57652C11.4919 2.26292 11.2369 2.00795 10.9233 1.84816C10.5668 1.6665 10.1001 1.6665 9.16667 1.6665H7.83333C6.89991 1.6665 6.4332 1.6665 6.07668 1.84816C5.76308 2.00795 5.50811 2.26292 5.34832 2.57652C5.16667 2.93304 5.16667 3.39975 5.16667 4.33317V4.99984M6.83333 9.58317V13.7498M10.1667 9.58317V13.7498M1 4.99984H16M14.3333 4.99984V14.3332C14.3333 15.7333 14.3333 16.4334 14.0608 16.9681C13.8212 17.4386 13.4387 17.821 12.9683 18.0607C12.4335 18.3332 11.7335 18.3332 10.3333 18.3332H6.66667C5.26654 18.3332 4.56647 18.3332 4.03169 18.0607C3.56129 17.821 3.17883 17.4386 2.93915 16.9681C2.66667 16.4334 2.66667 15.7333 2.66667 14.3332V4.99984"
              stroke="#B42318" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Button>
      </div>
    </ModalBaseLayout>
  );
};
