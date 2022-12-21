// libs
import {FC, useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import cn from 'classnames';

// components
import {Alert, Button, H6, ModalBaseLayout, Paragraph} from '../../common';
import FolderBadge from '../../Products/FolderBadge';

import {Product} from '../../../types/Product';
import CheckIcon from '../../icons/CheckIcon';

interface EditProductNoteModalProps {
  show: boolean;
  onClose: () => void;
  product: Product;
  onEditProductNote: (productId: string, note: string) => void;
}

export const EditProductNoteModal: FC<EditProductNoteModalProps> = ({
  show,
  onClose,
  product,
  onEditProductNote,
}) => {
  const price = product?.price?.toLocaleString('en-US', {
    style: 'currency',
    currency: product?.priceCurrency ?? 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  const [showSavedMessage, setShowSavedMessage] = useState<string>('');

  const onSubmit = ({note}: {note: string}) => {
    onEditProductNote(product.id || '', note);
    setShowSavedMessage('Note saved');
    setTimeout(() => {
      setShowSavedMessage('');
    }, 3000);
  };

  return (
    <>
      <ModalBaseLayout
        show={show}
        maxWidth="673"
        onClose={onClose}
        icon={'./edit-with-line.svg'}
        title="Edit item note">
        {showSavedMessage && (
          <div className="w-full absolute top-5">
            <Alert
              showSavedMessage={showSavedMessage}
              iconWidth="w-8"
              icon={'./check-pink.svg'}
            />
          </div>
        )}
        <div className="w-full flex flex-col items-center">
          <Formik
            initialValues={{note: product?.note || ''}}
            onSubmit={onSubmit}>
            {({errors}) => (
              <Form className="w-full max-w-[330px] flex flex-col items-center px-3 pt-5 md:pt-10 pb-14 md:pb-14">
                <div className="w-full">
                  <div className="flex justify-between items-center mb-5">
                    <div className="w-[48%] h-[144px]">
                      <img
                        className="rounded-md h-full overflow-hidden"
                        src={product.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="w-[49%] relative">
                      <H6 classname="!text-[15px] text-[#475467] !leading-tight !mb-2">
                        {product.title}
                      </H6>
                      <Paragraph classname="!text-sm text-[#98A2B3]">
                        freepeople.com
                      </Paragraph>
                      <H6 classname="!text-[17px] text-[#475467] !mb-2">
                        {price}
                      </H6>
                      <div className="flex">
                        {product?.parent ? (
                          <FolderBadge folderId={product.parent} />
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="field !mb-5">
                    <Field
                      className={cn({'field-error': errors.note})}
                      as="textarea"
                      name="note"
                      placeholder="Notes: e.g size, color, etc..."
                    />
                    <ErrorMessage
                      className="error-message"
                      name="note"
                      component="p"
                    />
                  </div>
                </div>
                <Button
                  htmlType="submit"
                  color="pink"
                  classname="w-full max-w-[120px] group"
                  icon="icon-right">
                  Save
                  <CheckIcon className="stroke-white group-hover:stroke-main-500" />
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </ModalBaseLayout>
    </>
  );
};
