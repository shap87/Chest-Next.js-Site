import React from 'react';

const DotsHorizontalIcon: React.FC<{
  className: string;
}> = ({className}) => (
  <svg
    className={className}
    width="18"
    height="4"
    viewBox="0 0 18 4"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 2C8 2.55228 8.44772 3 9 3C9.55228 3 10 2.55228 10 2C10 1.44771 9.55228 1 9 1C8.44772 1 8 1.44771 8 2Z"
      stroke="#667085"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 2C15 2.55228 15.4477 3 16 3C16.5523 3 17 2.55228 17 2C17 1.44772 16.5523 1 16 1C15.4477 1 15 1.44772 15 2Z"
      stroke="#667085"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1 2C1 2.55228 1.44772 3 2 3C2.55228 3 3 2.55228 3 2C3 1.44771 2.55228 0.999999 2 0.999999C1.44772 0.999999 1 1.44771 1 2Z"
      stroke="#667085"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default DotsHorizontalIcon;
