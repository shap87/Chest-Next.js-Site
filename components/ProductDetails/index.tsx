import type {Product} from '../../types/Product';

import React from 'react';
import {useFirestoreDocumentData} from '@react-query-firebase/firestore';
import {doc} from 'firebase/firestore';
// hooks
import {useFirestore} from '../../context/firebase';
//components
import Comments from './Comments';
import ProductHeader from './ProductHeader';
import ProductContent from './ProductContent';

interface Props {
  productId: string;
  onClose: () => void;
}

const ProductDetails: React.FC<Props> = ({productId, onClose}) => {
  const firestore = useFirestore();
  const product = useFirestoreDocumentData(
    ['products', productId],
    doc(firestore, 'products', productId),
  );

  return (
    <div>
      <ProductHeader product={product.data as Product} onClose={onClose} />
      <div className="flex flex-col md:flex-row divide-y md:divide-x">
        <div className="md:w-[52%]">
          <ProductContent product={product.data as Product} />
        </div>
        <div className="md:w-[48%]">
          <Comments productId={productId} recipientId={product.data?.userId} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
