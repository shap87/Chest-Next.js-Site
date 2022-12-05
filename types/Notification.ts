import Entity from './Entity';

export enum NotificationType {
  Discount,
  Comment,
  Like,
  Follow,
  Tracking,
}

export interface DiscountNotificationInfo {
  price: number;
  prevPrice: number;
}

export interface TrackingNotificationInfo {
  shopName: string;
  shopLogoUrl?: string;
  trackingNumber: string;
  trackingNumberUrl?: string;
  deliveryDate?: string;

  // Future TODO: attributes to map products to a specific order
  // display images for items in notification -> use image urls
}

interface Notification extends Entity {
  id: string;
  type: NotificationType;
  recipientId: string;
  // recipientUsername: string;
  interactorId: string; // naming
  // interactorUsername: string; // naming
  seen: boolean;

  // optional attributes depending on notification type
  productId?: string;
  comment?: string;
  discountInfo?: DiscountNotificationInfo;
  trackingInfo?: TrackingNotificationInfo;
}

export default Notification;
