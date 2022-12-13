import type {Product} from '../../types/Product';

import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface Props {
  product: Product | null;
}

const ProductContent: React.FC<Props> = ({product}) => {
  const price = product?.priceHistory?.[
    (product?.priceHistory?.length ?? 0) - 1
  ].toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 1,
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
        {/* TODO: add logic to show folder name */}
        <div className="bg-gray-50 rounded-xl flex items-center gap-1 absolute left-3 bottom-3 px-2 h-6">
          <img className="h-3 w-3" src="/folder-empty.svg" alt="folder" />
          <span className="text-xs font-medium">Home</span>
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
