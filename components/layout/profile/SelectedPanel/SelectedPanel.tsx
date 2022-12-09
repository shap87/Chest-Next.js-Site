import {FC} from 'react';
import cn from 'classnames';
// components
import {Button, H6} from '../../../common';
import DeleteIcon from '../../../icons/DeleteIcon';
import PlusIcon from '../../../icons/PlusIcon';
// assets
import styles from '../../../../styles/profile.module.scss';

interface SelectedPanelProps {
  countSelected: number;
  removeSelected: () => void;
  selectAll: () => void;
}

export const SelectedPanel: FC<SelectedPanelProps> = ({
  removeSelected,
  selectAll,
  countSelected,
}) => {
  return (
    <div
      className={cn(
        styles.selected,
        'mb-10 py-2.5 px-5 bg-white border border-[#F9FAFB] rounded-lg flex justify-between flex-col md:flex-row gap-8 relative',
      )}>
      <div className="flex md:items-center">
        <H6 classname="!mb-0">{countSelected} folders selected</H6>
        <p
          onClick={selectAll}
          className="ml-5 text-sm text-main-500 cursor-pointer transition-all hover:opacity-70 select-none">
          Select All
        </p>
      </div>
      <div className="flex justify-between md:justify-end gap-4 md:mr-8">
        <Button classname="group" icon="icon-left">
          <PlusIcon className="stroke-second group-hover:stroke-white" />
          Add to folder
        </Button>
        <Button classname="group" icon="icon-left" color="red">
          <DeleteIcon className="stroke-danger group-hover:stroke-white" />
          Delete
        </Button>
      </div>
      <img
        onClick={removeSelected}
        className="absolute right-4 top-4 md:top-7 w-3 ml-5 cursor-pointer hover:opacity-70 transition-all"
        src={'./close.svg'}
        alt=""
      />
    </div>
  );
};
