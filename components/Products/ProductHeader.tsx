import type {Product} from '../../types/Product';

import React, {useState} from 'react';
import Link from 'next/link';
import {useFirestoreDocumentData} from '@react-query-firebase/firestore';
import {doc} from 'firebase/firestore';
// hooks
import {useFirestore} from '../../context/firebase';
import useWindowSize from '../../hooks/useWindowSize';
//components
import CloseIcon from '../icons/CloseIcon';
import ProductMenu from './ProductMenu';
import {EditProductNoteModal, MoveProductModal} from '../dialogs';

interface Props {
  product: Product;
  onClose: () => void;
  onMarkPurchased: (productId: string, isPurchased: boolean) => void;
  onProductDelete: (productId: string) => void;
  onProductMove: (productId: string, folderId: string) => void;
  onEditProductNote: (productId: string, note: string) => void;
  onShareClick: (link: string) => void;
}

const ProductHeader: React.FC<Props> = ({
  product,
  onClose,
  onMarkPurchased,
  onProductDelete,
  onProductMove,
  onEditProductNote,
  onShareClick,
}) => {
  const firestore = useFirestore();

  const user = useFirestoreDocumentData(
    ['users', product?.userId],
    product?.userId ? doc(firestore, 'users', product?.userId) : undefined,
    {},
    {
      enabled: !!product?.userId,
    },
  );

  const {width} = useWindowSize();

  const [showMoveProductModal, setShowMoveProductModal] =
    useState<boolean>(false);
  const [showEditNoteModal, setShowEditNoteModal] = useState<boolean>(false);

  return (
    <>
      <div className="flex items-center justify-between border-b px-6 py-3 border-gray-200">
        <div className="flex flex-row-reverse md:flex-row items-center gap-2 md:min-w-[50%]">
          <img
            className="hidden md:block shadow-gray-200 shadow-lg p-[2px] h-10 w-10 rounded-full shadow-sm"
            src={user.data?.profilePictureUrl ?? '/images/avatar.png'}
          />
          <span className="hidden md:block font-bold">
            {user.data?.username}
          </span>
          <Link href={product?.productUrl ?? ''} passHref>
            <a
              target="_blank"
              className="md:mr-6 ml-6 md:ml-auto flex gap-3 items-center font-semibold text-sm rounded-lg outline-1 outline-gray-300 px-3 py-2 no-underline text-primary">
              View Item
              <img className="w-4 h-4" src="/link-external.svg" />
            </a>
          </Link>
          <div className="mt-2">
            <ProductMenu
              isPurchased={!!product?.isPurchased}
              onProductDelete={() => onProductDelete(product?.id as string)}
              onOpenMoveFolderModal={() => setShowMoveProductModal(true)}
              onOpenEditNoteModal={() => setShowEditNoteModal(true)}
              onMarkPurchased={() =>
                onMarkPurchased(product?.id as string, !product?.isPurchased)
              }
              onShareClick={() => onShareClick(product?.productUrl || '')}
              align={width && width < 640 ? 'left' : 'right'}
            />
          </div>
        </div>
        <button onClick={onClose}>
          <CloseIcon className="stroke-primary h-4 w-4" />
        </button>
      </div>
      {showMoveProductModal && (
        <MoveProductModal
          show={showMoveProductModal}
          onClose={() => setShowMoveProductModal(false)}
          onSubmit={(folderId: string) =>
            onProductMove(product?.id || '', folderId)
          }
        />
      )}
      {showEditNoteModal && (
        <EditProductNoteModal
          show={showEditNoteModal}
          onClose={() => setShowEditNoteModal(false)}
          product={product}
          onEditProductNote={onEditProductNote}
        />
      )}
    </>
  );
};

export default ProductHeader;
