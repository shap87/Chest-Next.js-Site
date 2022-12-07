// components
import {Layout} from '../components/common/Layout/Layout';
import NotificationItem, {
  INotification,
} from '../components/Notifications/NotificationItem';
import EmptyNotification from '../components/Notifications/EmptyNotification';

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

  return (
    <Layout title="Notifications | Chestr" description="Notifications | Chestr">
      <div className="container max-w-[1000px]">
        {notifications.length === 0 ? (
          <div className="flex items-center justify-center py-24">
            <div className="max-w-[360px] scale-125">
              <EmptyNotification />
            </div>
          </div>
        ) : (
          <div className="py-12">
            <div className="py-1 divide-y">
              {notifications.map(n => (
                <NotificationItem size="large" key={n.id} {...n} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
