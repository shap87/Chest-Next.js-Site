// libs
import {FC} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as yup from 'yup';
import cn from 'classnames';

// components
import {Button, ModalBaseLayout} from '../../common';
import {getFunctions, httpsCallable} from 'firebase/functions';
import {useFirebase} from '../../../context/firebase';
import firebaseService from '../../../services/firebase.service';
import PlusIcon from '../../icons/PlusIcon';

interface EditProfileProps {
  show: boolean;
  onClose: () => void;
}

const validationSchemaEditProfile = yup.object().shape({
  url: yup.string().required('Link is required'),
});

export const AddNewItemModal: FC<EditProfileProps> = ({show, onClose}) => {
  const firebaseApp = useFirebase();

  const handleSubmit = async (values: {url: string}) => {
    await firebaseService.addNewItem(firebaseApp, values.url);
    onClose();
  };

  return (
    <ModalBaseLayout
      show={show}
      maxWidth="673"
      onClose={onClose}
      icon={'./plus-black.svg'}
      title="Add new item">
      <div className="w-full flex flex-col items-center">
        <Formik
          validationSchema={validationSchemaEditProfile}
          initialValues={{url: ''}}
          onSubmit={handleSubmit}>
          {({isValid, errors}) => (
            <Form className="w-full max-w-[440px] flex flex-col items-center px-3 pt-12 md:pt-24 pb-14 md:pb-28">
              <div className="w-full">
                <div className="field !mb-10">
                  <div className="relative">
                    <img
                      className="absolute z-10 left-3 top-1/2 -translate-y-1/2 w-4"
                      src={'./share-link-black.svg'}
                      alt=""
                    />
                    <Field
                      className={cn('!pl-10', {'field-error': errors.url})}
                      type="text"
                      name="url"
                      placeholder="Paste Item URL (⌘+V)"
                    />
                  </div>
                  <ErrorMessage
                    className="error-message"
                    name="url"
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
                Add Item
                <PlusIcon className="stroke-white group-hover:stroke-main-500" />
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </ModalBaseLayout>
  );
};
