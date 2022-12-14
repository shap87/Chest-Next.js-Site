import type Comment from '../../types/Comment';

import React from 'react';
import {useFirestoreDocumentData} from '@react-query-firebase/firestore';
import {doc} from 'firebase/firestore';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// hooks
import {useFirestore} from '../../context/firebase';

dayjs.extend(relativeTime);

interface Props {
  comment: Comment;
}

const CommentItem: React.FC<Props> = ({comment}) => {
  const firestore = useFirestore();
  const user = useFirestoreDocumentData(
    ['users', comment?.userId],
    comment?.userId ? doc(firestore, 'users', comment.userId) : undefined,
    {},
    {
      enabled: !!comment?.userId,
    },
  );
  return (
    <div className="flex flex-row justify-between cursor-pointer">
      <div className="flex flex-row items-center gap-3">
        <img
          className="shadow-gray-200 shadow-lg p-[2px] h-12 w-12 rounded-full shadow-sm"
          src={user.data?.profilePictureUrl}
        />
        <div className="flex flex-col gap-1 max-w-[80%]">
          <span className="text-gray-700 text-sm font-medium">
            {user.data?.name}
            <span className="text-gray-600 text-xs ml-3">
              {dayjs(comment.createdAt?.toMillis()).fromNow()}
            </span>
          </span>
          <span className="text-gray-600 text-sm">{comment.comment}</span>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
