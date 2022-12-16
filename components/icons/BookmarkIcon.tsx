import React from 'react';

const BookmarkIcon: React.FC<{
  className: string;
}> = ({className}) => (
  <svg
    className={className}
    viewBox="0 0 21 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_b_7392_42870)">
      <path d="M1 7.4C1 5.15979 1 4.03969 1.43597 3.18404C1.81947 2.43139 2.43139 1.81947 3.18404 1.43597C4.03969 1 5.15979 1 7.4 1H13.2667C15.5069 1 16.627 1 17.4826 1.43597C18.2353 1.81947 18.8472 2.43139 19.2307 3.18404C19.6667 4.03969 19.6667 5.15979 19.6667 7.4V25L10.3333 19.6667L1 25V7.4Z" />
      <path
        d="M1 7.4C1 5.15979 1 4.03969 1.43597 3.18404C1.81947 2.43139 2.43139 1.81947 3.18404 1.43597C4.03969 1 5.15979 1 7.4 1H13.2667C15.5069 1 16.627 1 17.4826 1.43597C18.2353 1.81947 18.8472 2.43139 19.2307 3.18404C19.6667 4.03969 19.6667 5.15979 19.6667 7.4V25L10.3333 19.6667L1 25V7.4Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <filter
        id="filter0_b_7392_42870"
        x="-3.5"
        y="-3.5"
        width="27.6665"
        height="33"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="1.875" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_7392_42870"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_7392_42870"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default BookmarkIcon;
