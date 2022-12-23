import User from '../../../types/User';

import FollowButton from '../../FollowButton';

const FollowerItem: React.FC<{user: User; following: boolean}> = ({
  user,
  following,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between min-w-56">
      <div className="flex flex-col md:flex-row items-center gap-1">
        <img
          className=" shadow-gray-200 p-[2px] h-10 w-10 rounded-full shadow-sm"
          src={user.profilePictureUrl ?? '/images/avatar.png'}
        />
        <div className="flex flex-col justify-center text-center md:text-left mb-2 md:mb-0">
          <span className="text-gray-700 font-medium text-sm truncate">
            {user.name}
          </span>
          <span className="text-gray-600 text-sm truncate">
            @{user.username}
          </span>
        </div>
      </div>
      <FollowButton userId={user?.id!} className="!w-[100px] !py-1" />
    </div>
  );
};

export default FollowerItem;
