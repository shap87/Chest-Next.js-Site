import {Product} from '../../types/Product';

import React, {Fragment, useState} from 'react';
import {Menu, Transition} from '@headlessui/react';
import cn from 'classnames';
//components
import DeleteIcon from '../icons/DeleteIcon';
import CreditCardCheckIcon from '../icons/CreditCardCheckIcon';

interface Props {
  isPurchased: boolean;
  onMarkPurchased: () => void;
  onProductDelete: () => void;
  onOpenMoveFolderModal: () => void;
  onOpenEditNoteModal: () => void;
  onShareClick: () => void;
  align?: 'left' | 'right';
}

const ProductMenu: React.FC<Props> = ({
  align,
  isPurchased,
  onMarkPurchased,
  onProductDelete,
  onOpenMoveFolderModal,
  onOpenEditNoteModal,
  onShareClick,
}) => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button>
        <img
          className="w-5 h-5 rotate-90 bg-gray-50 outline-offset-0 outline-gray-100 rounded-full p-[2px]"
          src="/dots.svg"
          alt=""
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items
          className={cn(
            'list absolute z-10 right-0 origin-top-right rounded-md bg-white shadow-lg focus:outline-none',
            align === 'left' && 'left-0 origin-top-left',
          )}>
          <div className="py-1 divide-y">
            <Menu.Item
              as="li"
              onClick={onMarkPurchased}
              className="text-green-500 stroke-green-500 hover:stroke-main-500">
              {isPurchased ? 'Unmark Purchased' : 'Mark Purchased'}
              <CreditCardCheckIcon className="" />
            </Menu.Item>
            <Menu.Item as="li" onClick={onOpenEditNoteModal}>
              Edit Note
              <img src="/edit-with-border.svg" alt="" />
            </Menu.Item>
            <Menu.Item as="li" onClick={onOpenMoveFolderModal}>
              Move
              <img src="/switch.svg" alt="" />
            </Menu.Item>
            <Menu.Item as="li" onClick={onShareClick}>
              Share
              <img src="/share.svg" alt="" />
            </Menu.Item>
            <Menu.Item
              as="li"
              onClick={onProductDelete}
              className="text-red-500 stroke-red-500 hover:stroke-main-500">
              Delete
              <DeleteIcon className="" />
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProductMenu;
