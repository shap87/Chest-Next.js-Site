import React from 'react';
import {useFirestoreDocumentData} from '@react-query-firebase/firestore';
import {doc} from 'firebase/firestore';
// hooks
import {useFirestore} from '../../context/firebase';

interface Props {
  folderId: string;
}

const FolderBadge: React.FC<Props> = ({folderId}) => {
  const firestore = useFirestore();
  const folder = useFirestoreDocumentData(
    ['folders', folderId],
    doc(firestore, 'folders', folderId),
    {},
  );

  const parent = useFirestoreDocumentData(
    ['folders', folder.data?.parent],
    folder.data?.parent && doc(firestore, 'folders', folder.data?.parent),
    {},
    {
      enabled: !!folder.data?.parent,
    },
  );

  return (
    <div className="bg-gray-50 rounded-xl flex items-center gap-1 px-1.5 h-5">
      <img className="h-3 w-3" src="/folder-empty.svg" alt="folder" />
      <span className="text-xs font-medium">
        {parent.data ? parent.data?.name + '/' : ''}
        {folder.data?.name}
      </span>
    </div>
  );
};

export default FolderBadge;
