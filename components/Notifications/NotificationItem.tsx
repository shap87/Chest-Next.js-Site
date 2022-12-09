import type Notification from '../../types/Notification';

import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import cn from 'classnames';
import {useFirestoreDocumentData} from '@react-query-firebase/firestore';
import {doc} from 'firebase/firestore';
// hooks
import {useFirestore} from '../../context/firebase';
// components
import CloseIcon from '../icons/CloseIcon';

dayjs.extend(relativeTime);

interface Props {
  data: Notification;
  size?: 'small' | 'large';
}

const NotificationItem = React.forwardRef(function Item(
  props: Props,
  ref: any,
) {
  const {
    data: {
      createdAt,
      productId,
      interactorId,
      seen,
      type,
      discountInfo,
      comment,
    },
    size,
  } = props;

  const isDiscount = type === 0;
  const isLarge = size === 'large';

  const firestore = useFirestore();
  const product = useFirestoreDocumentData(
    ['products', productId],
    productId ? doc(firestore, 'products', productId) : undefined,
    {},
    {
      enabled: !!productId,
    },
  );

  const interactor = useFirestoreDocumentData(
    ['users', interactorId],
    interactorId ? doc(firestore, 'users', interactorId) : undefined,
    {},
    {
      enabled: !!interactorId,
    },
  );

  return (
    <div
      ref={ref}
      className="py-4 flex flex-row items-center justify-between cursor-pointer">
      <div className="flex flex-row items-center gap-2">
        <img
          className={cn(
            'h-12 w-12 object-fill',
            isDiscount ? 'rounded-lg' : 'rounded-full',
            isLarge && 'h-16 w-16',
          )}
          src={
            type === 0
              ? product.data?.imageUrl
              : interactor.data?.profilePictureUrl
          }
        />
        <div className="w-5/6">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'text-gray-700 font-semibold',
                !isLarge && 'text-sm',
              )}>
              {type === 0 ? product.data?.brand : interactor.data?.name}
            </span>
            <span className={cn(isLarge ? 'text-sm' : 'text-xs')}>
              {dayjs((createdAt?.seconds ?? 0) * 1000).fromNow()}
            </span>
            {!seen && (
              <span className="bg-main-50 text-main-700 font-semibold text-xs px-2 py-1 rounded-full">
                New
              </span>
            )}
          </div>
          {type === 0 && (
            <span className={cn('line-clamp-2', !isLarge && 'text-sm')}>
              {`Priced on ${product.data?.brand} `}
              <span className="text-main-700 font-semibold">dropped</span>
              {' from '}
              <span className="text-main-700 font-semibold">{`${Number(
                discountInfo?.prevPrice,
              ).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })} to ${Number(discountInfo?.price).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}`}</span>
            </span>
          )}
          {type === 1 && (
            <span className={cn('line-clamp-2', !isLarge && 'text-sm')}>
              <span className="text-main-700 font-semibold">
                Left a comment{' '}
              </span>
              {comment}
            </span>
          )}
          {type === 2 && (
            <span className={cn('line-clamp-2', !isLarge && 'text-sm')}>
              <span className="text-main-700 font-semibold">Liked </span>
              {product.data?.brand}
            </span>
          )}
          {type === 3 && (
            <span className={cn('line-clamp-2', !isLarge && 'text-sm')}>
              Started following you
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-row items-center gap-8">
        {(type === 1 || type === 2) && isLarge && (
          <img
            className="h-16 w-16 object-fill rounded-lg"
            src={product.data?.imageUrl}
          />
        )}
        <CloseIcon className="stroke-main-700 h-3 w-3" />
      </div>
    </div>
  );
});

export default NotificationItem;
