import type {Product} from '../../types/Product';

import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import cn from 'classnames';
// components
import FolderBadge from './FolderBadge';
import ProductMenu from './ProductMenu';

dayjs.extend(relativeTime);

interface Props {
  product: Product | null;
  selected?: boolean;
  onToggleSelect: () => void;
  onViewDetail: () => void;
}

const ProductCard: React.FC<Props> = ({
  product,
  selected,
  onToggleSelect,
  onViewDetail,
}) => {
  const price = product?.price?.toLocaleString('en-US', {
    style: 'currency',
    currency: product?.priceCurrency ?? 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return (
    <div
      className={cn(
        'rounded-lg outline-2 outline-offset-0 outline-gray-200',
        selected && 'outline-main-300',
      )}>
      <div className="relative">
        <div className="absolute left-3 top-3">
          <ProductMenu productId={product?.id!} align="left" />
        </div>
        <span
          className={cn(
            'checkbox',
            selected && 'before:block !border-main-300',
          )}
          onClick={onToggleSelect}
        />
        <img
          className="h-72 md:h-80 rounded-lg rounded-b-none object-cover cursor-pointer"
          src={product?.imageUrl}
          alt="product"
          onClick={onViewDetail}
        />
        <div className="absolute right-3 bottom-3">
          {product?.parent ? <FolderBadge folderId={product.parent} /> : null}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400 uppercase">
            {product?.brand}
          </span>
          <span className="text-sm text-gray-400">
            {dayjs(product?.createdAt?.toMillis()).fromNow()}
          </span>
        </div>
        <p
          className="text-xl text-gray-600 mt-4 line-clamp-2 cursor-pointer"
          onClick={onViewDetail}>
          {product?.title}
        </p>
        <p className="text-xl text-gray-600 font-semibold mt-4">{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
