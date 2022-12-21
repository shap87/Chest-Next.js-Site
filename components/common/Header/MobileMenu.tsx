import React, {Fragment} from 'react';
import Image from 'next/image';
import cn from 'classnames';
import {Popover, Transition} from '@headlessui/react';
import {getAuth} from 'firebase/auth';
import {useFirestoreQueryData} from '@react-query-firebase/firestore';
import {query, collection, where, orderBy} from 'firebase/firestore';
// hooks
import {useFirebase, useFirestore} from '../../../context/firebase';
import {useRouter} from 'next/router';
import GlobeIcon from '../../icons/GlobeIcon';
import ChestIcon from '../../icons/ChestIcon';
import BellIcon from '../../icons/BellIcon';

const MobileMenu = () => {
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

  const router = useRouter();

  const count = notificationsQuery.data?.filter(n => !n.seen).length;

  return (
    <Popover>
      <Popover.Button className="z-10 relative flex md:hidden text-left">
        <div className="absolute z-10 -top-1 -right-1 text-[11px] text-white flex items-center justify-center font-semibold bg-red-500 h-4 p-0.5 min-w-[16px] rounded-full border border-white pointer-events-none">
          {count}
        </div>
        <Image
          src="/menu.svg"
          alt="alert icon"
          className="items-center"
          width={26}
          height={26}
        />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Popover.Panel className="absolute right-0 z-10 mt-2 p-5 w-56 max-h-96 origin-top-right rounded-3xl bg-white shadow-lg focus:outline-none divide-y overflow-y-auto">
          <ul className="flex flex-col gap-6">
            <li
              className="flex flex-row items-center gap-3"
              onClick={() => router.push('/community')}>
              <GlobeIcon
                className={cn(
                  'w-5 h-5',
                  router.asPath === '/community'
                    ? 'stroke-main-500'
                    : 'stroke-primary',
                )}
              />
              <span
                className={cn(
                  'font-semibold',
                  router.asPath === '/community'
                    ? 'text-main-500'
                    : 'text-primary',
                )}>
                Community
              </span>
            </li>
            <li
              className="flex flex-row items-center gap-3"
              onClick={() => router.push('/notifications')}>
              <div className="relative">
                <div className="absolute z-10 -top-1.5 -right-1.5 text-[11px] text-white flex items-center justify-center font-semibold bg-red-500 h-4 p-0.5 min-w-[16px] rounded-full border border-white pointer-events-none">
                  {count}
                </div>
                <BellIcon
                  className={cn(
                    'w-5 h-5',
                    router.asPath === '/notifications'
                      ? 'stroke-main-500'
                      : 'stroke-primary',
                  )}
                />
              </div>

              <span
                className={cn(
                  'font-semibold',
                  router.asPath === '/notifications'
                    ? 'text-main-500'
                    : 'text-primary',
                )}>
                Notifications
              </span>
            </li>
            <li
              className="flex flex-row items-center gap-3"
              onClick={() => router.push('/profile')}>
              <ChestIcon
                className={cn(
                  'w-5 h-5',
                  router.asPath === '/profile'
                    ? 'stroke-main-500'
                    : 'stroke-primary',
                )}
              />
              <span
                className={cn(
                  'font-semibold',
                  router.asPath === '/profile'
                    ? 'text-main-500'
                    : 'text-primary',
                )}>
                Chest
              </span>
            </li>
          </ul>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default MobileMenu;
