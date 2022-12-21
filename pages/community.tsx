import type {Product} from '../types/Product';

import {useEffect, useState} from 'react';
import {useFirestoreQueryData} from '@react-query-firebase/firestore';
import {query, collection} from 'firebase/firestore';
import InfiniteScroll from 'react-infinite-scroller';
// hooks
import {useFirebase, useFirestore} from '../context/firebase';
import {useAppSelector} from '../hooks/redux';
// service
import firebaseService from '../services/firebase.service';
// components
import Modal from '../components/common/Modal';
import ProductDetails from '../components/Products/ProductDetails';
import ProductCard from '../components/Products/ProductCard';
import {Layout} from '../components/common';
import Followers from '../components/layout/community/Followers';

const interval = 12;
export const savedAsLinkPicture =
  'https://firebasestorage.googleapis.com/v0/b/chestr-app.appspot.com/o/constants%2Fsaved-as-link.png?alt=media&token=a95d66a9-4f9e-45d7-ad9f-7a4ec6bc5e20';

export default function Community() {
  const app = useFirebase();
  const {user} = useAppSelector(state => state.user);
  const firestore = useFirestore();

  // const userId = 'DOmeCKtcU9d7lD9xvrJysJ9IFaD3';
  const userId = user.uid;
  const followingRef = query(
    collection(firestore, `users/${userId}/following`),
  );
  const following = useFirestoreQueryData(
    `users/${userId}/following`,
    userId ? followingRef : undefined,
  );
  const followingIds = following.data?.map(f => f.uid!) ?? [];

  const [products, setProducts] = useState<Product[]>([]);
  const [notFoundResults, setNotFoundResults] = useState(0);
  const [hoursAgo, setHoursAgo] = useState(interval);

  const fetchPosts = async () => {
    const fetchedPosts = await firebaseService.getHomeFeed(
      app,
      followingIds,
      hoursAgo,
      interval,
    );
    if (fetchedPosts.length === 0 && notFoundResults < 20) {
      setNotFoundResults(pre => pre + 1);
      setHoursAgo(pre => pre + interval);
      return;
    }
    setNotFoundResults(0);
    // filter out products that are saved as links
    const updatedProducts = [
      ...products,
      ...fetchedPosts.filter(
        (product: Product) => product.imageUrl !== savedAsLinkPicture,
      ),
    ];
    setProducts(updatedProducts);
  };

  useEffect(() => {
    if (followingIds.length > 0) {
      fetchPosts();
    }
  }, [followingIds.length, hoursAgo]);

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

  const onProductDelete = async (productId: string) => {};

  const onProductMove = (productId: string, folderId: string) => {};

  const onMarkPurchased = (productId: string, isPurchased: boolean) => {};

  const onEditProductNote = (productId: string, note: string) => {};

  const onShareClick = async (link: string) => {
    await navigator.clipboard.writeText(link);
  };

  return (
    <Layout title="Community | Chestr" description="Community | Chestr">
      <section className="py-4 md:py-8">
        <Modal
          show={!!product}
          onClose={() => setProduct(null)}
          className="!max-w-[1000px] md:!max-h-[720px]">
          {!!product && (
            <ProductDetails
              onEditProductNote={onEditProductNote}
              onMarkPurchased={onMarkPurchased}
              onProductDelete={onProductDelete}
              onProductMove={onProductMove}
              onShareClick={onShareClick}
              product={product}
              onClose={() => setProduct(null)}
            />
          )}
        </Modal>
        <div className="container max-w-[1000px] flex flex-col-reverse gap-8 md:flex-row md:divide-x !px-0">
          <div className="w-full md:w-2/3 px-4">
            <InfiniteScroll
              loadMore={() => setHoursAgo(pre => pre + interval)}
              // hasMore={productsQuery.hasNextPage}
              loader={<p key="loading">Loading...</p>}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 my-4 md:my-6">
              {products?.map(product => (
                <ProductCard
                  key={product.id}
                  displayProfile
                  size="small"
                  selected={Object.prototype.hasOwnProperty.call(
                    selectedProducts,
                    product.id!,
                  )}
                  onToggleSelect={() => onToggleSelect(product as Product)}
                  onEditProductNote={onEditProductNote}
                  onMarkPurchased={onMarkPurchased}
                  onProductDelete={onProductDelete}
                  onProductMove={onProductMove}
                  onShareClick={onShareClick}
                  product={product as Product}
                  onViewDetail={() => setProduct(product as Product)}
                />
              ))}
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
