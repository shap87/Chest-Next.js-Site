import Entity from './Entity';
export enum Visibility {
  Public,
  Private, // do we need shared?
}

export enum FolderSortingOptions {
  LAST_ADDED,
  A_TO_Z,
}

export default interface Folder extends Entity {
  // info
  name: string;
  userId: string;

  visibility: Visibility;
  numViews: number;
  numItems: number;
  // description?: string
  imageUrl?: string;

  parent: string;

  // content
  // childFolderIds?: [string] // UUID to a list folders --> query and filter for parentFolderId

  // --> query and filter for parentFolderId for below lists
  // productIds?: [string]
  // mediaIds?: [string] // when should we use list of Ids vs objects themselves?
  // brandIds?: [string]

  // social
  // comments?: [Comment] // see above - subcollection
  // likes?: [Like] // see above - subcollection

  // move to meta object
  // numComments?: number // for aggregation purposes
  // numLikes?: number // for aggregation purposes

  // How do we make shared folders similar to Google Docs
  // editors?: [string] // ['oudmane UUID', 'besart UUID']
  // suggesters?: [string] // ['isaac UUID', 'islam UUID', 'alfonzo UUID']
  // viewers?: [string] // ['bob UUID', 'alice UUID']
}
