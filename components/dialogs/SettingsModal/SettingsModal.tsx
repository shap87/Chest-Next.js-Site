import {FC} from 'react';

// libs
import {useRouter} from 'next/router';

// components
import {Button, ModalBaseLayout} from '../../common';
import {logout, useFirebase} from '../../../context/firebase';
import {routes} from '../../../utils/routes';
import DeleteIcon from '../../icons/DeleteIcon';

interface EditProfileProps {
  show: boolean;
  onClose: () => void;
  setLoading: (value: boolean) => void;
}

export const SettingsModal: FC<EditProfileProps> = ({
  show,
  onClose,
  setLoading,
}) => {
  const router = useRouter();

  const firebaseApp = useFirebase();

  return (
    <ModalBaseLayout
      show={show}
      maxWidth="673"
      onClose={onClose}
      icon={'./settings.svg'}
      title="Settings">
      <div className="w-full flex flex-col items-center py-10 md:py-24 max-w-[250px] mx-auto">
        <Button
          classname="w-full mb-10 group"
          icon="icon-right"
          onClick={() => {
            setLoading(true);
            logout(firebaseApp).then(() => {
              setLoading(false);
              router.push(routes.home);
            });
          }}>
          Sign out
          <img className="group-hover:invert" src={'./sign-out.svg'} alt="" />
        </Button>
        <Button classname="w-full group" icon="icon-right" color="red">
          Delete my account
          <DeleteIcon className="stroke-red-500 group-hover:stroke-white" />
        </Button>
      </div>
    </ModalBaseLayout>
  );
};
