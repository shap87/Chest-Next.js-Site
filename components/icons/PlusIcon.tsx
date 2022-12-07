import React from 'react';

const PlusIcon: React.FC<{
  className: string;
}> = ({className}) => (
  <svg
    className={className}
    width="15"
    height="14"
    viewBox="0 0 15 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.99984 1.16663V12.8333M1.1665 6.99996H12.8332"
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default PlusIcon;
