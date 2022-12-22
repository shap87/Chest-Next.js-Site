import {useEffect, useState} from 'react';
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
// components
import {H6, Paragraph} from '../../../common';
import {SelectedPanel} from '../SelectedPanel/SelectedPanel';
import {AddNewSubFolderModal} from '../../../dialogs';

// assets
import styles from '../../../../styles/profile.module.scss';
import {useAppDispatch, useAppSelector} from '../../../../hooks/redux';
import {
  FolderType,
  setSelectedFolders,
} from '../../../../store/modules/folders/foldersSlice';
import EditFolderModal from '../../../dialogs/EditFolderModal/EditFolderModal';
import EyeIcon from '../../../icons/EyeIcon';
// import MoveFolderModal from '../../../dialogs/MoveFolder/MoveFolder';

export const Folders = () => {
  const firebaseApp = useFirebase();

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

  const handleDeleteFolder = (folder: FolderType) => {
    const db = getFirestore(firebaseApp);
    if (folder.children.length > 0) {
      folder.children.forEach(subFolder => {
        deleteDoc(doc(db, 'folders', subFolder.id));
      });
    }

    deleteDoc(doc(db, 'folders', folder.id));
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

  console.log('selectedFolders', selectedFolders);

  return (
    <>
      <section className="py-4 md:py-8">
        <div className="container">
          {countSelected ? (
            <SelectedPanel
              type="folder"
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
                          onClick={() =>
                            handleChangePrivacy(folder, !folder.private)
                          }>
                          {folder.private ? 'Make Public' : 'Make Private'}
                          {folder.private ? (
                            <EyeIcon className="w-4" />
                          ) : (
                            <img src="/lock-black.svg" alt="" />
                          )}
                        </li>
                        <li>
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
    </>
  );
};
