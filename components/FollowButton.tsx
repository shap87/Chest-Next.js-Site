import {
  useFirestoreCollectionMutation,
  useFirestoreDocumentDeletion,
  useFirestoreDocumentMutation,
  useFirestoreQueryData,
} from '@react-query-firebase/firestore';
import {query, collection, Timestamp, doc} from 'firebase/firestore';
// hooks
import {useFirestore} from '../context/firebase';
import {useAppSelector} from '../hooks/redux';
import Notification, {NotificationType} from '../types/Notification';
// components
import {Button} from './common';

const FollowButton: React.FC<{userId: string; className?: string}> = ({
  userId,
  className,
}) => {
  const {user} = useAppSelector(state => state.user);

  const firestore = useFirestore();
  const followingRef = query(
    collection(firestore, `users/${user?.uid}/following`),
  );
  const followingQuery = useFirestoreQueryData(
    `users/${user?.uid}/following`,
    user?.uid ? followingRef : undefined,
    {
      subscribe: true,
    },
  );

  const isFollowing =
    (followingQuery.data?.findIndex(u => u.uid === userId) ?? -1) > -1;

  const followRef = doc(firestore, `users/${user?.uid}/following/${userId}`);
  const followMutation = useFirestoreDocumentMutation(followRef);
  const unfollowMutation = useFirestoreDocumentDeletion(followRef);

  const notificationsRef = collection(firestore, 'notifications');
  const notificationsMutation =
    useFirestoreCollectionMutation(notificationsRef);

  const followUser = () => {
    const now = Timestamp.fromDate(new Date());
    followMutation.mutate(
      {
        uid: userId,
        createdAt: now,
        updatedAt: now,
      },
      {
        onSuccess() {
          const commentNotification: Notification = {
            id: notificationsRef.id,
            type: NotificationType.Follow,
            recipientId: userId,
            interactorId: user?.uid ?? '',
            seen: false,
            createdAt: now,
            updatedAt: now,
          };

          notificationsMutation.mutate(commentNotification);
        },
      },
    );
  };

  return (
    <Button
      onClick={() => {
        if (!isFollowing) {
          followUser();
        } else {
          unfollowMutation.mutate();
        }
      }}
      htmlType="button"
      classname={className}
      color={!isFollowing ? 'light-pink' : undefined}>
      {isFollowing ? 'Following' : 'Follow'}
    </Button>
  );
};

export default FollowButton;
