import React from 'react';
import classNames from 'classnames';

const PlusIcon: React.FC<{
  className?: string;
}> = ({className}) => (
  <svg
    className={classNames('stroke-second group-hover:stroke-white', className)}
    width="15"
    height="14"
    viewBox="0 0 15 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.50033 1.16663V12.8333M1.66699 6.99996H13.3337"
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default PlusIcon;
