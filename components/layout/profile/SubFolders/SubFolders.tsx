import { useState } from 'react';
import cn from 'classnames';

// components
import { H6, Paragraph } from '../../../common';
import { useAppSelector } from '../../../../hooks/redux';

//  assets
import styles from "../../../../styles/profile.module.scss";

export const SubFolders = () => {
  const { folders } = useAppSelector(state => state.folders);
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="py-4 md:py-8">
      <div className="container">
        <div className="flex justify-between items-center">
          <H6><span className="text-[#98A2B3]">Books</span> / Sub Folders</H6>
        </div>
        <div
          className='flex flex-wrap items-center gap-4 md:gap-6'>
          {folders.length > 0 ? folders?.map((folder, index) => (
              <div
                key={folder.id}
                className={cn(styles.subFolder, { [styles.selected]: selected === index })}
                onClick={() => setSelected(index)}>
                {folder.visibility === 1
                  ? <img className={cn(styles.icon)} src={'/lock.svg'} alt="private" />
                  : <img className={cn(styles.icon)} src={'/folder-empty.svg'} alt="public" />}
                <H6 classname="">{folder.name}</H6>
                <Paragraph>{folder.numItems}</Paragraph>
                <span className={cn(styles.checkbox)} />
              </div>
            ))
            : <div
              className={cn(styles.subFolder, "justify-center")}>
              <H6>+ Create Subfoloder</H6>
            </div>}
        </div>
      </div>
    </section>
  );
};
