import {FC} from 'react';

// libs
import cn from 'classnames';

// components
import {Button, H6} from '../../../common';

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
        'mb-10 py-2.5 px-5 bg-white border border-[#F9FAFB] rounded-lg flex justify-between items-center',
      )}>
      <H6 classname="!mb-0">{countSelected} folders selected</H6>
      <p
        onClick={selectAll}
        className="ml-5 text-sm text-main-500 cursor-pointer transition-all hover:opacity-70 select-none">
        Select All
      </p>
      <Button classname="ml-auto mr-5 group" icon="icon-left">
        <svg
          width="15"
          height="14"
          viewBox="0 0 15 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            className="group-hover:stroke-white"
            d="M7.50033 1.16663V12.8333M1.66699 6.99996H13.3337"
            stroke="#344054"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Add to folder
      </Button>
      <Button classname="group" icon="icon-left" color="red">
        <svg
          width="17"
          height="20"
          viewBox="0 0 17 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            className="group-hover:stroke-white"
            d="M11.8333 4.99984V4.33317C11.8333 3.39975 11.8333 2.93304 11.6517 2.57652C11.4919 2.26292 11.2369 2.00795 10.9233 1.84816C10.5668 1.6665 10.1001 1.6665 9.16667 1.6665H7.83333C6.89991 1.6665 6.4332 1.6665 6.07668 1.84816C5.76308 2.00795 5.50811 2.26292 5.34832 2.57652C5.16667 2.93304 5.16667 3.39975 5.16667 4.33317V4.99984M6.83333 9.58317V13.7498M10.1667 9.58317V13.7498M1 4.99984H16M14.3333 4.99984V14.3332C14.3333 15.7333 14.3333 16.4334 14.0608 16.9681C13.8212 17.4386 13.4387 17.821 12.9683 18.0607C12.4335 18.3332 11.7335 18.3332 10.3333 18.3332H6.66667C5.26654 18.3332 4.56647 18.3332 4.03169 18.0607C3.56129 17.821 3.17883 17.4386 2.93915 16.9681C2.66667 16.4334 2.66667 15.7333 2.66667 14.3332V4.99984"
            stroke="#B42318"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Delete
      </Button>
      <img
        onClick={removeSelected}
        className="w-3 ml-5 cursor-pointer hover:opacity-70 transition-all"
        src={'./close.svg'}
        alt=""
      />
    </div>
  );
};
