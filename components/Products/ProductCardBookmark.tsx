import type {Product} from '../../types/Product';

import React, {useState} from 'react';
import cn from 'classnames';
// hooks
// components
import BookmarkIcon from '../icons/BookmarkIcon';

interface Props {
  product: Product | null;
}

const ProductCardBookmark: React.FC<Props> = ({product}) => {
  const [productSaved, setProductSaved] = useState(false);

  return (
    <button
      className="absolute right-2 top-2 z-10"
      onClick={() => setProductSaved(!productSaved)}>
      <BookmarkIcon
        className={cn(
          'w-5 md:w-6 h-5 md:h-6 stroke-gray-400',
          productSaved && 'fill-gray-500',
        )}
      />
    </button>
  );
};

export default ProductCardBookmark;
