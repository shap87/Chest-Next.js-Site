// libs
import {FC} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as yup from 'yup';
import cn from 'classnames';

// components
import {Button, ModalBaseLayout} from '../../common';
import {useFirebase} from '../../../context/firebase';
import firebaseService from '../../../services/firebase.service';
import PlusIcon from '../../icons/PlusIcon';

interface EditProfileProps {
  show: boolean;
  onClose: () => void;
}

const validationSchemaEditProfile = yup.object().shape({
  name: yup.string().required('Name is required'),
});

export const AddNewFolderModal: FC<EditProfileProps> = ({show, onClose}) => {
  const firebaseApp = useFirebase();

  const handleSubmit = async (values: {name: string}) => {
    const isPrivate = false;
    await firebaseService.addNewFolder(firebaseApp, values.name, isPrivate);
    onClose();
  };

  return (
    <ModalBaseLayout
      show={show}
      maxWidth="673"
      onClose={onClose}
      icon={'./folder-empty.svg'}
      title="Add new folder">
      <div className="w-full flex flex-col items-center">
        <Formik
          validationSchema={validationSchemaEditProfile}
          initialValues={{name: ''}}
          onSubmit={handleSubmit}>
          {({isValid, errors}) => (
            <Form className="w-full max-w-[440px] flex flex-col items-center px-3 pt-12 md:pt-24 pb-14 md:pb-28">
              <div className="w-full">
                <div className="field !mb-10">
                  <div className="relative">
                    <img
                      className="absolute z-10 left-3 top-1/2 -translate-y-1/2 w-5"
                      src={'./edit-with-line.svg'}
                      alt=""
                    />
                    <Field
                      className={cn('!pl-10', {'field-error': errors.name})}
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
                icon="icon-right">
                Add Folder
                <PlusIcon className="stroke-white group-hover:stroke-main-500" />
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </ModalBaseLayout>
  );
};
