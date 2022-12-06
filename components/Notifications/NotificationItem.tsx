import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import classNames from 'classnames';
import CloseIcon from '../icons/CloseIcon';

dayjs.extend(relativeTime);

// TODO: to use Notification from global types
export type INotification = {
  id: string;
  createdAt: string;
  name: string;
  imageUrl: string;
  seen: boolean;
  type: number;
  product: {
    name: string;
    imageUrl: string;
  };
  discountInfo?: {
    prevPrice: number | string;
    price: string | string;
  };
  comment?: string;
};

interface Props extends INotification {
  size?: 'small' | 'large';
}

// TODO: to get product from productId?
const NotificationItem = React.forwardRef(function Item(
  props: Props,
  ref: any,
) {
  const {
    createdAt,
    name,
    imageUrl,
    product,
    seen,
    type,
    discountInfo,
    comment,
    size,
  } = props;

  const isDiscount = type === 0;
  const isLarge = size === 'large';
  return (
    <div
      ref={ref}
      className="py-4 flex flex-row items-center justify-between cursor-pointer">
      <div className="flex flex-row items-center gap-2">
        <img
          className={classNames(
            'h-12 w-12 object-fill',
            isDiscount ? 'rounded-lg' : 'rounded-full',
            isLarge && 'h-16 w-16',
          )}
          src={imageUrl}
        />
        <div className="w-5/6">
          <div className="flex items-center gap-2">
            <span
              className={classNames(
                'text-gray-700 font-semibold',
                !isLarge && 'text-sm',
              )}>
              {name}
            </span>
            <span className={classNames(isLarge ? 'text-sm' : 'text-xs')}>
              {dayjs(createdAt).fromNow()}
            </span>
            {!seen && (
              <span className="bg-main-50 text-main-700 font-semibold text-xs px-2 py-1 rounded-full">
                New
              </span>
            )}
          </div>
          {type === 0 && (
            <span className={classNames('line-clamp-2', !isLarge && 'text-sm')}>
              {`Priced on ${product.name} `}
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
            <span className={classNames('line-clamp-2', !isLarge && 'text-sm')}>
              <span className="text-main-700 font-semibold">
                Left a comment{' '}
              </span>
              {comment}
            </span>
          )}
          {type === 2 && (
            <span className={classNames('line-clamp-2', !isLarge && 'text-sm')}>
              <span className="text-main-700 font-semibold">Liked </span>
              {product.name}
            </span>
          )}
          {type === 3 && (
            <span className={classNames('line-clamp-2', !isLarge && 'text-sm')}>
              Started following you
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-row items-center gap-8">
        {(type === 1 || type === 2) && isLarge && (
          <img
            className="h-16 w-16 object-fill rounded-lg"
            src={product.imageUrl}
          />
        )}
        <CloseIcon />
      </div>
    </div>
  );
});

export default NotificationItem;
