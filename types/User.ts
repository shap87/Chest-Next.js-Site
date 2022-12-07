import Entity from './Entity';

interface User extends Entity {
  id?: string;
  // sign up fields

  // email?: string; //Let's move this to a document in a private subCollection
  // phoneNumber?: string; //Let's move this to a document in a private subCollection
  //https://firebase.google.com/docs/firestore/security/rules-fields#allowing_read_access_only_for_specific_fields
  username: string;
  name?: string;

  // can be added by user
  description?: string;
  profilePictureUrl?: string;
  instagramHandle?: string;
  tiktokHandle?: string;

  // content lists
  //   folderIds?: [string];
  //   notificationIds?: [string];
  //   brandIds?: [string];
  //   likedProductIds?: [string]; // hashmap so can instantly look up if a user has liked a product for rendering in UI

  // Considering large number of notifications for user and how that is handled for sorting chronologically
  // Current loading notifications on website was a bit slow since it searched the whole notifications collection
  // ^Pagination should be enough with the new method + delete notifications if needed

  // social lists
  //   followerIds?: [string];
  //   followingIds?: [string];

  // other attributes
  onboardingCompleted?: boolean;
  numProducts?: number;
  numUnseenNotifications?: number; // instead of having to filter for !seen and calculate client side
  numViews?: number;
  tz?: string;
  notificationsToken?: string;
}

export default User;
