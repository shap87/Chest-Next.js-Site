// libs
import { FC, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import cn from 'classnames';

// components
import {
  Alert,
  Button,
  FolderSelect,
  H6,
  LoadingSpinner,
  ModalBaseLayout,
  Notification,
  Paragraph
} from '../../common';
import { useFirebase } from '../../../context/firebase';
import firebaseService from '../../../services/firebase.service';
import PlusIcon from '../../icons/PlusIcon';

interface AddNewItemModalProps {
  show: boolean;
  onClose: () => void;
}

const validationSchemaAddItem = yup.object().shape({
  url: yup.string().required('Link is required'),
});

export const AddNewItemModal: FC<AddNewItemModalProps> = ({ show, onClose }) => {
  const firebaseApp = useFirebase();

  const [step, setStep] = useState<string>('paste-url');
  const [selectedFolder, setSelectedFolder] = useState("");
  const [showList, setShowList] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ message: string, type: string } | null>(null);
  const [showSavedMessage, setShowSavedMessage] = useState<string>("");

  const handleSubmitPasteUrl = async (values: { url: string }) => {
    setLoading(true);
    await firebaseService.addNewItem(firebaseApp, values.url)
      .then(() => {
        setStep('add-folder');
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setNotification({
          type: "error",
          message: 'Failed to send data, please try again.'
        })
        setTimeout(() => {
          setNotification(null);
        }, 3000)
      })
  };
  const handleSubmitAddFolder = async (values: { notes: string }) => {
    const data = { notes: values.notes, folder: selectedFolder }
    console.log(data, 'handleSubmitAddFolder')
    setShowSavedMessage('Item saved to your chest!')
    setTimeout(() => {
      setShowSavedMessage('')
    }, 3000)
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      {notification && <Notification notification={notification} />}
      <ModalBaseLayout
        show={show}
        maxWidth="673"
        onClose={onClose}
        icon={'./plus-black.svg'}
        title="Add new item">
        {showSavedMessage && <Alert showSavedMessage={showSavedMessage} iconWidth="w-8" icon={'./chest.svg'} />}
        <div className="w-full flex flex-col items-center">
          {step === 'paste-url'
            && <Formik
              validationSchema={validationSchemaAddItem}
              initialValues={{ url: '' }}
              onSubmit={handleSubmitPasteUrl}>
              {({ isValid, errors }) => (
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
                          className={cn('!pl-10', { 'field-error': errors.url })}
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
            </Formik>}
          {step === 'add-folder' && <Formik
            initialValues={{ notes: '' }}
            onSubmit={handleSubmitAddFolder}>
            {({ isValid, errors }) => (
              <Form className="w-full max-w-[330px] flex flex-col items-center px-3 pt-5 md:pt-10 pb-14 md:pb-28">
                <div className="w-full">
                  <div className="field !mb-7">
                    <div
                      className="pr-8 text-ellipsis whitespace-nowrap overflow-hidden relative cursor-pointer w-full text-base py-2 px-3 border border-[#D0D5DD] text-black rounded-md transition-all hover:opacity-70"
                      onClick={() => setShowList(true)}>
                      {selectedFolder ? selectedFolder : 'Select value'}
                      <img
                        className={cn("absolute right-2 top-1/2 -translate-y-1/2 w-3 transition-all", { 'rotate-180': showList })}
                        src={'./arrow-select.svg'} alt='' />
                    </div>
                    {showList &&
                      <FolderSelect
                        setShowList={setShowList}
                        selectedFolder={selectedFolder}
                        setSelectedFolder={setSelectedFolder} />}
                  </div>
                  <div className="flex justify-between items-center mb-5">
                    <div className="w-[48%] h-[144px]">
                      <img className="rounded-md h-full overflow-hidden" src={'./images/sweater.jpg'} alt='' />
                    </div>
                    <div className="w-[49%]">
                      <H6 classname="!text-[15px] text-[#475467] !leading-tight !mb-2">
                        Basic hooded sweatshirt in pink
                      </H6>
                      <Paragraph classname="!text-sm text-[#98A2B3]">freepeople.com</Paragraph>
                      <H6 classname="!text-[17px] text-[#475467] !mb-0">$52</H6>
                    </div>
                  </div>
                  <div className="field !mb-5">
                    <Field
                      className={cn({ 'field-error': errors.notes })}
                      as="textarea"
                      name="notes"
                      placeholder="Notes: e.g size, color, etc..."
                    />
                    <ErrorMessage
                      className="error-message"
                      name="notes"
                      component="p"
                    />
                  </div>
                </div>
                <Button
                  disabled={!isValid || !selectedFolder}
                  htmlType="submit"
                  color="pink"
                  classname="w-full max-w-[120px] group"
                  icon="icon-right">
                  Done
                  <svg
                    width="15"
                    height="11"
                    viewBox="0 0 15 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="group-hover:stroke-[#FF0098]"
                      d="M14.1663 1L4.99967 10.1667L0.833008 6"
                      stroke="white"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </Form>
            )}
          </Formik>}
        </div>
      </ModalBaseLayout>
    </>
  );
};
