import {useEffect, useState} from 'react';
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

// components
import {H6, Paragraph} from '../../../common';
import DotsHorizontalIcon from '../../../icons/DotsHorizontalIcon';
import EyeIcon from '../../../icons/EyeIcon';
import EditFolderModal from '../../../dialogs/EditFolderModal/EditFolderModal';

//  assets
import styles from '../../../../styles/profile.module.scss';
import {
  FolderType,
  setSelectedSubfolders,
} from '../../../../store/modules/folders/foldersSlice';

export const SubFolders = () => {
  const firebaseApp = useFirebase();
  const {selectedFolders, folders, selectedSubfolders} = useAppSelector(
    state => state.folders,
  );
  const dispatch = useAppDispatch();

  const [subFolders, setSubFolders] = useState<FolderType[]>([]);
  const [headerTitle, setHeaderTitle] = useState<string>('');
  const [showList, setShowList] = useState<string>('');
  const [subfolder, setSubfolder] = useState<FolderType | null>(null);
  const [showEditFolderModal, setShowEditFolderModal] =
    useState<boolean>(false);

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

  const onDeleteFolder = (folderId: string) => {
    const db = getFirestore(firebaseApp);
    deleteDoc(doc(db, 'folders', folderId));
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
      <section className="py-4 md:py-8">
        <div className="container">
          <div className="flex justify-between items-center">
            <H6>
              <span className="text-[#98A2B3]">{headerTitle}</span>Sub Folders
            </H6>
          </div>
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            {subFolders.length > 0 ? (
              subFolders?.map((folder, index) => (
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
                      <li>
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
                          if (getIsChangePrivateDisabled(folder.parent)) return;
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
                        onClick={() => onDeleteFolder(folder.id)}>
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
            ) : (
              <div className={cn(styles.subFolder, 'justify-center')}>
                <H6>+ Create Subfoloder</H6>
              </div>
            )}
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
    </>
  );
};
