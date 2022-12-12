import {useState} from 'react';
import {FolderType} from '../../../../../store/modules/folders/foldersSlice';
interface IFolderSelectItem {
  folder: FolderType;
  setSelectedFolder: (value: string) => void;
  setShowList: (value: boolean) => void;
}

export const FolderSelectItem = ({
  folder,
  setSelectedFolder,
  setShowList,
}: IFolderSelectItem) => {
  const [showSubList, setShowSubList] = useState(false);

  return (
    <>
      {folder.children.length > 0 ? (
        showSubList ? (
          <img
            onClick={() => setShowSubList(!showSubList)}
            className="cursor-pointer arrow -rotate-90 transition-all hover:opacity-70"
            src={'./arrow-select.svg'}
            alt=""
          />
        ) : (
          <img
            onClick={() => setShowSubList(!showSubList)}
            className="cursor-pointer arrow transition-all hover:opacity-70"
            src={'./arrow-select.svg'}
            alt=""
          />
        )
      ) : null}
      {folder.type === 'private' ? (
        <img src={'./lock-black.svg'} alt="" />
      ) : (
        <img src={'./folder-empty.svg'} alt="" />
      )}
      <div
        className="cursor-pointer transition-all hover:opacity-70"
        onClick={() => {
          setSelectedFolder(folder.name);
          setShowList(false);
        }}>
        {folder.name}
      </div>
      {folder.children.length > 0 && showSubList && (
        <ul>
          {folder.children.map((subFolder, index) => (
            <li key={index}>
              {subFolder.type === 'private' ? (
                <img src={'./lock-black.svg'} alt="" />
              ) : (
                <img src={'./folder-empty.svg'} alt="" />
              )}
              <div
                className="cursor-pointer transition-all hover:opacity-70"
                onClick={() => {
                  setSelectedFolder(`${folder.name}/ ${subFolder.name}`);
                  setShowList(false);
                }}>
                <span className="text-[#98A2B3]">{folder.name}/</span>{' '}
                {subFolder.name}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
