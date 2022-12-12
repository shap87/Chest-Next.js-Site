import {useEffect, useState} from 'react';
import cn from 'classnames';

// components
import {H6, Paragraph} from '../../../common';
import {SelectedPanel} from '../SelectedPanel/SelectedPanel';
import {useWindowSize} from '../../../../utils/useWindowSize';
import {AddNewSubFolderModal} from '../../../dialogs';

// assets
import styles from '../../../../styles/profile.module.scss';
import {useAppSelector} from '../../../../hooks/redux';
import {FolderType} from '../../../../store/modules/folders/foldersSlice';

export const Folders = () => {
  const {folders} = useAppSelector(state => state.folders);
  const {width} = useWindowSize();

  const [showAll, setShowAll] = useState(false);
  const [count, setCount] = useState(6);
  const [selectedFolders, setSelectedFolders] = useState<{
    [key: string]: FolderType;
  }>({});
  const [showNewSubFolderModal, setShowNewSubFolderModal] =
    useState<boolean>(true);

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

  const countSelected = Object.keys(selectedFolders).length;

  return (
    <>
      <section className="py-4 md:py-8">
        <div className="container">
          {countSelected ? (
            <SelectedPanel
              selectAll={() => {}}
              removeSelected={() => {}}
              countSelected={countSelected}
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
                  src={'/arrow-select.svg'}
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
                  src={'/arrow-select.svg'}
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
                        src={'/dots.svg'}
                        alt=""
                      />
                      <ul
                        className="list hidden left-0 group-hover:block"
                        onClick={() => setShowNewSubFolderModal(true)}>
                        <li>
                          New Sub folder
                          <img src={'./folder.svg'} alt="" />
                        </li>
                        <li>
                          Edit Folder
                          <img src={'./edit-with-border.svg'} alt="" />
                        </li>
                        <li>
                          Move Folder
                          <img src={'./switch.svg'} alt="" />
                        </li>
                        <li>
                          Make Public
                          <img src={'./lock-black.svg'} alt="" />
                        </li>
                        <li>
                          Share
                          <img src={'./share.svg'} alt="" />
                        </li>
                        <li className="text-danger">
                          Delete
                          <img src={'./trash.svg'} alt="" />
                        </li>
                      </ul>
                    </div>
                    <span
                      className={styles.checkbox}
                      onClick={() => {
                        if (!selected) {
                          setSelectedFolders({
                            ...selectedFolders,
                            [folder.id]: folder,
                          });
                        } else {
                          // Remove folder from selected
                          const {[folder.id]: omitted, ...rest} =
                            selectedFolders;
                          setSelectedFolders(rest);
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
                      {folder.visibility === 1 && (
                        <img
                          className={styles.lock}
                          src={'/lock.svg'}
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
          show={showNewSubFolderModal}
          onClose={() => setShowNewSubFolderModal(false)}
        />
      )}
    </>
  );
};
