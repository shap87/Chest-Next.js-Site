import React from 'react';

const ArrowUpIcon: React.FC<{
  className: string;
}> = ({className}) => (
  <svg
    className={className}
    viewBox="0 0 12 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.15234 14.6666V1.33331M6.15234 1.33331L1.15234 6.33331M6.15234 1.33331L11.1523 6.33331"
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowUpIcon;
