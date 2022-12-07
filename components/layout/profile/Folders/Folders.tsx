import { useEffect, useState } from 'react';
import cn from 'classnames';
import { useAuthUser } from '@react-query-firebase/auth';
import { useFirestoreQueryData } from '@react-query-firebase/firestore';
import { query, collection, where } from 'firebase/firestore';

// components
import { H6, Paragraph } from '../../../common';
import { SelectedPanel } from '../SelectedPanel/SelectedPanel';
import { useAuth, useFirestore } from '../../../../context/firebase';
import { useWindowSize } from '../../../../utils/useWindowSize';

// assets
import styles from '../../../../styles/profile.module.scss';

// TODO: to refactor the types, add createdAt/Entity
interface IFolder {
  id: string;
  userId: string;
  imageUrl: string;
  name: string;
  visibility: 0 | 1;
  parent: string;
  numItems: number;
  viewItems: number;
}

export const Folders = () => {
  const { width } = useWindowSize();

  const [showAll, setShowAll] = useState(false);
  const [count, setCount] = useState(6);
  const [selectedFolders, setSelectedFolders] = useState<{ [key: string]: IFolder; }>({});

  const auth = useAuth();
  const firestore = useFirestore();
  const user = useAuthUser(['user'], auth);

  // Define a query reference using the Firebase SDK
  const ref = query(
    collection(firestore, 'folders'),
    where('userId', '==', user.data?.uid ?? ''),
  );

  // Provide the query to the hook
  const foldersQuery = useFirestoreQueryData(
    ['folders', { userId: user.data?.uid }],
    ref,
  );

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

  if (foldersQuery.isLoading) {
    return <div className="container">
      <div>Loading...</div>
    </div>;
  }

  const countSelected = Object.keys(selectedFolders).length;

  return (
    <>
      <section className="py-4 md:py-8">
        <div className="container">
          {countSelected ? (
            <SelectedPanel
              selectAll={() => {
              }}
              removeSelected={() => {
              }}
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
              'flex flex-wrap items-center justify-between gap-y-12',
              styles.folders,
            )}>
            {foldersQuery.data
              ?.slice(0, showAll ? foldersQuery.data?.length ?? Infinity : count)
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
                    })}
                    onClick={() => {
                      if (!selected) {
                        setSelectedFolders({
                          ...selectedFolders,
                          [folder.id]: folder,
                        });
                      } else {
                        // Remove folder from selected
                        const { [folder.id]: omitted, ...rest } = selectedFolders;
                        setSelectedFolders(rest);
                      }
                    }}>
                    <div className={styles.settings}>
                      <img
                        className="w-1 group-hover:opacity-60 transition-all"
                        src={'/dots.svg'}
                        alt=""
                      />
                    </div>
                    <span className={styles.checkbox} />
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
    </>
  );
};
