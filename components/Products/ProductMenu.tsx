import React, {Fragment} from 'react';
import {Menu, Transition} from '@headlessui/react';
//components
import DeleteIcon from '../icons/DeleteIcon';
import CreditCardCheckIcon from '../icons/CreditCardCheckIcon';

interface Props {
  productId: string;
}

const ProductMenu: React.FC<Props> = () => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button>
        <img className="w-5 h-5" src={'/dots.svg'} alt="" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="list absolute right-0 z-10 origin-top-right rounded-md bg-white shadow-lg focus:outline-none">
          <div className="py-1 divide-y">
            <Menu.Item
              as="li"
              className="text-green-500 stroke-green-500 hover:stroke-main-500">
              Mark Purchased
              <CreditCardCheckIcon className="" />
            </Menu.Item>
            <Menu.Item as="li">
              Make Private
              <img src={'./lock-black.svg'} alt="" />
            </Menu.Item>
            <Menu.Item as="li">
              Edit Note
              <img src={'./edit-with-border.svg'} alt="" />
            </Menu.Item>
            <Menu.Item as="li">
              Move
              <img src={'./switch.svg'} alt="" />
            </Menu.Item>
            <Menu.Item as="li">
              Share
              <img src={'./share.svg'} alt="" />
            </Menu.Item>
            <Menu.Item
              as="li"
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
