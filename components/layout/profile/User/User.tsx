// libs
import {useState} from 'react';
import cn from 'classnames';
import {
  useFirestoreDocumentData,
  useFirestoreQueryData,
} from '@react-query-firebase/firestore';
import {query, collection, doc} from 'firebase/firestore';
// hooks
import {useFirestore} from '../../../../context/firebase';
import {useRouter} from 'next/router';
import {useAppSelector} from '../../../../hooks/redux';
// components
import {Button, H5, H6, LoadingSpinner} from '../../../common';
import {
  AddNewFolderModal,
  AddNewItemModal,
  EditProfileModal,
  SettingsModal,
} from '../../../dialogs';
// assets
import styles from '../../../../styles/profile.module.scss';

export const User = () => {
  const {user} = useAppSelector(state => state.user);
  const router = useRouter();
  const isPublic = !!router.query.userId;

  const firestore = useFirestore();
  const followingRef = query(
    collection(firestore, `users/${user?.uid}/following`),
  );
  const followingQuery = useFirestoreQueryData(
    `users/${user?.uid}/following`,
    user?.uid ? followingRef : undefined,
  );

  const isFollowing =
    (followingQuery.data?.findIndex(u => u.uid === user?.uid) ?? -1) > -1;

  const userQuery = useFirestoreDocumentData(
    ['users', router.query.userId],
    isPublic
      ? doc(firestore, 'users', router.query.userId! as string)
      : undefined,
    {},
    {
      enabled: isPublic,
    },
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [showEditProfileModal, setShowEditProfileModal] =
    useState<boolean>(false);
  const [showAddNewFolderModal, setShowAddNewFolderModal] =
    useState<boolean>(false);
  const [showAddNewItemModal, setShowAddNewItemModal] =
    useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [share, setShare] = useState<boolean>(false);

  const handleShareProfile = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/profile/${router.query.userId ?? user.uid}`,
    );
    setShare(true);
    setTimeout(() => {
      setShare(false);
    }, 3000);
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <section className="py-4 md:py-8">
        <div className="container">
          <div className="flex justify-between items-center">
            <div className="flex items-center justify-between md:justify-start gap-2 md:gap-5">
              <img
                className={cn(
                  'border-4 border-white w-14 md:w-24 h-14 md:h-24 rounded-full object-cover',
                  styles.avatar,
                )}
                src="/images/avatar.png"
                alt=""
              />
              <div>
                <H5 classname="font-normal !mb-0 md:!mb-1">
                  {userQuery.data?.name ?? user?.name}
                </H5>
                <H6 classname="mb-0">
                  @{userQuery.data?.username ?? user?.username}
                </H6>
              </div>

              {!isPublic && (
                <div className="relative p-2 group ml-6 group cursor-pointer">
                  <div className="group-hover:rotate-180 transition-all">
                    <img className="w-3" src="/arrow-select.svg" alt="" />
                  </div>
                  <ul className="list hidden group-hover:block">
                    <li onClick={() => setShowEditProfileModal(true)}>
                      Edit profile
                      <img src="/edit.svg" alt="" />
                    </li>
                    <li onClick={handleShareProfile}>
                      Share
                      <img src="/share.svg" alt="" />
                    </li>
                    <li onClick={() => setShowSettingsModal(true)}>
                      Settings
                      <img src="/settings.svg" alt="" />
                    </li>
                  </ul>
                </div>
              )}

              {isPublic && (
                <div className="absolute md:relative right-4 flex flex-grow-0 gap-4 ml-0 md:ml-6">
                  <Button
                    htmlType="button"
                    classname="!w-auto md:!px-6"
                    color={!isFollowing ? 'light-pink' : undefined}>
                    {isFollowing ? 'Following' : 'Follow'}
                  </Button>
                  <button
                    className="border-2 rounded-lg px-3 border-gray-200"
                    onClick={handleShareProfile}>
                    <img src="/share.svg" alt="" />
                  </button>
                </div>
              )}
            </div>
            {!isPublic && (
              <div className="relative pt-2 pb-2 group ml-2">
                <div className="rounded-lg bg-[#FFEBF6] border border-transparent py-4 px-4 md:px-11 group-hover:border-[#CC0174] transition-all cursor-pointer">
                  <img className="w-3" src="/plus.svg" alt="" />
                </div>
                <ul className="list hidden group-hover:block">
                  <li onClick={() => setShowAddNewFolderModal(true)}>
                    New Folder
                    <img src="/folder.svg" alt="" />
                  </li>
                  <li onClick={() => setShowAddNewItemModal(true)}>
                    New Item
                    <img src="/plus.svg" alt="" />
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
      <AddNewItemModal
        show={showAddNewItemModal}
        onClose={() => setShowAddNewItemModal(false)}
      />
      <AddNewFolderModal
        show={showAddNewFolderModal}
        onClose={() => setShowAddNewFolderModal(false)}
      />
      <EditProfileModal
        userData={user!}
        show={showEditProfileModal}
        onClose={() => setShowEditProfileModal(false)}
      />
      <SettingsModal
        show={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        setLoading={setLoading}
      />

      {share && (
        <div className="fixed z-50 bottom-8 md:top-24 left-1/2 -translate-x-1/2">
          <div className="bg-[#FFF4FA] py-2 px-5 flex justify-center items-center border border-[#FF9AD4] rounded-[10px]">
            <img className="w-5 mr-4" src="/share-link.svg" alt="" />
            <H6 classname="text-[#FF0098] !mb-0 whitespace-nowrap">
              Profile link copied
            </H6>
          </div>
        </div>
      )}
    </>
  );
};
