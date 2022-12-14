import Notification, {NotificationType} from '../../types/Notification';

import React, {useState} from 'react';
import {
  useFirestoreCollectionMutation,
  useFirestoreQueryData,
} from '@react-query-firebase/firestore';
import {query, collection, orderBy, Timestamp} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
// hooks
import {useFirebase, useFirestore} from '../../context/firebase';
//components
import CommentItem from './CommentItem';
import ArrowUpIcon from '../icons/ArrowUpIcon';
import Comment from '../../types/Comment';

interface Props {
  productId: string;
  recipientId: string;
}

const Comments: React.FC<Props> = ({productId, recipientId}) => {
  const app = useFirebase();
  const {currentUser} = getAuth(app);
  const firestore = useFirestore();

  const commentsRef = collection(firestore, `products/${productId}/comments`);
  const comments = useFirestoreQueryData(
    `products/${productId}/comments`,
    query(commentsRef, orderBy('createdAt')),
    {
      subscribe: true,
    },
  );
  const commentsMutation = useFirestoreCollectionMutation(commentsRef);

  const notificationsRef = collection(firestore, 'notifications');
  const notificationsMutation =
    useFirestoreCollectionMutation(notificationsRef);

  const [comment, setComment] = useState('');

  const sendComment = () => {
    const now = Timestamp.fromDate(new Date());
    commentsMutation.mutate(
      {
        comment,
        id: commentsRef.id,
        userId: currentUser?.uid!,
        createdAt: now,
        updatedAt: now,
      },
      {
        onSuccess() {
          const commentNotification: Notification = {
            id: notificationsRef.id,
            type: NotificationType.Comment,
            recipientId,
            interactorId: currentUser?.uid ?? '',
            productId: productId,
            comment,
            seen: false,
            createdAt: now,
            updatedAt: now,
          };

          notificationsMutation.mutate(commentNotification);
        },
      },
    );
    setComment('');
  };

  return (
    <div className="flex flex-col divide-y">
      <div className="flex flex-col gap-4 p-4 md:p-6 overflow-y-auto flex-1 max-h-[500px]">
        {comments.data?.map(comment => (
          <CommentItem
            key={comment.createdAt?.seconds + comment.id}
            comment={comment as Comment}
          />
        ))}
      </div>
      <div className="flex gap-3 p-4">
        <input
          className="focus:border-main-300 focus:outline-main-50 outline-4 outline-offset-0"
          type="text"
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Add comment"
        />
        <button
          className="px-3 py-2 bg-main-600 hover:bg-white hover:border-main-500 stroke-white hover:stroke-main-500 border rounded-md"
          disabled={commentsMutation.isLoading || comment.length === 0}
          onClick={sendComment}>
          <ArrowUpIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Comments;
