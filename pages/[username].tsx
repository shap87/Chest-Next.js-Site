import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import firebaseAdmin from "../firebase/node";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { useFirebase } from "../context/firebase";
import { collection, getFirestore, query, where } from "firebase/firestore/lite";
import { getApp } from "firebase/app";

interface User {
  email?: string;
  username: string;
  lastName?: string;
  firstName?: string;
}
interface Data {
  user: User;
}

const Home: NextPage<Data> = ({ user }) => {
  const { user: _user } = useFirebase();
  const _query = useFirestoreQueryData(
    ["folders", user.username],
    query(
      collection(getFirestore(), "folders"),
      where("userId", "==", user.username)
    )
  );

  return (
    <>
      <Head>
        <title>{`Home @${user.username}`}</title>
      </Head>
      <h1>Hello world!</h1>
      {/* <pre>
        {JSON.stringify(
          {
            _user,
            // _query,
          },
          null,
          2
        )}
      </pre> */}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Data> = async (context) => {
  return {
    props: {
      user: {
        username: context.params!.username as string,
      },
    },
  };
  // const user = await firebaseAdmin
  //   .firestore()
  //   .collection("users")
  //   .doc("cJxtKYYgovLcHNFFqecD")
  //   .get();
  // return {
  //   props: {
  //     user: user.data() as User,
  //   }, // will be passed to the page component as props
  // };
};

export default Home;
