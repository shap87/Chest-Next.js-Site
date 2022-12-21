import type {Product} from '../../types/Product';

import React from 'react';
import {useFirestoreDocumentData} from '@react-query-firebase/firestore';
import {doc} from 'firebase/firestore';
// hooks
import {useFirestore} from '../../context/firebase';
// components

interface Props {
  product: Product | null;
}

const ProductCardProfile: React.FC<Props> = ({product}) => {
  const firestore = useFirestore();

  const user = useFirestoreDocumentData(
    ['users', product?.userId],
    product?.userId ? doc(firestore, 'users', product?.userId) : undefined,
    {},
    {
      enabled: !!product?.userId,
    },
  );

  return (
    <div className="flex gap-1 md:gap-2 items-center p-1.5 md:p-2">
      <img
        className="shadow-gray-200 shadow-lg p-[2px] h-7 w-7 md:h-8 md:w-8 rounded-full"
        src={user.data?.profilePictureUrl ?? '/images/avatar.png'}
      />
      <span className="text-sm md:text-base text-gray-600">
        @{user.data?.username}
      </span>
    </div>
  );
};

export default ProductCardProfile;
