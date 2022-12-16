import type {Product} from '../types/Product';

import {useState} from 'react';
import {getAuth} from 'firebase/auth';
import {useFirestoreInfiniteQuery} from '@react-query-firebase/firestore';
import {query, collection, where, limit, startAfter} from 'firebase/firestore';
import InfiniteScroll from 'react-infinite-scroller';
// hooks
import {useFirebase, useFirestore} from '../context/firebase';
// components
import Modal from '../components/common/Modal';
import ProductDetails from '../components/Products/ProductDetails';
import ProductCard from '../components/Products/ProductCard';
import {Layout} from '../components/common';
import Followers from '../components/layout/community/Followers';

export default function Community() {
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
    <Layout title="Community | Chestr" description="Community | Chestr">
      <section className="py-4 md:py-8">
        <Modal
          show={!!product}
          onClose={() => setProduct(null)}
          className="!max-w-[1000px] md:!max-h-[720px]">
          {!!product && (
            <ProductDetails
              product={product}
              onClose={() => setProduct(null)}
            />
          )}
        </Modal>
        <div className="container max-w-[1000px] flex flex-col-reverse gap-8 md:flex-row md:divide-x !px-0">
          <div className="w-full md:w-2/3 px-4">
            <InfiniteScroll
              loadMore={() => productsQuery.fetchNextPage()}
              hasMore={productsQuery.hasNextPage}
              loader={<p key="loading">Loading...</p>}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 my-4 md:my-6">
              {products?.map(product => (
                <ProductCard
                  key={product.id}
                  displayProfile
                  size="small"
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
          <div className="w-full md:w-1/3 md:pl-8">
            <Followers />
          </div>
        </div>
      </section>
    </Layout>
  );
}
