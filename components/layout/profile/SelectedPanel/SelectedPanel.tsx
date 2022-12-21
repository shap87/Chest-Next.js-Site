import React from 'react';
import cn from 'classnames';
// components
import {Button, H6} from '../../../common';
import DeleteIcon from '../../../icons/DeleteIcon';
import PlusIcon from '../../../icons/PlusIcon';
// assets
import styles from '../../../../styles/profile.module.scss';
import CreditCardCheckIcon from '../../../icons/CreditCardCheckIcon';

interface SelectedPanelProps {
  type: 'folder' | 'product';
  total: number;
  totalSelected: number;
  onClose?: () => void;
  onSelectAll?: () => void;
  onAddToFolder?: () => void;
  onDelete?: () => void;
  onMarkPurchased?: () => void;
}

export const SelectedPanel: React.FC<SelectedPanelProps> = ({
  total,
  totalSelected,
  type,
  onClose,
  onSelectAll,
  onAddToFolder,
  onDelete,
  onMarkPurchased,
}) => {
  return (
    <div
      className={cn(
        styles.selected,
        'mb-10 py-2.5 px-5 bg-white border border-gray-50 rounded-lg flex justify-between flex-col md:flex-row gap-8 relative',
      )}>
      <div className="flex items-center">
        <H6 classname="!mb-0">
          {totalSelected} {type === 'folder' ? 'Folders' : 'Items'} selected
        </H6>
        <p
          onClick={onSelectAll}
          className={cn(
            'ml-5 text-sm text-gray-400 cursor-pointer transition-all select-none',
            totalSelected < total && 'text-main-500 hover:opacity-70',
          )}>
          {totalSelected < total ? 'Select All' : 'Selected All'}
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:mr-8">
        {type === 'product' && (
          <Button
            classname="group"
            icon="icon-left"
            color="green"
            onClick={onMarkPurchased}>
            <CreditCardCheckIcon className="stroke-green-600 group-hover:stroke-white" />
            Mark Purchased
          </Button>
        )}
        <div className="flex justify-between md:justify-end gap-4">
          <Button
            classname="group w-[48%] md:w-auto"
            icon="icon-left"
            onClick={onAddToFolder}>
            <PlusIcon className="stroke-second group-hover:stroke-white" />
            Move to folder
          </Button>
          <Button
            classname="group w-[48%] md:w-auto"
            icon="icon-left"
            color="red"
            onClick={onDelete}>
            <DeleteIcon className="stroke-red-500 group-hover:stroke-white" />
            Delete
          </Button>
        </div>
      </div>
      <img
        onClick={onClose}
        className="absolute right-4 top-4 md:top-7 w-3 ml-5 cursor-pointer hover:opacity-70 transition-all"
        src="/close.svg"
        alt="close"
      />
    </div>
  );
};
