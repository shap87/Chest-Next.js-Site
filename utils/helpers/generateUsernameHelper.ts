import { FirebaseApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

const createDefaultUsername = (name: string) => {
  return name.replaceAll(" ", "").toLowerCase();
};

const createUniqueUsername = async (
  defaultUsername: string,
  firebaseApp: FirebaseApp
) => {
  let isDuplicateUsername = true;
  let generatedUsername: string = "";

  while (isDuplicateUsername) {
    generatedUsername = defaultUsername + Math.floor(Math.random() * 1000 + 1);
    isDuplicateUsername = await checkUsernameExists(
      generatedUsername,
      firebaseApp
    );
  }

  return generatedUsername;
};

export const generateUsernameHelper = async (
  name: string,
  firebaseApp: FirebaseApp
) => {
  let defaultUsername: string = createDefaultUsername(name);
  let usernameAlreadyFound = await checkUsernameExists(
    defaultUsername,
    firebaseApp
  );
  return !usernameAlreadyFound
    ? defaultUsername
    : createUniqueUsername(defaultUsername, firebaseApp);
};

const checkUsernameExists = async (name: string, app: FirebaseApp) => {
  const db = getFirestore(app);

  const q = query(collection(db, "users"), where("username", "==", name));

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.length > 0;
};
