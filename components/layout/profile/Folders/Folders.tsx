import {useCallback, useEffect, useState} from 'react';
import cn from 'classnames';
import {
  deleteDoc,
  doc,
  getFirestore,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
// hooks
import {useFirebase} from '../../../../context/firebase';
import useWindowSize from '../../../../hooks/useWindowSize';
import {useRouter} from 'next/router';
// components
import {Alert, Button, H6, Paragraph} from '../../../common';
import {SelectedPanel} from '../SelectedPanel/SelectedPanel';
import {AddNewSubFolderModal, SubfoldersPrivacyModal} from '../../../dialogs';

// assets
import styles from '../../../../styles/profile.module.scss';
import {useAppDispatch, useAppSelector} from '../../../../hooks/redux';
import {
  FolderType,
  setSelectedFolders,
} from '../../../../store/modules/folders/foldersSlice';
import EditFolderModal from '../../../dialogs/EditFolderModal/EditFolderModal';
import EyeIcon from '../../../icons/EyeIcon';
import TrashIcon from '../../../icons/TrashIcon';
import useTimeout from '../../../../hooks/useTimeout';
// import MoveFolderModal from '../../../dialogs/MoveFolder/MoveFolder';

export const Folders = () => {
  const firebaseApp = useFirebase();
  const router = useRouter();
  const {user} = useAppSelector(state => state.user);

  const dispatch = useAppDispatch();
  const {folders, selectedFolders} = useAppSelector(state => state.folders);
  const {width} = useWindowSize();

  const [showAll, setShowAll] = useState(false);
  const [count, setCount] = useState(6);
  const [parentFolder, setParentFolder] = useState<FolderType>();

  const [showNewSubFolderModal, setShowNewSubFolderModal] =
    useState<boolean>(false);
  const [showEditFolderModal, setShowEditFolderModal] =
    useState<boolean>(false);
  const [showSubfoldersPrivacyModal, setShowSubfoldersPrivacyModal] =
    useState<boolean>(false);
  const [notification, setNotification] = useState<{
    message: string;
    icon: string | React.ReactNode;
  } | null>(null);
  const [deleteFolderDelay, setDeleteFodlerDelay] = useState<number | null>(
    null,
  );
  const [folderToDelete, setFolderToDelete] = useState<FolderType | null>(null);

  useEffect(() => {
    console.log('Current folders:', folders);
    const selectedIds = Object.keys(selectedFolders);

    const updatedSelectedFolders = {} as {[key: string]: FolderType};

    selectedIds.forEach(id => {
      const folder = folders.find(folder => folder.id === id);
      if (folder) {
        updatedSelectedFolders[folder.id] = {...folder};
      }
    });

    dispatch(setSelectedFolders(updatedSelectedFolders));
  }, [folders]);

  useEffect(() => {
    if (width < 640) {
      setCount(2);
    } else if (width < 768) {
      setCount(3);
    } else if (width < 1024) {
      setCount(4);
    } else {
      setCount(5);
    }
  }, [width]);

  // if (foldersQuery.isLoading) {
  //   return (
  //     <div className="container">
  //       <div>Loading...</div>
  //     </div>
  //   );
  // }

  const countSelected = Object.keys(selectedFolders).length || 0;

  const deleteFolderFromServer = useCallback(async () => {
    if (folderToDelete) {
      const db = getFirestore(firebaseApp);

      if (folderToDelete.children.length > 0) {
        folderToDelete.children.forEach(subFolder => {
          deleteDoc(doc(db, 'folders', subFolder.id));
        });
      }

      await deleteDoc(doc(db, 'folders', folderToDelete.id));
    }

    setNotification(null);
    setDeleteFodlerDelay(null);
    setFolderToDelete(null);
  }, [firebaseApp, folderToDelete]);

  useTimeout(deleteFolderFromServer, deleteFolderDelay);

  const handleDeleteFolder = (folder: FolderType) => {
    setFolderToDelete(folder);

    setNotification({
      icon: <TrashIcon className="w-8" />,
      message: 'Folder deleted',
    });

    setDeleteFodlerDelay(5000);
  };

  const undoFolderDeletion = () => {
    setNotification(null);
    setDeleteFodlerDelay(null);
    setFolderToDelete(null);
  };

  const handleChangePrivacy = async (
    folder: FolderType,
    isPrivate: boolean,
  ) => {
    const db = getFirestore(firebaseApp);
    await updateDoc(doc(db, 'folders', folder.id), {
      private: isPrivate,
      updatedAt: Timestamp.fromDate(new Date()),
    });
    if (folder.children.length > 0) {
      folder.children.forEach(sub => {
        updateDoc(doc(db, 'folders', sub.id), {
          private: isPrivate,
          updatedAt: Timestamp.fromDate(new Date()),
        });
      });
    }
  };

  const onShareClick = async (folderId: string) => {
    const link = `${window.location.origin}/profile/${
      router.query.userId ?? user.uid
    }/${folderId}`;
    await navigator.clipboard.writeText(link);
    setNotification({
      icon: './share-link.svg',
      message: 'Folder link copied',
    });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  console.log('selectedFolders', selectedFolders);

  return (
    <>
      {notification && (
        <div className="w-full fixed top-40 z-50">
          <Alert
            showSavedMessage={notification.message}
            iconWidth="w-8"
            icon={notification.icon}>
            {notification.message === 'Folder deleted' && (
              <Button
                classname="ml-2"
                color="light-pink"
                onClick={undoFolderDeletion}>
                Undo
              </Button>
            )}
          </Alert>
        </div>
      )}
      <section className="py-4 md:py-8">
        <div className="container">
          {countSelected ? (
            <SelectedPanel
              type="folder"
              hideMoveButton
              total={1}
              totalSelected={countSelected}
            />
          ) : null}
          <div className="flex justify-between items-center">
            <H6>Folders</H6>
            {showAll ? (
              <div
                className="font-semibold text-[#98A2B3] text-sm flex items-center cursor-pointer group select-none"
                onClick={() => setShowAll(!showAll)}>
                Hide
                <img
                  className="w-3 ml-2 opacity-60 rotate-180 group-hover:rotate-0 transition-all"
                  src="/arrow-select.svg"
                  alt="arrow select"
                />
              </div>
            ) : (
              <div
                className="font-semibold text-[#98A2B3] text-sm flex items-center cursor-pointer group select-none"
                onClick={() => setShowAll(!showAll)}>
                Show All
                <img
                  className="w-3 ml-2 opacity-60 group-hover:rotate-180 transition-all"
                  src="/arrow-select.svg"
                  alt="arrow select"
                />
              </div>
            )}
          </div>
          <div
            className={cn(
              'flex flex-wrap items-center gap-y-12',
              styles.folders,
            )}>
            {folders
              ?.slice(0, showAll ? folders?.length ?? Infinity : count)
              ?.filter(f => f.id !== folderToDelete?.id)
              ?.map(folder => {
                const selected = Object.prototype.hasOwnProperty.call(
                  selectedFolders,
                  folder.id,
                );
                return (
                  <div
                    key={folder.id}
                    className={cn(styles.folder, {
                      [styles.selected]: selected,
                    })}>
                    <div className={cn(styles.settings, 'group')}>
                      <img
                        className="w-1 group-hover:opacity-60 transition-all"
                        src="/dots.svg"
                        alt=""
                      />
                      <ul
                        className="list hidden left-0 group-hover:block"
                        onClick={() => setParentFolder(folder)}>
                        <li onClick={() => setShowNewSubFolderModal(true)}>
                          New Sub folder
                          <img src="/folder.svg" alt="" />
                        </li>
                        <li onClick={() => setShowEditFolderModal(true)}>
                          Rename
                          <img src="/edit-with-border.svg" alt="" />
                        </li>
                        <li
                          className="items-center"
                          onClick={() => setShowSubfoldersPrivacyModal(true)}>
                          {folder.private ? 'Make Public' : 'Make Private'}
                          {folder.private ? (
                            <EyeIcon className="w-4" />
                          ) : (
                            <img src="/lock-black.svg" alt="" />
                          )}
                        </li>
                        <li onClick={() => onShareClick(folder.id)}>
                          Share
                          <img src="/share.svg" alt="" />
                        </li>
                        <li
                          className="text-red-500"
                          onClick={() => handleDeleteFolder(folder)}>
                          Delete
                          <img src="/trash.svg" alt="" />
                        </li>
                      </ul>
                    </div>
                    <span
                      className={styles.checkbox}
                      onClick={() => {
                        if (!selected) {
                          dispatch(
                            setSelectedFolders({
                              ...selectedFolders,
                              [folder.id]: folder,
                            }),
                          );
                        } else {
                          // Remove folder from selected
                          const {[folder.id]: omitted, ...rest} =
                            selectedFolders;
                          dispatch(setSelectedFolders(rest));
                        }
                      }}
                    />
                    <img
                      className={styles.image}
                      src={folder.imageUrl}
                      alt="folder"
                    />
                    <div className={styles.info}>
                      <div className={styles.desc}>
                        <H6>{folder.name}</H6>
                        <Paragraph>{folder.numItems} items</Paragraph>
                      </div>
                      {folder.private && (
                        <img
                          className={styles.lock}
                          src="/lock.svg"
                          alt="private"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
      {showNewSubFolderModal && (
        <AddNewSubFolderModal
          parentFolder={{
            id: parentFolder?.id || '',
            name: parentFolder?.name || '',
            private: !!parentFolder?.private,
          }}
          show={showNewSubFolderModal}
          onClose={() => setShowNewSubFolderModal(false)}
        />
      )}
      {showEditFolderModal && (
        <EditFolderModal
          parentFolder={{
            id: parentFolder?.id || '',
            name: parentFolder?.name || '',
            private: !!parentFolder?.private,
            children: parentFolder?.children || [],
          }}
          show={showEditFolderModal}
          onClose={() => setShowEditFolderModal(false)}
        />
      )}
      {showSubfoldersPrivacyModal && (
        <SubfoldersPrivacyModal
          parentFolder={parentFolder}
          changePrivacy={handleChangePrivacy}
          show={showSubfoldersPrivacyModal}
          onClose={() => setShowSubfoldersPrivacyModal(false)}
        />
      )}
    </>
  );
};
