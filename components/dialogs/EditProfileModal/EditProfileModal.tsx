import { FC } from "react";
import { Modal } from "../../common";

interface EditProfileProps {
  show: boolean;
}

export const EditProfileModal: FC<EditProfileProps> = ({ show }) => {
  return (
    <Modal show={show} containerId="edit-profile-dialog">
      <p>some content</p>
    </Modal>
  );
};
