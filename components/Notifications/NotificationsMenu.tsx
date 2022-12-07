import {Fragment} from 'react';
import {Menu, Transition} from '@headlessui/react';
import Image from 'next/image';
import {Button} from '../common';
import NotificationItem, {INotification} from './NotificationItem';
import EmptyNotification from './EmptyNotification';

export default function NotificationsMenu() {
  // TODO: to fetch notifications from Firestore
  const notifications = [
    {
      id: 'ada213',
      createdAt: new Date().toString(),
      name: 'Besart Çopa',
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/chestr-app.appspot.com/o/constants%2Fuser.png?alt=media&token=b1f74d09-46bd-45de-8930-c5c23440613a',
      product: {
        name: 'Dark Navy Avalon Knit Polo',
        imageUrl:
          'https://cdn.shopify.com/s/files/1/1407/3982/products/black-front-desktop_1_1.jpg?v=1626808704&width=200',
      },
      seen: false,
      type: 3,
    },
    {
      id: '123456',
      createdAt: new Date().toString(),
      name: 'Besart Çopa',
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/chestr-app.appspot.com/o/constants%2Fuser.png?alt=media&token=b1f74d09-46bd-45de-8930-c5c23440613a',
      product: {
        name: 'Dark Navy Avalon Knit Polo',
        imageUrl:
          'https://cdn.shopify.com/s/files/1/1407/3982/products/black-front-desktop_1_1.jpg?v=1626808704&width=200',
      },
      seen: false,
      type: 1,
      comment:
        'This dark navy, wow the pattern the looks so nice! Too bad it is probably',
    },
    {
      id: '131311',
      createdAt: new Date().toString(),
      name: 'Vincent Krugg',
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/chestr-app.appspot.com/o/constants%2Fuser.png?alt=media&token=b1f74d09-46bd-45de-8930-c5c23440613a',
      product: {
        name: 'Dark Navy Avalon Knit Polo',
        imageUrl:
          'https://cdn.shopify.com/s/files/1/1407/3982/products/black-front-desktop_1_1.jpg?v=1626808704&width=200',
      },
      seen: true,
      type: 2,
    },
    {
      id: '31223124',
      createdAt: new Date().toString(),
      name: 'Clint Yeager',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/1407/3982/products/black-front-desktop_1_1.jpg?v=1626808704&width=200',
      product: {
        name: 'Bullet Ruck',
        imageUrl:
          'https://cdn.shopify.com/s/files/1/1407/3982/products/black-front-desktop_1_1.jpg?v=1626808704&width=200',
      },
      seen: true,
      type: 0,
      discountInfo: {
        prevPrice: 405,
        price: '364.00',
      },
    },
  ] as INotification[];

  const count = notifications.filter(n => !n.seen).length;

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
          {notifications.length === 0 ? (
            <EmptyNotification />
          ) : (
            <Fragment>
              <div className="py-1 divide-y">
                {notifications.slice(0, 3).map(n => (
                  <Menu.Item key={n.id}>
                    {() => <NotificationItem {...n} />}
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
