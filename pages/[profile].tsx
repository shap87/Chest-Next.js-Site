import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import {
  useFirestoreQueryData,
  useFirestoreInfiniteQueryData,
  useFirestoreInfiniteQuery,
} from "@react-query-firebase/firestore";
import {
  collection,
  getFirestore,
  query,
  QueryConstraint,
  where,
  orderBy,
  CollectionReference,
  limit,
  startAfter,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebaseAdmin from "../firebase/node";
import { AuthStateReady } from "../context/firebase";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import {
  ProfileContextProvider,
  useProfile,
  Profile,
} from "../context/profile";
import NewFolderSwipeableDrawer from "../component/NewFolderSwipeableDrawer";
import { useCallback, useRef } from "react";
import Link from "next/link";
import type { Folder, Product } from "@chestrapp/firebase";
import { getFunctions, httpsCallable } from "firebase/functions";

interface Data {
  profile: Profile;
}

function ProfileProducts() {
  const profile = useProfile();
  const { currentUser } = getAuth();

  const queryConstraints: QueryConstraint[] = [
    where("userId", "==", profile.id),
    orderBy("createdAt", "desc"),
    limit(5),
  ];

  const _query = query<Product>(
    collection(getFirestore(), "products") as CollectionReference<Product>,
    ...queryConstraints
  );

  const productsQuery = useFirestoreQueryData(
    ["products", profile.id],
    _query,
    {
      subscribe: true,
      idField: "id",
    }
  );

  const functions = getFunctions();
  const fetchProductData = httpsCallable(functions, "fetchProductData");

  const addProduct = useCallback(() => {
    fetchProductData({
      url: "https://amzn.eu/d/b4x7341",
    }).then(console.log);
  }, []);

  return (
    <>
      <Button onClick={addProduct}>Add product</Button>
      <pre>{JSON.stringify(productsQuery, null, 2)}</pre>
    </>
  );
}

function ProfileFolders() {
  const profile = useProfile();
  const { currentUser } = getAuth();

  const queryConstraints: QueryConstraint[] = [
    where("userId", "==", profile.id),
    orderBy("createdAt", "desc"),
    limit(5),
  ];

  if (currentUser?.uid != profile.id)
    queryConstraints.push(where("visibility", "==", 0));

  const _query = query<Folder>(
    collection(getFirestore(), "folders") as CollectionReference<Folder>,
    ...queryConstraints
  );

  const foldersQuery = useFirestoreQueryData(["folders", profile.id], _query, {
    subscribe: true,
    idField: "id",
  });

  const gridRef = useRef<HTMLDivElement>();

  return (
    <Box>
      <NewFolderSwipeableDrawer
        onSuccess={
          () =>
            // foldersQuery
            //   .refetch()
            //   .then(() =>
            setTimeout(
              () =>
                gridRef.current?.querySelector(":scope > *")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                  inline: "start",
                }),
              100
            )
          // )
        }
      >
        <Button>Add folder</Button>
      </NewFolderSwipeableDrawer>
      <Box
        ref={gridRef}
        sx={{
          "--gutter": "16px",
          margin: "0 calc(-1 * var(--gutter))",
          padding: "0px var(--gutter)",
          display: "grid",
          gridColumn: "1/-1",
          gridGap: "calc(var(--gutter) / 2)",
          gridAutoFlow: "column",
          gridAutoColumns: "calc(50% - var(--gutter) / 2)",
          overflowX: "scroll",
          scrollSnapType: "x proximity",
          scrollPaddingLeft: "var(--gutter)",
          paddingBottom: "calc(.75 * var(--gutter))",
          marginBottom: "calc(-.25 * var(--gutter))",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {foldersQuery.data
          // ?.pages.flatMap((page) =>
          // page.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          // )
          ?.map(({ id, name }) => (
            <Box
              key={id}
              sx={{
                scrollSnapAlign: "start",
              }}
            >
              <Link href={`/folder/${id}`}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://logo.clearbit.com/getchestr.com"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="body1" component="div">
                      {name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      0 items
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Box>
          ))}
        <Box>
          {/* <Button onClick={() => foldersQuery.fetchNextPage()}>Next</Button> */}
        </Box>
      </Box>
    </Box>
  );
}

function ProfileComponent() {
  const profile = useProfile();
  return (
    <>
      <h1>{profile.displayName}</h1>
      {/* <h4>@{profile.username}</h4> */}
      <ProfileFolders />
      <ProfileProducts />
    </>
  );
}

const ProfilePage: NextPage<Data> = ({ profile }) => {
  return (
    <>
      <Head>
        <title>{profile.displayName || profile.username}</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              // image: "janedoe.jpg",
              // jobTitle: "Professor",
              name: profile.displayName,
              // telephone: "(425) 123-4567",
              url: `https://chestr.com/${profile.username || profile.id}`,
            }),
          }}
        />
      </Head>
      <AuthStateReady>
        <ProfileContextProvider profile={profile}>
          <ProfileComponent />
        </ProfileContextProvider>
      </AuthStateReady>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Data> = async (context) => {
  const profile = context.params!.profile as string;
  return firebaseAdmin
    .firestore()
    .collection("usernames")
    .doc(profile)
    .get()
    .then((username) => {
      return firebaseAdmin
        .auth()
        .getUser(username.data()?.id || profile)
        .then((user) => ({
          props: {
            profile: {
              id: user.uid,
              username: user.uid != profile ? profile : null,
              displayName: user.displayName,
            },
          } as Data,
        }))
        .catch(() => ({
          notFound: true,
        }));
    });
};

export default ProfilePage;
