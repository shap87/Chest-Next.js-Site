// libs
import {FC, useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as yup from 'yup';
import cn from 'classnames';
import {useFirebase} from '../../../context/firebase';
import firebaseService from '../../../services/firebase.service';
import {getFunctions, httpsCallable} from 'firebase/functions';

// components
import {
  Alert,
  Button,
  FolderSelect,
  H6,
  LoadingSpinner,
  ModalBaseLayout,
  Notification,
  Paragraph,
} from '../../common';
import CheckIcon from '../../icons/CheckIcon';
import PlusIcon from '../../icons/PlusIcon';

import FetchedProduct from '../../../types/FetchedProduct';
import {FolderType} from '../../../store/modules/folders/foldersSlice';

interface AddNewItemModalProps {
  show: boolean;
  onClose: () => void;
}

const validationSchemaAddItem = yup.object().shape({
  url: yup.string().required('Link is required'),
});

export const AddNewItemModal: FC<AddNewItemModalProps> = ({show, onClose}) => {
  const firebaseApp = useFirebase();

  const [step, setStep] = useState<string>('paste-url');
  const [selectedFolder, setSelectedFolder] = useState<FolderType | null>(null);
  const [paceholder, setPlaceHolder] = useState<string>('');
  const [showList, setShowList] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: string;
  } | null>(null);
  const [showSavedMessage, setShowSavedMessage] = useState<string>('');
  const [product, setProduct] = useState<FetchedProduct>();

  const handleClose = () => {
    setStep('paste-url');
    onClose();
  };

  const handleSubmitPasteUrl = async (values: {url: string}) => {
    try {
      setLoading(true);
      const functions = getFunctions(firebaseApp);
      const result = await httpsCallable(
        functions,
        'fetchProductData',
      )({url: values.url});
      if (!result?.data) {
        setLoading(false);
        setNotification({
          type: 'error',
          message: 'Failed to send data, please try again.',
        });
        setTimeout(() => {
          setNotification(null);
        }, 3000);
        return;
      }

      setProduct(result.data as FetchedProduct);
      setStep('add-folder');
      setLoading(false);
    } catch {
      setLoading(false);
      setNotification({
        type: 'error',
        message: 'Failed to send data, please try again.',
      });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };
  const handleSubmitAddItem = async (values: {notes: string}) => {
    const data = {notes: values.notes, folder: selectedFolder?.id || ''};
    if (!product) {
      setNotification({
        type: 'error',
        message: 'Failed to send data, please try again.',
      });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
      return;
    }

    await firebaseService
      .addNewItem(firebaseApp, product, data)
      .then(() => {
        setLoading(false);
        setShowSavedMessage('Item saved to your chest!');
        onClose();
        setStep('paste-url');
        setSelectedFolder(null);
        setProduct(undefined);
        setPlaceHolder('');
        setTimeout(() => {
          setShowSavedMessage('');
        }, 3000);
      })
      .catch(() => {
        setLoading(false);
        setNotification({
          type: 'error',
          message: 'Failed to send data, please try again.',
        });
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      });
  };

  const price = product?.price?.toLocaleString('en-US', {
    style: 'currency',
    currency: product?.priceCurrency ?? 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return (
    <>
      {loading && <LoadingSpinner />}
      {notification && <Notification notification={notification} />}
      {showSavedMessage && (
        <div className="w-full fixed top-40 z-50">
          <Alert
            showSavedMessage={showSavedMessage}
            iconWidth="w-8"
            icon="/chest.svg"
          />
        </div>
      )}
      <ModalBaseLayout
        show={show}
        maxWidth="673"
        onClose={handleClose}
        icon="/plus-black.svg"
        title="Add new item">
        <div className="w-full flex flex-col items-center">
          {step === 'paste-url' && (
            <Formik
              validationSchema={validationSchemaAddItem}
              initialValues={{url: ''}}
              onSubmit={handleSubmitPasteUrl}>
              {({isValid, errors}) => (
                <Form className="w-full max-w-[440px] flex flex-col items-center px-3 pt-12 md:pt-24 pb-14 md:pb-28">
                  <div className="w-full">
                    <div className="field !mb-10">
                      <div className="relative">
                        <img
                          className="absolute z-10 left-3 top-1/2 -translate-y-1/2 w-4"
                          src="/share-link-black.svg"
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
          )}
          {step === 'add-folder' && (
            <Formik initialValues={{notes: ''}} onSubmit={handleSubmitAddItem}>
              {({isValid, errors}) => (
                <Form className="w-full max-w-[330px] flex flex-col items-center px-3 pt-5 md:pt-10 pb-14 md:pb-28">
                  <div className="w-full">
                    <div className="field !mb-7">
                      <div
                        className="pr-8 text-ellipsis whitespace-nowrap overflow-hidden relative cursor-pointer w-full text-base py-2 px-3 border border-[#D0D5DD] text-black rounded-md transition-all hover:opacity-70"
                        onClick={() => setShowList(prev => !prev)}>
                        {paceholder ? paceholder : 'Select folder'}
                        <img
                          className={cn(
                            'absolute right-2 top-1/2 -translate-y-1/2 w-3 transition-all',
                            {'rotate-180': showList},
                          )}
                          src="/arrow-select.svg"
                          alt=""
                        />
                      </div>
                      {showList && (
                        <FolderSelect
                          setShowList={setShowList}
                          setSelectedFolder={setSelectedFolder}
                          setPlaceHolder={setPlaceHolder}
                        />
                      )}
                    </div>
                    <div className="flex justify-between items-center mb-5">
                      <div className="w-[48%] h-[144px]">
                        <img
                          className="rounded-md h-full overflow-hidden"
                          src={product?.image || ''}
                          alt=""
                        />
                      </div>
                      <div className="w-[49%]">
                        <H6 classname="!text-[15px] text-[#475467] !leading-tight !mb-2">
                          {product?.title}
                        </H6>
                        <Paragraph classname="!text-sm text-[#98A2B3]">
                          freepeople.com
                        </Paragraph>
                        <H6 classname="!text-[17px] text-[#475467] !mb-0">
                          {price}
                        </H6>
                      </div>
                    </div>
                    <div className="field !mb-5">
                      <Field
                        className={cn({'field-error': errors.notes})}
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
                    <CheckIcon className="stroke-white group-hover:stroke-main-500" />
                  </Button>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </ModalBaseLayout>
    </>
  );
};
