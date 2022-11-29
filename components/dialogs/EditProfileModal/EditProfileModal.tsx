// libs
import { FC, useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

// components
import { Button, Modal, ModalBaseLayout } from "../../common";

interface EditProfileProps {
  show: boolean;
  onClose: () => void;
}

const validationSchemaEditProfile = yup.object().shape({
  name: yup.string().required("Name is required"),
  username: yup.string().required("Name is required"),
});

export const EditProfileModal: FC<EditProfileProps> = ({ show, onClose }) => {
  const [showSavedMessage, setShowSavedMessage] = useState<boolean>();
  const [avatar, setAvatar] = useState<any>(null);
  const [file, setFile] = useState<Blob | null>(null);

  useEffect(() => {
    setShowSavedMessage(false);
  }, [show]);

  useEffect(() => {
    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result)
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  return (
    <Modal show={show} containerId="edit-profile-dialog">
      <ModalBaseLayout
        maxWidth="673"
        onClose={onClose}
        title={
          <div className="flex flex-row items-center justify-start ">
            <img className="w-5 h-5" src={"./edit.svg"} alt="" />
            <p className="text-[#667085]text-lg font-semibold ml-2.5">
              Edit profile
            </p>
          </div>
        }>
        <div className={`w-full flex justify-center absolute -top-20 ${showSavedMessage ? "" : "hidden"}`}>
          <div
            className="w-[185px] bg-[#FFF4FA] p-2 flex flex-row justify-center items-center border-[1px] border-[#FF9AD4] rounded-[10px]">
            <img className="w-[18px] h-[13px]" src={"./check-pink.svg"} alt="" />
            <h4 className="font-['Inter-Semibold'] text-lg text-[#FF0098] ml-4">
              Profile saved
            </h4>
          </div>
        </div>
        <div className="w-full flex flex-col items-center">
          <Formik
            validationSchema={validationSchemaEditProfile}
            initialValues={{ name: '', username: '' }}
            onSubmit={() => {
              setShowSavedMessage(true);
              setTimeout(() => {
                setShowSavedMessage(false);
              }, 2000)
            }}>
            {({ isValid, values }) => (
              <Form className="w-full max-w-[336px] flex flex-col items-center px-3 pt-7">
                <div className="field !mb-8">
                  <label className="cursor-pointer group !mb-0">
                    <input
                      hidden
                      name="file"
                      type="file"
                      onChange={(event: any) => setFile(event.currentTarget.files[0])} />
                    {avatar
                      ? <img
                        className="w-[66px] h-[66px] border-2 border-white drop-shadow-md rounded-full"
                        src={avatar} alt="Avatar" />
                      : <img
                        className="w-[66px] h-[66px] border-2 border-white drop-shadow-md rounded-full"
                        src={"./images/avatar.png"} alt="Avatar" />}
                    <div
                      className="bg-[#FFF4FA] w-[27px] h-[27px] flex justify-center items-center absolute bottom-0 -right-3 rounded-full group-hover:opacity-50 transition-all">
                      <img
                        className="w-[19px] h-[18px]"
                        src={"./upload-cloud.svg"}
                        alt="Avatar"
                      />
                    </div>
                  </label>
                </div>
                <div className="w-full">
                  <div className="field !mb-5">
                    <label htmlFor="name">Name</label>
                    <Field type="text" name="name" placeholder="Enter your name" />
                    <ErrorMessage className="field-error" name="name" component="p" />
                  </div>
                  <div className="field !mb-12">
                    <label htmlFor="username" className="!flex justify-between items-center overflow-hidden">
                      Username
                      <span className="text-[#CC0174] text-sm font-semibold no-underline ml-2">
                        chestr.app/{values.username}
                      </span>
                    </label>
                    <div className="flex items-center">
                      <span
                        className="h-[42px] w-[39px] border-[1px] rounded-lg rounded-r-none border-r-0 flex items-center justify-center">
                        @
                      </span>
                      <Field
                        className="!rounded-l-none"
                        type="text"
                        name="username"
                        placeholder="Enter your username" />
                    </div>
                    <ErrorMessage className="field-error" name="username" component="p" />
                  </div>
                </div>
                <Button disabled={!isValid} htmlType="submit" color="pink" classname="w-full max-w-[211px]">
                  Save
                  <img className="!w-4 ml-3 !mr-0" src={"./check.svg"} alt="" />
                </Button>
              </Form>)}
          </Formik>
        </div>
      </ModalBaseLayout>
    </Modal>
  );
};
