// libs
import { FC, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import cn from 'classnames';

// components
import { Button, FolderSelect, H6, ModalBaseLayout, Paragraph } from '../../common';
import { useFirebase } from '../../../context/firebase';
import firebaseService from '../../../services/firebase.service';

interface AddNewItemModalProps {
  show: boolean;
  onClose: () => void;
}

const validationSchemaAddItem = yup.object().shape({
  url: yup.string().required('Link is required'),
});

export const AddNewItemModal: FC<AddNewItemModalProps> = ({ show, onClose }) => {
  const firebaseApp = useFirebase();
  const [step, setStep] = useState(2);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [showList, setShowList] = useState<boolean>(false);

  const handleSubmitStep1 = async (values: { url: string }) => {
    await firebaseService.addNewItem(firebaseApp, values.url).then(() => {
      setStep(2);
    });
  };
  const handleSubmitStep2 = async (values: { notes: string }) => {
    const data = { notes: values.notes, folder: selectedFolder }
    console.log(data, 'handleSubmitStep2')
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
        {step === 1
          ? <Formik
            validationSchema={validationSchemaAddItem}
            initialValues={{ url: '' }}
            onSubmit={handleSubmitStep1}>
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
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      className="group-hover:stroke-[#FF0098]"
                      d="M6.99984 1.16663V12.8333M1.1665 6.99996H12.8332"
                      stroke="white"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </Form>
            )}
          </Formik>
          : <Formik
            initialValues={{ notes: '' }}
            onSubmit={handleSubmitStep2}>
            {({ isValid, errors }) => (
              <Form className="w-full max-w-[330px] flex flex-col items-center px-3 pt-12 md:pt-24 pb-14 md:pb-28">
                <div className="w-full">
                  <div className="field !mb-10">
                    <div
                      className="cursor-pointer w-full text-base py-2 px-3 border border-[#D0D5DD] text-black rounded-md transition-all hover:opacity-70"
                      onClick={() => setShowList(true)}>{selectedFolder ? selectedFolder : 'Select value'}</div>
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
                    <div className="w-[48%]">
                      <H6 classname="!text-[15px] text-[#475467] !leading-tight !mb-2">
                        Basic hooded sweatshirt in pink
                      </H6>
                      <Paragraph classname="!text-sm text-[#98A2B3]">freepeople.com</Paragraph>
                      <H6 classname="!text-[17px] text-[#475467] !mb-0">$52</H6>
                    </div>
                  </div>
                  <div className="field !mb-10">
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
                  classname="w-full max-w-[220px] group"
                  icon="icon-right">
                  Done
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      className="group-hover:stroke-[#FF0098]"
                      d="M6.99984 1.16663V12.8333M1.1665 6.99996H12.8332"
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
  );
};
