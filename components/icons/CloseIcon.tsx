import React from 'react';
import classNames from 'classnames';

const CloseIcon: React.FC<{
  className?: string;
}> = ({className}) => (
  <svg
    className={classNames('stroke-main-700 h-3 w-3', className)}
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13 1L1 13M1 1L13 13"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CloseIcon;
