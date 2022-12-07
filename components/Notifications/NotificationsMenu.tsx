import type Notification from '../../types/Notification';

import {Fragment} from 'react';
import {Menu, Transition} from '@headlessui/react';
import Image from 'next/image';
import {getAuth} from 'firebase/auth';
import {useFirestoreQueryData} from '@react-query-firebase/firestore';
import {query, collection, where, orderBy} from 'firebase/firestore';
// hooks
import {useFirebase, useFirestore} from '../../context/firebase';
// component
import {Button} from '../common';
import NotificationItem from './NotificationItem';
import EmptyNotification from './EmptyNotification';

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

  const count = notificationsQuery.data?.filter(n => !n.seen).length;

  return (
    <Menu as="div" className="z-10 relative inline-block text-left">
      <div className="absolute z-10 -top-1 -right-1 text-[11px] text-white flex items-center justify-center font-bold bg-primary h-4 p-0.5 min-w-[16px] rounded-full border border-white pointer-events-none">
        {count}
      </div>
      <Menu.Button as="li" className="flex items-center">
        <Image
          src={'/bell.svg'}
          alt="alert icon"
          className="items-center"
          width={24}
          height={25}
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="absolute right-0 z-10 mt-2 p-5 w-[350px] origin-top-right rounded-md bg-white shadow-lg focus:outline-none">
          {notificationsQuery.data?.length === 0 ? (
            <EmptyNotification />
          ) : (
            <Fragment>
              <div className="py-1 divide-y">
                {notificationsQuery.data?.slice(0, 3).map((n, index) => (
                  <Menu.Item key={`notification-item-${index}`}>
                    {() => <NotificationItem data={n as Notification} />}
                  </Menu.Item>
                ))}
              </div>
              <div className="mt-6">
                <Button
                  classname="w-full !py-2 !text-sm"
                  href="/notifications"
                  color="light-pink">
                  See all
                </Button>
              </div>
            </Fragment>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
