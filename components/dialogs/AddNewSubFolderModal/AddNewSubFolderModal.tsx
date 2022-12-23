// libs
import {FC, useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as yup from 'yup';
import cn from 'classnames';
import firebaseService from '../../../services/firebase.service';
import {useFirebase} from '../../../context/firebase';

// components
import {Button, H6, ModalBaseLayout} from '../../common';
import PlusIcon from '../../icons/PlusIcon';

interface AddNewSubFolderModalProps {
  show: boolean;
  onClose: () => void;
  parentFolder: {
    id: string;
    name: string;
    private: boolean;
  };
}

const validationSchemaEditProfile = yup.object().shape({
  name: yup.string().required('Name is required'),
});

export const AddNewSubFolderModal: FC<AddNewSubFolderModalProps> = ({
  show,
  onClose,
  parentFolder,
}) => {
  const firebaseApp = useFirebase();

  const handleSubmit = async (values: {name: string}) => {
    await firebaseService.addNewFolder(
      firebaseApp,
      values.name,
      parentFolder.private,
      parentFolder.id,
    );
    onClose();
  };

  return (
    <>
      <ModalBaseLayout
        show={show}
        maxWidth="673"
        onClose={onClose}
        icon="/folder-empty.svg"
        title="Add new sub folder">
        <div className="w-full flex flex-col items-center">
          <Formik
            validationSchema={validationSchemaEditProfile}
            initialValues={{name: ''}}
            onSubmit={handleSubmit}>
            {({isValid, errors}) => (
              <Form className="w-full max-w-[540px] flex flex-col items-center px-3 pt-12 md:pt-24 pb-6 md:pb-12">
                <div className="w-full">
                  <div className="field !mb-10 flex items-center">
                    <H6 classname="text-[#98A2B3] !mb-0 mr-3">
                      {parentFolder.name} /
                    </H6>
                    <div className="relative flex-1">
                      <div className="relative">
                        <img
                          className="absolute z-10 left-3 top-1/2 -translate-y-1/2 w-5"
                          src="/edit-with-line.svg"
                          alt=""
                        />
                        <Field
                          className={cn('!pl-10', {'field-error': errors.name})}
                          type="text"
                          name="name"
                          placeholder="Enter your title like “new books” etc."
                        />
                      </div>
                      <ErrorMessage
                        className="error-message"
                        name="name"
                        component="p"
                      />
                    </div>
                  </div>
                </div>
                <Button
                  disabled={!isValid}
                  htmlType="submit"
                  color="pink"
                  classname="w-full max-w-[220px] group"
                  icon="icon-right">
                  Add Sub Folder
                  <PlusIcon className="stroke-white group-hover:stroke-main-500" />
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </ModalBaseLayout>
    </>
  );
};
