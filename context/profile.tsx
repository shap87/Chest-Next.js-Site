import { createContext, PropsWithChildren, useContext } from "react";
import type { Folder } from "@chestrapp/firebase";
import {
  collection,
  doc,
  DocumentReference,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

export interface Profile {
  id: string;
  username?: string;
  displayName?: string;
}

interface Context extends Profile {
  addFolder(folder: Partial<Folder>): Promise<void>;
}

export const ProfileContext = createContext<Context>(null!);
export const useProfile = () => useContext(ProfileContext);

export function ProfileContextProvider({
  profile,
  ...props
}: PropsWithChildren<{ profile: Profile }>) {
  const addFolder = async (folder: Folder) =>
    setDoc<Folder>(
      doc(collection(getFirestore(), "folders")) as DocumentReference<Folder>,
      {
        ...folder,
        userId: profile.id,
        createdAt: serverTimestamp(),
      }
    );
  return (
    <ProfileContext.Provider
      value={{
        ...profile,
        addFolder,
      }}
      {...props}
    />
  );
}
