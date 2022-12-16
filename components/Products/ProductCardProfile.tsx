import type {Product} from '../../types/Product';

import React, {useState} from 'react';
import cn from 'classnames';
import {useFirestoreDocumentData} from '@react-query-firebase/firestore';
import {doc} from 'firebase/firestore';
// hooks
import {useFirestore} from '../../context/firebase';
// components
import BookmarkIcon from '../icons/BookmarkIcon';

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

  const [productSaved, setProductSaved] = useState(false);

  return (
    <div className="flex justify-between items-center p-1.5 md:p-2">
      <div className="flex gap-1 md:gap-2 items-center">
        <img
          className="shadow-gray-200 shadow-lg p-[2px] h-7 w-7 md:h-8 md:w-8 rounded-full shadow-sm"
          src={user.data?.profilePictureUrl ?? '/images/avatar.png'}
        />
        <span className="text-sm md:text-base text-gray-600">
          @{user.data?.username}
        </span>
      </div>
      <button onClick={() => setProductSaved(!productSaved)}>
        <BookmarkIcon
          className={cn(
            'w-5 md:w-6 h-5 md:h-6 stroke-gray-300',
            productSaved && 'fill-gray-500',
          )}
        />
      </button>
    </div>
  );
};

export default ProductCardProfile;
