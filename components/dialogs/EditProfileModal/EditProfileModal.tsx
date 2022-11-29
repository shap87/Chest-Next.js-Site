import { FC, useState, useEffect } from "react";
import { Modal, ModalBaseLayout } from "../../common";

interface EditProfileProps {
  show: boolean;
  onClose: () => void;
}

export const EditProfileModal: FC<EditProfileProps> = ({ show, onClose }) => {
  const [showSavedMessage, setShowSavedMessage] = useState<boolean>();

  useEffect(() => {
    setShowSavedMessage(false);
  }, [show]);

  return (
    <Modal show={show} containerId="edit-profile-dialog">
      <ModalBaseLayout
        onClose={onClose}
        title={
          <div className="flex flex-row items-center justify-start ">
            <img
              style={{ width: "19.33px", height: "19.33px" }}
              src={"./edit.svg"}
              alt=""
            />
            <p className="text-[#667085]text-lg font-semibold ml-2.5">
              Edit profile
            </p>
          </div>
        }
      >
        <div
          className={`w-full flex justify-center absolute -top-20 ${
            showSavedMessage ? "" : "hidden"
          }`}
        >
          <div className="w-[185px] bg-[#FFF4FA] p-2 flex flex-row justify-center items-center border-[1px] border-[#FF9AD4] rounded-[10px]">
            <img className="w-[18px] h-[13px]" src={"./check-pink.svg"} />
            <h4 className="font-['Inter-Semibold'] text-lg text-[#FF0098] ml-4">
              Profile saved
            </h4>
          </div>
        </div>
        <div
          style={{ width: "673px" }}
          className={"flex flex-col items-center"}
        >
          <div
            style={{ width: "320px" }}
            className="flex flex-col items-center p-3"
          >
            <div className="relative">
              <img
                className="max-w-[66px] border-2 border-white drop-shadow-md rounded-full"
                src={"./images/avatar.png"}
                alt="Avatar"
              />

              <div className="bg-[#FFF4FA] w-[27px] h-[27px] flex justify-center items-center absolute bottom-0 -right-2 rounded-full">
                <img
                  className="w-[19px] h-[18px]"
                  src={"./upload-cloud.svg"}
                  alt="Avatar"
                />
              </div>
            </div>

            <div className="mt-[32px] mb-[49px]">
              <div className="flex flex-col mb-[24px] w-[320px]">
                <label className="text-[#344054] text-sm font-medium mb-1">
                  Name
                </label>
                <input value="Faruk Shuaibu" />
              </div>

              <div className="flex flex-col">
                <div className="flex flex-row items-center justify-between">
                  <label className="text-[#344054] before:text-sm font-medium mb-1">
                    Usename
                  </label>
                  <label className="text-[#CC0174] text-sm font-semibold">
                    chestr.app/ligma001
                  </label>
                </div>
                <div className="flex flex-row items-center justify-start w-[320px]">
                  <label className="h-[42px] w-[39px] border-[1px] rounded-lg rounded-br-none rounded-tr-none border-r-0 flex items-center justify-center">
                    @
                  </label>
                  <input
                    value="ligma001"
                    className="rounded-bl-none rounded-tl-none"
                  />
                </div>
              </div>
            </div>

            <button
              className="flex flex-row bg-[#E0007F] justify-center items-center rounded-lg py-2.5 px-[73px] mb-3"
              onClick={() => setShowSavedMessage(true)}
            >
              <p className="mr-[12px] text-white font-['Inter-Semibold']">
                Save
              </p>
              <img src={"./check.svg"} />
            </button>
          </div>
        </div>
      </ModalBaseLayout>
    </Modal>
  );
};
