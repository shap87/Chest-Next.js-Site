import type {Product} from '../../types/Product';

import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// components
import FolderBadge from './FolderBadge';

dayjs.extend(relativeTime);

interface Props {
  product: Product | null;
}

const ProductContent: React.FC<Props> = ({product}) => {
  const price = product?.price?.toLocaleString('en-US', {
    style: 'currency',
    currency: product?.priceCurrency ?? 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return (
    <div className="mx-4 md:mx-8 my-5 md:my-6">
      <div className="relative">
        <img
          className="h-72 md:h-[382px] rounded-lg border-gray-100 border object-cover"
          src={product?.imageUrl}
          alt="product"
        />
        <div className="absolute left-3 bottom-3">
          {product?.parent ? <FolderBadge folderId={product.parent} /> : null}
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400 uppercase">
            {product?.brand}
          </span>
          <span className="text-sm text-gray-400">
            {dayjs(product?.createdAt?.toMillis()).fromNow()}
          </span>
        </div>
        <p className="text-xl text-gray-600 mt-4">{product?.title}</p>
        <p className="text-xl text-gray-600 font-semibold mt-4">{price}</p>
      </div>
    </div>
  );
};

export default ProductContent;
