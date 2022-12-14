import type {Product} from '../../../../types/Product';

import {useState} from 'react';
import {getAuth} from 'firebase/auth';
import {useFirestoreInfiniteQuery} from '@react-query-firebase/firestore';
import {query, collection, where, limit, startAfter} from 'firebase/firestore';
import InfiniteScroll from 'react-infinite-scroller';
// hooks
import {useFirebase, useFirestore} from '../../../../context/firebase';
// components
import {Button, H6} from '../../../common';
import Modal from '../../../common/Modal';
import ProductDetails from '../../../Products/ProductDetails';
import ProductCard from '../../../Products/ProductCard';
import {SelectedPanel} from '../SelectedPanel/SelectedPanel';

export const Products = () => {
  const app = useFirebase();
  const user = getAuth(app).currentUser;
  const firestore = useFirestore();

  const ref = query(
    collection(firestore, 'products'),
    // TODO: to use the user.uid, temporarily use Isaac userId because has lot of products
    where('userId', '==', 'DOmeCKtcU9d7lD9xvrJysJ9IFaD3'),
    limit(9),
  );

  const productsQuery = useFirestoreInfiniteQuery(
    ['products', {userId: user?.uid}],
    ref,
    snapshot => {
      const lastDocument = snapshot.docs[snapshot.docs.length - 1];
      if (!lastDocument) return;
      return query(ref, startAfter(lastDocument));
    },
  );

  const [selectedProducts, setSelectedProducts] = useState<{
    [key: string]: Product;
  }>({});

  const [product, setProduct] = useState<Product | null>(null);

  const onToggleSelect = (product: Product) => {
    const selected = Object.prototype.hasOwnProperty.call(
      selectedProducts,
      product.id as string,
    );
    if (!selected) {
      setSelectedProducts({
        ...selectedProducts,
        [product.id as string]: product,
      });
    } else {
      // Remove product from selected
      const {[product.id as string]: omitted, ...rest} = selectedProducts;
      setSelectedProducts(rest);
    }
  };

  const products = productsQuery.data?.pages.flatMap(p =>
    p.docs.map(docSnapshot => docSnapshot.data()),
  );

  return (
    <section className="py-4 md:py-8">
      <Modal
        show={!!product}
        onClose={() => setProduct(null)}
        className="!max-w-[1000px] md:!max-h-[720px]">
        {!!product && (
          <ProductDetails product={product} onClose={() => setProduct(null)} />
        )}
      </Modal>
      <div className="container">
        {Object.keys(selectedProducts).length > 0 ? (
          <SelectedPanel
            type="product"
            total={products?.length ?? 0}
            totalSelected={Object.keys(selectedProducts).length}
          />
        ) : null}
        <H6>Products</H6>
        <div className="flex items-center">
          <label className="flex-1 relative">
            <img
              className="absolute z-10 w-4 left-4 top-1/2 -translate-y-1/2"
              src="/search.svg"
              alt="search"
            />
            <input className="pl-10" type="search" placeholder="Search (⌘+K)" />
          </label>
          <Button classname="ml-4 md:ml-10 !p-3 !border-[#D0D5DD] group">
            <img
              className="w-4 !mr-0 group-hover:invert"
              src="/filter.svg"
              alt="filter"
            />
          </Button>
        </div>
        <InfiniteScroll
          loadMore={() => productsQuery.fetchNextPage()}
          hasMore={productsQuery.hasNextPage}
          loader={<p key="loading">Loading...</p>}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 my-4 md:my-6">
          {products?.map(product => (
            <ProductCard
              key={product.id}
              selected={Object.prototype.hasOwnProperty.call(
                selectedProducts,
                product.id,
              )}
              onToggleSelect={() => onToggleSelect(product as Product)}
              product={product as Product}
              onViewDetail={() => setProduct(product as Product)}
            />
          )) ?? <p key="no-products">No products found</p>}
        </InfiniteScroll>
      </div>
    </section>
  );
};
