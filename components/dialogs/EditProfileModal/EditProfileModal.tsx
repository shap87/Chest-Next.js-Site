// libs
import {FC, useState, useEffect} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {doc, getFirestore, Timestamp, updateDoc} from 'firebase/firestore';
import {useAppDispatch} from '../../../hooks/redux';
import * as yup from 'yup';
import cn from 'classnames';

import {useFirebase} from '../../../context/firebase';

// components
import {Alert, Button, ModalBaseLayout} from '../../common';
import CheckIcon from '../../icons/CheckIcon';
import firebaseService from '../../../services/firebase.service';

interface EditProfileProps {
  show: boolean;
  onClose: () => void;
  userData: {name: string; username: string; uid: string};
}

const validationSchemaEditProfile = yup.object().shape({
  name: yup.string().required('Name is required'),
  username: yup.string().required('Name is required'),
});

export const EditProfileModal: FC<EditProfileProps> = ({
  show,
  onClose,
  userData,
}) => {
  const firebaseApp = useFirebase();
  const dispatch = useAppDispatch();

  const [showSavedMessage, setShowSavedMessage] = useState<string>('');
  const [avatar, setAvatar] = useState<any>(null);
  const [file, setFile] = useState<Blob | null>(null);

  useEffect(() => {
    setShowSavedMessage('');
  }, [show]);

  useEffect(() => {
    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  const handleSubmit = async (values: {name: string; username: string}) => {
    const db = getFirestore(firebaseApp);
    await updateDoc(doc(db, 'users', userData.uid), {
      username: values.username,
      name: values.name,
      updatedAt: Timestamp.fromDate(new Date()),
    });

    const newUserData = await firebaseService.getUser(firebaseApp);

    dispatch({
      type: 'UPDATE_USER',
      payload: newUserData,
    });

    setShowSavedMessage('Profile saved');
    setTimeout(() => {
      setShowSavedMessage('');
    }, 2000);
  };

  return (
    <ModalBaseLayout
      show={show}
      maxWidth="673"
      onClose={onClose}
      icon={'./edit.svg'}
      title="Edit profile">
      {showSavedMessage && (
        <Alert
          showSavedMessage={showSavedMessage}
          iconWidth="w-4"
          icon={'./check-pink.svg'}
        />
      )}
      <div className="w-full flex flex-col items-center">
        <Formik
          validationSchema={validationSchemaEditProfile}
          initialValues={{name: userData.name, username: userData.username}}
          onSubmit={handleSubmit}>
          {({isValid, values, errors}) => (
            <Form className="w-full max-w-[336px] flex flex-col items-center px-3 pt-7">
              <div className="field !mb-8">
                <label className="cursor-pointer group !mb-0">
                  <input
                    hidden
                    name="file"
                    type="file"
                    onChange={(event: any) =>
                      setFile(event.currentTarget.files[0])
                    }
                  />
                  {avatar ? (
                    <img
                      className="w-[66px] h-[66px] border-2 border-white drop-shadow-md rounded-full"
                      src={avatar}
                      alt="Avatar"
                    />
                  ) : (
                    <img
                      className="w-[66px] h-[66px] border-2 border-white drop-shadow-md rounded-full"
                      src={'./images/avatar.png'}
                      alt="Avatar"
                    />
                  )}
                  <div className="bg-[#FFF4FA] w-[27px] h-[27px] flex justify-center items-center absolute bottom-0 -right-3 rounded-full group-hover:opacity-50 transition-all">
                    <img
                      className="w-[19px] h-[18px]"
                      src={'./upload-cloud.svg'}
                      alt="Avatar"
                    />
                  </div>
                </label>
              </div>
              <div className="w-full">
                <div className="field !mb-5">
                  <label htmlFor="name">Name</label>
                  <Field
                    className={cn({'field-error': errors.name})}
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                  />
                  <ErrorMessage
                    className="error-message"
                    name="name"
                    component="p"
                  />
                </div>
                <div className="field !mb-12">
                  <label
                    htmlFor="username"
                    className="!flex justify-between items-center overflow-hidden">
                    Username
                    <span className="text-[#CC0174] text-sm font-semibold no-underline ml-2">
                      chestr.app/{values.username}
                    </span>
                  </label>
                  <div className="flex items-center">
                    <span className="h-[42px] w-[39px] border-[1px] rounded-lg rounded-r-none border-r-0 flex items-center justify-center">
                      @
                    </span>
                    <Field
                      className="!rounded-l-none"
                      type="text"
                      name="username"
                      placeholder="Enter your username"
                    />
                  </div>
                  <ErrorMessage
                    className="error-message"
                    name="username"
                    component="p"
                  />
                </div>
              </div>
              <Button
                disabled={!isValid}
                htmlType="submit"
                color="pink"
                classname="w-full max-w-[211px] group"
                icon="icon-right">
                Save
                <CheckIcon className="stroke-white group-hover:stroke-main-500" />
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </ModalBaseLayout>
  );
};
