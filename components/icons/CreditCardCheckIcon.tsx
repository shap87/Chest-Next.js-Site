import React from 'react';

const CreditCardCheckIcon: React.FC<{
  className: string;
}> = ({className}) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13.3332 15L14.9998 16.6667L18.3332 13.3333M18.3332 8.33333H1.6665M18.3332 10V6.83333C18.3332 5.89991 18.3332 5.4332 18.1515 5.07668C17.9917 4.76308 17.7368 4.50811 17.4232 4.34832C17.0666 4.16666 16.5999 4.16666 15.6665 4.16666H4.33317C3.39975 4.16666 2.93304 4.16666 2.57652 4.34832C2.26292 4.50811 2.00795 4.76308 1.84816 5.07668C1.6665 5.4332 1.6665 5.89991 1.6665 6.83333V13.1667C1.6665 14.1001 1.6665 14.5668 1.84816 14.9233C2.00795 15.2369 2.26292 15.4919 2.57652 15.6517C2.93304 15.8333 3.39975 15.8333 4.33317 15.8333H9.99984"
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CreditCardCheckIcon;
