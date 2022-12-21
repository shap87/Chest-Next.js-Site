// libs
import {FC, useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as yup from 'yup';
import cn from 'classnames';

// components
import {Button, H6, ModalBaseLayout, Paragraph, Toggle} from '../../common';
import PlusIcon from '../../icons/PlusIcon';
import firebaseService from '../../../services/firebase.service';
import {useFirebase} from '../../../context/firebase';

interface AddNewSubFolderModalProps {
  show: boolean;
  onClose: () => void;
  parentFolder: {
    id: string;
    name: string;
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

  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  const handleSubmit = async (values: {name: string}) => {
    await firebaseService.addNewFolder(
      firebaseApp,
      values.name,
      isPrivate,
      parentFolder.id,
    );
    onClose();
  };

  return (
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
                <div className="flex items-center justify-center mb-6 md:mb-12 gap-3">
                  <img className="w-5" src="/lock-black.svg" alt="" />
                  <Paragraph classname="font-medium !mb-0">
                    Make private
                  </Paragraph>
                  <Toggle
                    value={isPrivate}
                    onChange={e => {
                      setIsPrivate(e.currentTarget.checked);
                    }}
                  />
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
  );
};
