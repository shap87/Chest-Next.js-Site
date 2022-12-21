import type {Product} from '../../types/Product';

import React from 'react';
//components
import Comments from './Comments';
import ProductHeader from './ProductHeader';
import ProductContent from './ProductContent';

interface Props {
  product: Product;
  onClose: () => void;
  onMarkPurchased: (productId: string, isPurchased: boolean) => void;
  onProductDelete: (productId: string) => void;
  onProductMove: (productId: string, folderId: string) => void;
  onEditProductNote: (productId: string, note: string) => void;
  onShareClick: (link: string) => void;
}

const ProductDetails: React.FC<Props> = ({
  product,
  onClose,
  onMarkPurchased,
  onProductDelete,
  onProductMove,
  onEditProductNote,
  onShareClick,
}) => {
  return (
    <div>
      <ProductHeader
        product={product as Product}
        onClose={onClose}
        onMarkPurchased={onMarkPurchased}
        onProductDelete={onProductDelete}
        onProductMove={onProductMove}
        onEditProductNote={onEditProductNote}
        onShareClick={onShareClick}
      />
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
