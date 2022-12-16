import type User from '../../../types/User';

import {useFirestoreQueryData} from '@react-query-firebase/firestore';
import {query, collection, limit} from 'firebase/firestore';
import {useState} from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
// hooks
import {useFirestore} from '../../../context/firebase';
// components
import FollowerItem from './FollowerItem';
import {useWindowSize} from '../../../utils/useWindowSize';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: {max: 4000, min: 3000},
    items: 1,
  },
  desktop: {
    breakpoint: {max: 3000, min: 1024},
    items: 1,
  },
  tablet: {
    breakpoint: {max: 1024, min: 464},
    items: 4,
  },
  mobile: {
    breakpoint: {max: 464, min: 0},
    items: 2.5,
  },
};

const Followers = () => {
  const firestore = useFirestore();
  const ref = query(collection(firestore, 'users'), limit(5));
  const usersQuery = useFirestoreQueryData('users', ref);
  const [followedUsers] = useState<{[key: string]: string}>({
    DOmeCKtcU9d7lD9xvrJysJ9IFaD3: 'isaac',
  });

  const {width} = useWindowSize();
  const isTablet = width && width < 768;

  return (
    <>
      {isTablet
        ? (usersQuery.data?.length ?? 0) > 0 && (
            <Carousel responsive={responsive} arrows={false}>
              {usersQuery.data?.map(user => (
                <FollowerItem
                  key={user.id}
                  following={Object.prototype.hasOwnProperty.call(
                    followedUsers,
                    user.id,
                  )}
                  user={user as User}
                />
              ))}
            </Carousel>
          )
        : (usersQuery.data?.length ?? 0) > 0 && (
            <div className="flex flex-col gap-4">
              {usersQuery.data?.map(user => (
                <FollowerItem
                  key={user.id}
                  following={Object.prototype.hasOwnProperty.call(
                    followedUsers,
                    user.id,
                  )}
                  user={user as User}
                />
              ))}
            </div>
          )}
    </>
  );
};

export default Followers;
