import type {Product} from '../../../../types/Product';

import {useEffect, useMemo, useState} from 'react';
import {useFirestoreInfiniteQuery} from '@react-query-firebase/firestore';
import {
  query,
  collection,
  where,
  limit,
  startAfter,
  getFirestore,
  updateDoc,
  doc,
  Timestamp,
  deleteDoc,
  getDocs,
} from 'firebase/firestore';
import InfiniteScroll from 'react-infinite-scroller';
// hooks
import {useRouter} from 'next/router';
import {useAppSelector} from '../../../../hooks/redux';
import {useFirebase, useFirestore} from '../../../../context/firebase';
// components
import {Alert, Button, H6} from '../../../common';
import Modal from '../../../common/Modal';
import ProductDetails from '../../../Products/ProductDetails';
import ProductCard from '../../../Products/ProductCard';
import {SelectedPanel} from '../SelectedPanel/SelectedPanel';
import {MoveProductModal} from '../../../dialogs';

export const Products = () => {
  const app = useFirebase();
  const {user} = useAppSelector(state => state.user);
  const {folders, selectedFolders, selectedSubfolders} = useAppSelector(
    state => state.folders,
  );
  const router = useRouter();
  const isPublic = !!router.query.userId;

  const firestore = useFirestore();

  const queryParams = useMemo(() => {
    let ids = [''];

    const subfolderIds = Object.keys(selectedSubfolders);

    if (subfolderIds.length > 0) {
      return subfolderIds;
    }

    const folderIds = Object.keys(selectedFolders);

    if (folderIds.length > 0) {
      ids = folderIds;
      folderIds.forEach(folderId => {
        if (selectedFolders[folderId].children) {
          const childrenIds = selectedFolders[folderId].children.map(
            sub => sub.id,
          );
          ids = [...ids, ...childrenIds];
        }
      });
      return ids;
    }

    folders.forEach(folder => {
      ids.push(folder.id);
      folder.children.forEach(sub => ids.push(sub.id));
    });

    return ids;
  }, [selectedFolders, selectedSubfolders, folders]);

  const ref = query(
    collection(firestore, 'products'),
    where('userId', '==', isPublic ? router.query.userId : user.uid ?? ''),
    where('parent', 'in', queryParams.slice(0, 10)), //slice is a temp solution
    limit(9),
  );

  const productsQuery = useFirestoreInfiniteQuery(
    ['products', {userId: user?.uid, parent: queryParams}],
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

  const [notification, setNotification] = useState<{
    message: string;
    icon: string;
  } | null>(null);

  const [showMoveSelectedProductsModal, setShowMoveSelectedProductsModal] =
    useState<boolean>(false);

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

  const updateFolderItemsNum = async () => {
    //get all user products to update items count
    const q = query(
      collection(firestore, 'products'),
      where('userId', '==', isPublic ? router.query.userId : user.uid ?? ''),
    );

    const querySnapshot = await getDocs(q);

    const allProducts = [] as Product[];

    querySnapshot.forEach(doc => {
      allProducts.push(doc.data() as Product);
    });

    folders.forEach(f => {
      let parentFolderProductsCount = 0;
      allProducts?.forEach(p => {
        if (p.parent === f.id) {
          parentFolderProductsCount++;
        }
      });
      f.children.forEach(sub => {
        let childFolderProductsCount = 0;
        allProducts?.forEach(p => {
          if (p.parent === sub.id) {
            parentFolderProductsCount++;
            childFolderProductsCount++;
          }
        });

        if (childFolderProductsCount !== sub.numItems) {
          updateDoc(doc(firestore, 'folders', sub.id), {
            numItems: childFolderProductsCount,
            updatedAt: Timestamp.fromDate(new Date()),
          });
        }
      });

      if (parentFolderProductsCount !== f.numItems) {
        updateDoc(doc(firestore, 'folders', f.id), {
          numItems: parentFolderProductsCount,
          updatedAt: Timestamp.fromDate(new Date()),
        });
      }
    });
  };

  const onProductUpdate = async (
    productId: string,
    fieldsToUpdate: Partial<Omit<Product, 'id'>>,
  ) => {
    const db = getFirestore(app);
    await updateDoc(doc(db, 'products', productId), {
      ...fieldsToUpdate,
      updatedAt: Timestamp.fromDate(new Date()),
    });
    if (selectedProducts[productId]) {
      setSelectedProducts({
        ...selectedProducts,
        [productId as string]: {
          ...selectedProducts[productId],
          ...fieldsToUpdate,
        },
      });
    }
    await productsQuery.refetch();
  };

  const onProductDelete = async (productId: string) => {
    const db = getFirestore(app);
    await deleteDoc(doc(db, 'products', productId));

    if (selectedProducts[productId]) {
      const {[productId as string]: omitted, ...rest} = selectedProducts;
      setSelectedProducts(rest);
    }

    productsQuery.refetch();
    setProduct(null);
  };

  const onDeleteSelectedProducts = async () => {
    const ids = Object.keys(selectedProducts);
    const db = getFirestore(app);

    const requests = [] as Promise<void>[];
    ids.forEach(id => {
      requests.push(deleteDoc(doc(db, 'products', id)));
    });

    await Promise.all(requests);
    productsQuery.refetch();
    setSelectedProducts({});
  };

  const onProductMove = async (productId: string, folderId: string) => {
    await onProductUpdate(productId, {parent: folderId});
    updateFolderItemsNum();
    if (product) {
      setProduct({...product, parent: folderId});
    }
  };

  const onSelectedProductsMove = async (folderId: string) => {
    const ids = Object.keys(selectedProducts);
    const db = getFirestore(app);

    const requests = [] as Promise<void>[];
    const updatedSelected = {} as {[key: string]: Product};

    ids.forEach(id => {
      requests.push(
        updateDoc(doc(db, 'products', id), {
          parent: folderId,
          updatedAt: Timestamp.fromDate(new Date()),
        }),
      );

      updatedSelected[id] = {...selectedProducts[id], parent: folderId};
    });

    await Promise.all(requests);
    setSelectedProducts(updatedSelected);
    productsQuery.refetch();
  };

  const onMarkPurchased = (productId: string, isPurchased: boolean) => {
    onProductUpdate(productId, {isPurchased});
    if (product) {
      setProduct({...product, isPurchased});
    }
    setNotification({
      icon: './check-pink.svg',
      message: isPurchased
        ? 'Product marked as purchased'
        : 'Product unmarked as purchased',
    });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const onMarkPurchasedSelected = async () => {
    const ids = Object.keys(selectedProducts);
    const db = getFirestore(app);

    const requests = [] as Promise<void>[];
    const updatedSelected = {} as {[key: string]: Product};

    ids.forEach(id => {
      requests.push(
        updateDoc(doc(db, 'products', id), {
          isPurchased: true,
          updatedAt: Timestamp.fromDate(new Date()),
        }),
      );
      updatedSelected[id] = {...selectedProducts[id], isPurchased: true};
    });

    await Promise.all(requests);
    setSelectedProducts(updatedSelected);
    productsQuery.refetch();

    setNotification({
      icon: './check-pink.svg',
      message: 'Products marked as purchased',
    });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const onEditProductNote = (productId: string, note: string) => {
    onProductUpdate(productId, {note});
    if (product) {
      setProduct({...product, note});
    }
  };

  const onShareClick = async (link: string) => {
    await navigator.clipboard.writeText(link);
    setNotification({
      icon: './share-link.svg',
      message: 'Product link copied',
    });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <>
      {notification && (
        <div className="w-full fixed top-40 z-50">
          <Alert
            showSavedMessage={notification.message}
            iconWidth="w-8"
            icon={notification.icon}
          />
        </div>
      )}
      <section className="py-4 md:py-8">
        <Modal
          show={!!product}
          onClose={() => setProduct(null)}
          className="!max-w-[1000px] md:!max-h-[720px]">
          {!!product && (
            <ProductDetails
              product={product}
              onMarkPurchased={onMarkPurchased}
              onProductDelete={onProductDelete}
              onProductMove={onProductMove}
              onEditProductNote={onEditProductNote}
              onShareClick={onShareClick}
              onClose={() => setProduct(null)}
            />
          )}
        </Modal>
        <div className="container">
          {Object.keys(selectedProducts).length > 0 ? (
            <SelectedPanel
              type="product"
              total={products?.length ?? 0}
              totalSelected={Object.keys(selectedProducts).length}
              onMarkPurchased={onMarkPurchasedSelected}
              onDelete={onDeleteSelectedProducts}
              onAddToFolder={() => setShowMoveSelectedProductsModal(true)}
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
              <input
                className="pl-10"
                type="search"
                placeholder="Search (⌘+K)"
              />
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
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 my-4 md:my-6">
            {products?.map(product => (
              <ProductCard
                key={product.id}
                displayMenu={!isPublic}
                displaySelect={!isPublic}
                displayBookmark={isPublic}
                selected={Object.prototype.hasOwnProperty.call(
                  selectedProducts,
                  product.id,
                )}
                onMarkPurchased={onMarkPurchased}
                onProductDelete={onProductDelete}
                onProductMove={onProductMove}
                onEditProductNote={onEditProductNote}
                onShareClick={onShareClick}
                onToggleSelect={() => onToggleSelect(product as Product)}
                product={product as Product}
                onViewDetail={() => setProduct(product as Product)}
              />
            )) ?? <p key="no-products">No products found</p>}
          </InfiniteScroll>
        </div>
      </section>
      {showMoveSelectedProductsModal && (
        <MoveProductModal
          show={showMoveSelectedProductsModal}
          onClose={() => setShowMoveSelectedProductsModal(false)}
          onSubmit={onSelectedProductsMove}
        />
      )}
    </>
  );
};
