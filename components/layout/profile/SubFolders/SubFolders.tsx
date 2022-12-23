import React, {useCallback, useEffect, useState} from 'react';
import cn from 'classnames';
import {
  deleteDoc,
  doc,
  getFirestore,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import {useFirebase} from '../../../../context/firebase';
import {useAppDispatch, useAppSelector} from '../../../../hooks/redux';
import {useRouter} from 'next/router';

// components
import {Alert, Button, H6, Paragraph} from '../../../common';
import DotsHorizontalIcon from '../../../icons/DotsHorizontalIcon';
import EyeIcon from '../../../icons/EyeIcon';
import EditFolderModal from '../../../dialogs/EditFolderModal/EditFolderModal';

//  assets
import styles from '../../../../styles/profile.module.scss';
import {
  FolderType,
  setSelectedSubfolders,
} from '../../../../store/modules/folders/foldersSlice';
import {AddNewSubFolderModal} from '../../../dialogs';
import TrashIcon from '../../../icons/TrashIcon';
import useTimeout from '../../../../hooks/useTimeout';

export const SubFolders = () => {
  const firebaseApp = useFirebase();
  const router = useRouter();
  const {selectedFolders, folders, selectedSubfolders} = useAppSelector(
    state => state.folders,
  );
  const {user} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const [subFolders, setSubFolders] = useState<FolderType[]>([]);
  const [headerTitle, setHeaderTitle] = useState<string>('');
  const [showList, setShowList] = useState<string>('');
  const [subfolder, setSubfolder] = useState<FolderType | null>(null);
  const [showEditFolderModal, setShowEditFolderModal] =
    useState<boolean>(false);
  const [showNewSubFolderModal, setShowNewSubFolderModal] =
    useState<boolean>(false);
  const [notification, setNotification] = useState<{
    message: string;
    icon: string | React.ReactNode;
  } | null>(null);
  const [folderToDelete, setFolderToDelete] = useState<FolderType | null>(null);
  const [deleteFolderDelay, setDeleteFodlerDelay] = useState<number | null>(
    null,
  );

  useEffect(() => {
    const selectedIds = Object.keys(selectedSubfolders);

    const updatedSelectedSubfolders = {} as {[key: string]: FolderType};
    //update subfolders data if folders changes
    selectedIds.forEach(id => {
      folders.forEach(parent => {
        if (parent.children) {
          const folder = parent.children.find(folder => folder.id === id);
          if (folder) {
            updatedSelectedSubfolders[folder.id] = {...folder};
          }
        }
      });
    });

    dispatch(setSelectedSubfolders(updatedSelectedSubfolders));
  }, [folders]);

  useEffect(() => {
    const subIds = Object.keys(selectedSubfolders);

    const updatedSubs = {} as {[key: string]: FolderType};
    //remove selected subfolders if parent not selected
    subIds.forEach(subId => {
      const parent = selectedFolders[selectedSubfolders[subId].parent ?? ''];
      if (parent) {
        updatedSubs[subId] = {...selectedSubfolders[subId]};
      }
    });

    dispatch(setSelectedSubfolders(updatedSubs));
  }, [selectedFolders]);

  const onSubfolderSelect = (folder: FolderType) => {
    const selected = Object.prototype.hasOwnProperty.call(
      selectedSubfolders,
      folder.id,
    );

    if (!selected) {
      dispatch(
        setSelectedSubfolders({
          ...selectedSubfolders,
          [folder.id]: folder,
        }),
      );
    } else {
      // Remove folder from selected
      const {[folder.id]: omitted, ...rest} = selectedSubfolders;
      dispatch(setSelectedSubfolders(rest));
    }
  };

  const getIsChangePrivateDisabled = (parentId: string | null) => {
    return folders.find(parentFolder => parentFolder.id === parentId)?.private;
  };

  const onPrivacyChange = async (folderId: string, isPrivate: boolean) => {
    const db = getFirestore(firebaseApp);
    await updateDoc(doc(db, 'folders', folderId), {
      private: isPrivate,
      updatedAt: Timestamp.fromDate(new Date()),
    });
  };

  const deleteFolderFromServer = useCallback(async () => {
    if (folderToDelete) {
      const db = getFirestore(firebaseApp);
      await deleteDoc(doc(db, 'folders', folderToDelete.id));
    }
    setNotification(null);
    setDeleteFodlerDelay(null);
    setFolderToDelete(null);
  }, [firebaseApp, folderToDelete]);

  useTimeout(deleteFolderFromServer, deleteFolderDelay);

  const onDeleteFolder = (folder: FolderType) => {
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

  const onShareClick = async (subfolderId: string, parentId: string) => {
    const link = `${window.location.origin}/profile/${
      router.query.userId ?? user.uid
    }/${parentId}/${subfolderId}`;
    await navigator.clipboard.writeText(link);
    setNotification({
      icon: './share-link.svg',
      message: 'Folder link copied',
    });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  useEffect(() => {
    const folders = [];
    let title = '';

    for (let i = 0; i < Object.keys(selectedFolders).length; i++) {
      const folderId = Object.keys(selectedFolders)[i];
      folders.push(...selectedFolders[folderId].children);

      if (i === Object.keys(selectedFolders).length - 1) {
        title += selectedFolders[folderId].name + ' / ';
      } else {
        title += selectedFolders[folderId].name + ', ';
      }
    }

    setSubFolders(folders);
    setHeaderTitle(title);
  }, [selectedFolders]);

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
          <div className="flex justify-between items-center">
            <H6>
              <span className="text-[#98A2B3]">{headerTitle}</span>Sub Folders
            </H6>
          </div>
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            {subFolders.length > 0 ? (
              subFolders
                ?.filter(f => f.id !== folderToDelete?.id)
                ?.map(folder => (
                  <div
                    key={folder.id}
                    className={cn(
                      styles.subFolder,
                      {
                        [styles.selected]: Object.prototype.hasOwnProperty.call(
                          selectedSubfolders,
                          folder.id,
                        ),
                      },
                      'group relative',
                    )}
                    onMouseLeave={() => setShowList('')}>
                    <div
                      className="hidden h-6 w-6 mr-2 flex items-center justify-center group-hover:flex bg-[#F9FAFB] rounded-full"
                      onClick={() => setShowList(folder.id)}>
                      <DotsHorizontalIcon className="w-4 h-6 hover:opacity-60 transition-all" />
                    </div>
                    {showList === folder.id && (
                      <ul
                        className="list left-0 z-20"
                        onClick={() => setSubfolder(folder)}>
                        <li
                          onClick={() =>
                            onShareClick(folder.id, folder.parent ?? '')
                          }>
                          Share
                          <img src="/share.svg" alt="" />
                        </li>
                        <li
                          className={
                            getIsChangePrivateDisabled(folder.parent)
                              ? 'opacity-50 items-center hover:!text-inherit hover:!cursor-default'
                              : 'items-center'
                          }
                          onClick={() => {
                            if (getIsChangePrivateDisabled(folder.parent))
                              return;
                            onPrivacyChange(folder.id, !folder.private);
                          }}>
                          {folder.private ? 'Make Public' : 'Make Private'}
                          {folder.private ? (
                            <EyeIcon className="w-4" />
                          ) : (
                            <img src="/lock-black.svg" alt="" />
                          )}
                        </li>
                        <li onClick={() => setShowEditFolderModal(true)}>
                          Rename
                          <img src="/edit-with-border.svg" alt="" />
                        </li>
                        <li
                          className="text-red-500"
                          onClick={() => onDeleteFolder(folder)}>
                          Delete
                          <img src="/trash.svg" alt="" />
                        </li>
                      </ul>
                    )}
                    {folder.private ? (
                      <img
                        className={cn(styles.icon)}
                        src="/lock.svg"
                        alt="private"
                      />
                    ) : (
                      <img
                        className={cn(styles.icon)}
                        src="/folder-empty.svg"
                        alt="public"
                      />
                    )}
                    <H6 classname="">{folder.name}</H6>
                    <Paragraph>{folder.numItems}</Paragraph>
                    <span
                      className={cn(styles.checkbox)}
                      onClick={() => onSubfolderSelect(folder)}
                    />
                  </div>
                ))
            ) : Object.keys(selectedFolders).length > 0 ? (
              <div
                className={cn(styles.subFolder, 'justify-center')}
                onClick={() => setShowNewSubFolderModal(true)}>
                <H6>+ Create Subfoloder</H6>
              </div>
            ) : null}
          </div>
        </div>
      </section>
      {showEditFolderModal && (
        <EditFolderModal
          parentFolder={{
            id: subfolder?.id || '',
            name: subfolder?.name || '',
            private: !!subfolder?.private,
            children: subfolder?.children || [],
          }}
          show={showEditFolderModal}
          onClose={() => setShowEditFolderModal(false)}
          hideCheckbox
        />
      )}
      {showNewSubFolderModal && (
        <AddNewSubFolderModal
          parentFolder={{
            id: selectedFolders[Object.keys(selectedFolders)[0]]?.id || '',
            name: selectedFolders[Object.keys(selectedFolders)[0]]?.name || '',
            private:
              !!selectedFolders[Object.keys(selectedFolders)[0]]?.private,
          }}
          show={showNewSubFolderModal}
          onClose={() => setShowNewSubFolderModal(false)}
        />
      )}
    </>
  );
};
