// libs
import { FC } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import cn from "classnames";

// components
import { Button, ModalBaseLayout } from "../../common";

interface EditProfileProps {
  show: boolean;
  onClose: () => void;
}

const validationSchemaEditProfile = yup.object().shape({
  name: yup.string().required("Name is required"),
});

export const AddNewFolderModal: FC<EditProfileProps> = ({ show, onClose, }) => {
  const handleSubmit = async (values: { name: string }) => {
    console.log(values, 'name')
    onClose();
  };

  return (
    <ModalBaseLayout
      show={show}
      maxWidth="673"
      onClose={onClose}
      icon={"./folder-empty.svg"}
      title="Add new folder">
      <div className="w-full flex flex-col items-center">
        <Formik
          validationSchema={validationSchemaEditProfile}
          initialValues={{ name: "" }}
          onSubmit={handleSubmit}>
          {({ isValid, errors }) => (
            <Form className="w-full max-w-[440px] flex flex-col items-center px-3 pt-12 md:pt-24 pb-14 md:pb-28">
              <div className="w-full">
                <div className="field !mb-10">
                  <div className="relative">
                    <img className="absolute z-10 left-3 top-1/2 -translate-y-1/2 w-5" src={'./edit-with-line.svg'}
                         alt='' />
                    <Field
                      className={cn("!pl-10", { 'field-error': errors.name })}
                      type="text"
                      name="name"
                      placeholder="Enter your title like “books” etc."
                    />
                  </div>
                  <ErrorMessage
                    className="error-message"
                    name="name"
                    component="p"
                  />
                </div>
              </div>
              <Button
                disabled={!isValid}
                htmlType="submit"
                color="pink"
                classname="w-full max-w-[220px] group"
                icon="icon-right"
              >
                Add Folder
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="group-hover:stroke-[#FF0098]" d="M6.99984 1.16663V12.8333M1.1665 6.99996H12.8332"
                        stroke="white" strokeWidth="1.66667"
                        strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </ModalBaseLayout>
  );
};
