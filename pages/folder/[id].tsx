import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import firebaseAdmin from "../../firebase/node";
import {
  collection,
  CollectionReference,
  getFirestore,
  limit,
  orderBy,
  query,
  QueryConstraint,
  Timestamp,
  where,
} from "firebase/firestore";
import { AuthStateReady } from "../../context/firebase";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import type { Product } from "@chestrapp/firebase";

interface Data {
  profile?: any;
  folder: any;
}

function FolderComponent({ folder, profile }: any) {
  const queryConstraints: QueryConstraint[] = [
    where("folderId", "==", folder.id),
    orderBy("createdAt", "desc"),
    limit(5),
  ];

  const _query = query<Product>(
    collection(getFirestore(), "products") as CollectionReference<Product>,
    ...queryConstraints
  );
  const foldersQuery = useFirestoreQueryData(
    ["products", folder.id],
    _query,
    {
      subscribe: true,
      idField: "id",
    }
  );
  return (
    <>
      <h2>{folder.name}</h2>
      <pre>{JSON.stringify(foldersQuery, null, 2)}</pre>
    </>
  );
}

const FolderPage: NextPage<Data> = ({ folder, profile }) => {
  return (
    <>
      <Head>
        <title>Folder </title>
      </Head>
      <AuthStateReady>
        <FolderComponent {...{ folder, profile }} />
      </AuthStateReady>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Data> = async (context) => {
  const id = context.params!.id as string;
  return firebaseAdmin
    .firestore()
    .collection("folders")
    .doc(id)
    .get()
    .then((folder) => {
      console.log(
        "Timestamp",
        folder.data()?.createdAt.constructor == Timestamp
      );
      return {
        props: {
          folder: {
            id: folder.id,
            ...folder.data(),
          },
        },
      };
    })
    .catch(() => ({
      notFound: true,
    }));
};

export default FolderPage;
