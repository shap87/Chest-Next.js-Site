import {FC} from 'react';
// components
import {Button, H6, ModalBaseLayout, Paragraph} from '../../common';
import InfoIcon from '../../icons/InfoIcon';

import {FolderType} from '../../../store/modules/folders/foldersSlice';

interface SubfoldersPrivacyModalProps {
  show: boolean;
  onClose: () => void;
  parentFolder: FolderType | undefined;
  changePrivacy: (folder: FolderType, isPrivate: boolean) => void;
}

export const SubfoldersPrivacyModal: FC<SubfoldersPrivacyModalProps> = ({
  show,
  onClose,
  parentFolder,
  changePrivacy,
}) => {
  const onSubmit = () => {
    if (parentFolder) {
      changePrivacy(parentFolder, !parentFolder.private);
      onClose();
    }
  };

  return (
    <ModalBaseLayout
      show={show}
      maxWidth="500"
      onClose={onClose}
      icon={<InfoIcon />}
      title="">
      <div className="w-full flex flex-col pt-8 md:pt-8 max-w-[440px] mx-auto">
        <H6 classname="mb-2">{`Subfolders will become ${
          parentFolder?.private ? 'public' : 'private'
        } too`}</H6>
        <Paragraph classname="!text-sm">
        <Paragraph className="!text-sm">
          Subfolders and items inherit the privacy of the parent folder.
        </Paragraph>
        <div className="w-full flex justify-between mt-6">
          <Button
            classname="w-full max-w-[150px] sm:max-w-[200px]"
            onClick={onClose}>
            Cancel
          </Button>
          <Button
            classname="w-full max-w-[150px] sm:max-w-[200px]"
            color="dark-grey"
            onClick={onSubmit}>
            {parentFolder?.private ? 'Make public' : 'Make private'}
          </Button>
        </div>
      </div>
    </ModalBaseLayout>
  );
};
