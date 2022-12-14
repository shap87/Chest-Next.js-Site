import Entity from './Entity';

export enum ProductSortingOptions {
  LAST_ADDED,
  A_TO_Z,
  PRICE_LOW_TO_HIGH,
  PRICE_HIGH_TO_LOW,
}

export interface Product extends Entity {
  userId: string;
  numViews: number;
  numLikes: number;
  numComments: number;
  productUrl: string;

  parent: string;
  // parsed attributes
  parsedType: string;
  title?: string;
  price: number;
  priceCurrency?: string;
  description?: string;
  imageUrl?: string;
  brand?: string;

  // can be added by user
  isPurchased: boolean;
  //   folderId?: string;
  note?: string;

  // social
  //   productCommentsId?: string; // A UUID in a productComments collection which maps to a document containing an array of [Comment]
  //   productLikesId?: string; // A UUID in a productLikes collections which maps to a document containing an array of [Like]

  // price        // !!! should we use a single id to the array of objects, a list of Ids, or a list of the objects themselves?
  //   priceHistory?: [PricePoint]; // we can use the end element of the array to get the prev price

  // tracking
  //   orderId?: string;
}
