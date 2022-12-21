import {useState} from 'react';
import {FolderType} from '../../../../../store/modules/folders/foldersSlice';
interface IFolderSelectItem {
  folder: FolderType;
  setSelectedFolder: (value: FolderType) => void;
  setShowList: (value: boolean) => void;
  setPlaceHolder: (value: string) => void;
}

export const FolderSelectItem = ({
  folder,
  setSelectedFolder,
  setShowList,
  setPlaceHolder,
}: IFolderSelectItem) => {
  const [showSubList, setShowSubList] = useState(false);

  return (
    <>
      {folder.children.length > 0 ? (
        showSubList ? (
          <img
            onClick={() => setShowSubList(!showSubList)}
            className="cursor-pointer arrow -rotate-90 transition-all hover:opacity-70"
            src="/arrow-select.svg"
            alt=""
          />
        ) : (
          <img
            onClick={() => setShowSubList(!showSubList)}
            className="cursor-pointer arrow transition-all hover:opacity-70"
            src="/arrow-select.svg"
            alt=""
          />
        )
      ) : null}
      <img src="./folder-empty.svg" alt="" />
      <div
        className="cursor-pointer transition-all hover:opacity-70"
        onClick={() => {
          setSelectedFolder(folder);
          setPlaceHolder(folder.name);
          setShowList(false);
        }}>
        {folder.name}
        {folder.private && (
          <img src="./lock-black.svg" className="lock" alt="" />
        )}
      </div>
      {folder.children.length > 0 && showSubList && (
        <ul>
          {folder.children.map((subFolder, index) => (
            <li key={index}>
              <img src="./folder-empty.svg" alt="" />
              <div
                className="cursor-pointer transition-all hover:opacity-70"
                onClick={() => {
                  setSelectedFolder(subFolder);
                  setPlaceHolder(`${folder.name}/ ${subFolder.name}`);
                  setShowList(false);
                }}>
                <span className="text-[#98A2B3]">{folder.name}/</span>{' '}
                {subFolder.name}
                {subFolder.private && (
                  <img src="./lock-black.svg" className="lock" alt="" />
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
