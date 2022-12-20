import type Notification from '../types/Notification';

import {getAuth} from 'firebase/auth';
import {useFirestoreQueryData} from '@react-query-firebase/firestore';
import {query, collection, where, orderBy} from 'firebase/firestore';
// hooks
import {useFirebase, useFirestore} from '../context/firebase';
import useWindowSize from '../hooks/useWindowSize';
// components
import {Layout} from '../components/common/Layout/Layout';
import NotificationItem from '../components/Notifications/NotificationItem';
import EmptyNotification from '../components/Notifications/EmptyNotification';

export default function NotificationsMenu() {
  const app = useFirebase();
  const firestore = useFirestore();
  const user = getAuth(app).currentUser;

  // Define a query reference using the Firebase SDK
  const ref = query(
    collection(firestore, 'notifications'),
    where('recipientId', '==', user?.uid ?? ''),
    orderBy('createdAt', 'desc'),
  );

  // Provide the query to the hook
  const notificationsQuery = useFirestoreQueryData(
    ['notifications', {recipientId: user?.uid}],
    ref,
  );

  const {width} = useWindowSize();

  return (
    <Layout title="Notifications | Chestr" description="Notifications | Chestr">
      <div className="container max-w-[1000px]">
        {notificationsQuery.data?.length === 0 ? (
          <div className="flex items-center justify-center py-24">
            <div className="max-w-[360px] scale-125">
              <EmptyNotification />
            </div>
          </div>
        ) : (
          <div className="py-12">
            <div className="py-1 divide-y">
              {notificationsQuery.data?.map((n, index) => (
                <NotificationItem
                  size={width && width < 640 ? 'small' : 'large'}
                  data={n as Notification}
                  key={`notification-detail-item-${index}`}></NotificationItem>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
