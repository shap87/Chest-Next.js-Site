//  components
import {FolderSelectItem} from './components/FolderSelectItem/FolderSelectItem';
import {useAppSelector} from '../../../hooks/redux';
import {FolderType} from '../../../store/modules/folders/foldersSlice';

interface IFolderSelect {
  setShowList: (value: boolean) => void;
  selectedFolder: string;
  setSelectedFolder: (value: string) => void;
}

export const FolderSelect = ({
  setShowList,
  setSelectedFolder,
}: IFolderSelect) => {
  const {folders} = useAppSelector(state => state.folders);
  return (
    <ul className="list list-select group-hover:block">
      {folders.map((folder: FolderType, index) => (
        <li key={index}>
          <FolderSelectItem
            folder={folder}
            setShowList={setShowList}
            setSelectedFolder={setSelectedFolder}
          />
        </li>
      ))}
    </ul>
  );
};
