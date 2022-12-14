import type {Product} from '../../types/Product';

import React from 'react';
//components
import Comments from './Comments';
import ProductHeader from './ProductHeader';
import ProductContent from './ProductContent';

interface Props {
  product: Product;
  onClose: () => void;
}

const ProductDetails: React.FC<Props> = ({product, onClose}) => {
  return (
    <div>
      <ProductHeader product={product as Product} onClose={onClose} />
      <div className="flex flex-col md:flex-row divide-y md:divide-x">
        <div className="md:w-[52%]">
          <ProductContent product={product} />
        </div>
        <div className="md:w-[48%]">
          <Comments productId={product.id!} recipientId={product?.userId} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
