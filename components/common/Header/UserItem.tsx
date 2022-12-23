import type User from '../../../types/User';

import React from 'react';

interface Props {
  user: User;
  handleClick: () => void;
}

const UserItem: React.FC<Props> = ({user, handleClick}) => {
  return (
    <div
      className="py-4 flex flex-row items-center justify-between cursor-pointer"
      onClick={handleClick}>
      <div className="flex flex-row items-center gap-2">
        <img
          className="h-12 w-12 object-fill rounded-full"
          src={user.profilePictureUrl}
        />

        <div className="flex flex-col items-center gap-1">
          <span className="text-gray-700 font-semibold">{user.name}</span>
          <span className="text-gray-400 font-semibold text-sm">
            @{user.username}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
