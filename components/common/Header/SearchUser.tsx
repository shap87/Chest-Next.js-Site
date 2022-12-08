import type User from '../../../types/User';

import {Fragment, useState} from 'react';
import {Popover, Transition} from '@headlessui/react';
import debounce from 'lodash.debounce';
import {useFirestoreQueryData} from '@react-query-firebase/firestore';
import {query, collection, orderBy, startAt, endAt} from 'firebase/firestore';
// hooks
import {useFirestore} from '../../../context/firebase';
// components
import SearchIcon from '../../icons/SearchIcon';
import UserItem from './UserItem';

const SearchUser = () => {
  const [term, setTerm] = useState('');
  const [open, setOpen] = useState(false);
  const firestore = useFirestore();
  // TODO: I think it is more efficient to fetch one time, and filter from the state
  const ref = query(
    collection(firestore, 'users'),
    orderBy('name'),
    startAt(term),
    endAt(term + '~'),
  );
  const usersQuery = useFirestoreQueryData(
    ['users', {term}],
    term.length > 2 ? ref : undefined,
  );

  const onSearchDebounce = debounce(e => setTerm(e.target.value), 300);

  return (
    <Popover as="label" className="w-96 relative">
      <SearchIcon className="stroke-primary absolute z-10 w-4 left-4 top-1/2 -translate-y-1/2" />
      <input
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onChange={onSearchDebounce}
        className="pl-10 focus:border-main-300 focus:outline-main-50 outline-4 outline-offset-0"
        type="search"
        placeholder="Search (⌘+K)"
      />
      <Transition
        show={open}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Popover.Panel className="absolute right-0 z-10 mt-2 p-5 w-96 max-h-96 origin-top-right rounded-lg bg-white shadow-lg focus:outline-none divide-y overflow-y-auto">
          {usersQuery.data?.map(user => (
            <UserItem key={user.uid} user={user as User} />
          ))}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default SearchUser;
