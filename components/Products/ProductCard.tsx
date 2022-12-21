import type {Product} from '../../types/Product';

import React, {useState} from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import cn from 'classnames';
// components
import FolderBadge from './FolderBadge';
import ProductMenu from './ProductMenu';
import ProductCardProfile from './ProductCardProfile';
import {EditProductNoteModal, MoveProductModal} from '../dialogs';
import ProductCardBookmark from './ProductCardBookmark';

dayjs.extend(relativeTime);

interface Props {
  product: Product;
  selected?: boolean;
  displayProfile?: boolean;
  displayMenu?: boolean;
  displaySelect?: boolean;
  displayBookmark?: boolean;
  onToggleSelect?: () => void;
  onViewDetail: () => void;
  onMarkPurchased: (productId: string, isPurchased: boolean) => void;
  onProductDelete: (productId: string) => void;
  onProductMove: (productId: string, folderId: string) => void;
  onEditProductNote: (productId: string, note: string) => void;
  onShareClick: (link: string) => void;
  size?: 'small' | 'medium';
}

const ProductCard: React.FC<Props> = ({
  product,
  selected,
  displayProfile,
  displayMenu,
  displaySelect,
  displayBookmark,
  onToggleSelect,
  onViewDetail,
  onMarkPurchased,
  onProductDelete,
  onProductMove,
  onEditProductNote,
  onShareClick,
  size,
}) => {
  const price = product?.price?.toLocaleString('en-US', {
    style: 'currency',
    currency: product?.priceCurrency ?? 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  const [showMoveProductModal, setShowMoveProductModal] =
    useState<boolean>(false);
  const [showEditNoteModal, setShowEditNoteModal] = useState<boolean>(false);

  return (
    <>
      <div className="rounded-lg outline-1 outline-offset-0 outline-gray-200 shadow-md relative">
        {displayProfile && <ProductCardProfile product={product} />}
        {(displayProfile || displayBookmark) && (
          <ProductCardBookmark product={product} />
        )}
        <div className="relative">
          {displayMenu && (
            <div className="absolute left-2 top-2.5">
              <ProductMenu
                isPurchased={!!product.isPurchased}
                onProductDelete={() => onProductDelete(product.id as string)}
                onOpenMoveFolderModal={() => setShowMoveProductModal(true)}
                onOpenEditNoteModal={() => setShowEditNoteModal(true)}
                onMarkPurchased={() =>
                  onMarkPurchased(product.id as string, !product.isPurchased)
                }
                onShareClick={() => onShareClick(product.productUrl)}
                align="left"
              />
            </div>
          )}
          {displaySelect && (
            <span
              className={cn(
                'checkbox',
                selected && 'before:block !border-main-300',
              )}
              onClick={onToggleSelect}
            />
          )}
          <img
            className={cn(
              'h-36 md:h-80 rounded-lg rounded-b-none object-cover cursor-pointer border-y border-gray-200',
              displayProfile && 'rounded-t-none',
              size === 'small' && '!h-36',
            )}
            src={product?.imageUrl}
            alt="product"
            onClick={onViewDetail}
          />
          <div className="absolute right-3 bottom-3">
            {product?.parent ? <FolderBadge folderId={product.parent} /> : null}
          </div>
        </div>

        <div className={cn('p-2 md:p-4', size === 'small' && '!p-2')}>
          <div className="flex items-center justify-between">
            <span
              className={cn(
                'text-xs md:text-sm text-gray-400 uppercase',
                size === 'small' && '!text-xs',
              )}>
              {product?.brand}
            </span>
            <span
              className={cn(
                'text-xs md:text-sm text-gray-400',
                size === 'small' && '!text-xs',
              )}>
              {dayjs(product?.createdAt?.toMillis()).fromNow()}
            </span>
          </div>
          <p
            className={cn(
              'text-sm md:text-xl mt-2 md:mt-4 text-gray-600 line-clamp-2 cursor-pointer',
              size === 'small' && '!text-sm !mt-2',
            )}
            onClick={onViewDetail}>
            {product?.title}
          </p>
          <p
            className={cn(
              'text-sm md:text-xl mt-2 md:mt-4 text-gray-600 font-semibold',
              size === 'small' && '!text-sm !mt-2',
            )}>
            {price}
          </p>
        </div>
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

export default ProductCard;
