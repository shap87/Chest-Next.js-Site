// components
import {useState} from 'react';
import {Button, H6} from '../../../common';
import Modal from '../../../common/Modal';
import ProductDetails from '../../../ProductDetails';

export const Products = () => {
  const [open, setOpen] = useState(false);
  return (
    <section className="py-4 md:py-8">
      <Modal
        show={open}
        onClose={() => setOpen(false)}
        className="!max-w-[1000px] md:!max-h-[720px]">
        <ProductDetails
          productId="ESqCkX0yPAOCd2Jk41ma"
          onClose={() => setOpen(false)}
        />
      </Modal>
      <div className="container">
        <H6>Products</H6>
        <div className="flex items-center">
          <label className="flex-1 relative">
            <img
              className="absolute z-10 w-4 left-4 top-1/2 -translate-y-1/2"
              src={'./search.svg'}
              alt=""
            />
            <input className="pl-10" type="search" placeholder="Search (⌘+K)" />
          </label>
          <Button
            classname="ml-4 md:ml-10 !p-3 !border-[#D0D5DD] group"
            onClick={() => setOpen(true)}>
            <img
              className="w-4 !mr-0 group-hover:invert"
              src={'./filter.svg'}
              alt=""
            />
          </Button>
        </div>
      </div>
    </section>
  );
};
