import React from 'react';
import classNames from 'classnames';

const CheckIcon: React.FC<{
  className?: string;
}> = ({className}) => (
  <svg
    className={classNames(
      'stroke-white group-hover:stroke-main-500',
      className,
    )}
    width="15"
    height="11"
    viewBox="0 0 15 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14.1663 1L4.99967 10.1667L0.833008 6"
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CheckIcon;
