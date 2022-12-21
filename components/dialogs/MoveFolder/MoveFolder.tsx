import {FC, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as yup from 'yup';
import cn from 'classnames';

import {Button, FolderSelect, ModalBaseLayout} from '../../common';
import CheckIcon from '../../icons/CheckIcon';
import {FolderType} from '../../../store/modules/folders/foldersSlice';

interface EditFolderModalProps {
  show: boolean;
  onClose: () => void;
}

const validationSchemaEditProfile = yup.object().shape({
  name: yup.string().required('Name is required'),
});

const MoveFolderModal: FC<EditFolderModalProps> = ({show, onClose}) => {
  const [showList, setShowList] = useState<boolean>(false);
  const [selectedFolder, setSelectedFolder] = useState<FolderType | null>(null);
  const [placeholder, setPlaceHolder] = useState<string>('');

  const handleSubmit = () => {};

  return (
    <ModalBaseLayout
      show={show}
      maxWidth="673"
      onClose={onClose}
      icon="/move-folder.svg"
      title="Move folder">
      <div className="w-full flex flex-col items-center">
        <Formik
          validationSchema={validationSchemaEditProfile}
          initialValues={{name: ''}}
          onSubmit={handleSubmit}>
          {({isValid}) => (
            <Form className="w-full max-w-[673px] flex flex-col items-center px-3 pt-12 md:pt-24 pb-6 md:pb-12">
              <div className="w-full">
                <div className="field !mb-10 flex items-center">
                  <div className="relative flex-1">
                    <div className="field !mb-7 flex flex-col items-center">
                      <div
                        className="pr-8 text-ellipsis whitespace-nowrap overflow-hidden relative cursor-pointer w-3/4 text-base py-2 px-3 border border-[#D0D5DD] text-black rounded-md transition-all hover:opacity-70"
                        onClick={() => setShowList(prev => !prev)}>
                        {placeholder ? placeholder : 'Select location'}
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
                        <div className="w-3/4 relative">
                          <FolderSelect
                            setShowList={setShowList}
                            setSelectedFolder={setSelectedFolder}
                            setPlaceHolder={setPlaceHolder}
                          />
                        </div>
                      )}
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
                disabled={!selectedFolder}
                // htmlType="submit"
                color="pink"
                classname="w-full max-w-[220px] group"
                icon="icon-right"
                onClick={() => console.log(isValid)}>
                Move here
                <CheckIcon className="stroke-white group-hover:stroke-main-500" />
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </ModalBaseLayout>
  );
};

export default MoveFolderModal;
