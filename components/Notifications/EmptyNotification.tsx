import Image from 'next/image';
import {Paragraph} from '../common';

const EmptyNotification = () => {
  return (
    <div className="py-12 px-4 flex flex-col justify-center items-center text-center gap-8">
      <Image
        src="/base-illustration.svg"
        alt="alert icon"
        className="items-center"
        width={200}
        height={180}
      />
      <Paragraph>
        Once you’ve started adding items to your wishlists we’ll track any
        discounts on your items and let you know here.
      </Paragraph>
    </div>
  );
};

export default EmptyNotification;
