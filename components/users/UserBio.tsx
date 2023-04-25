import { format } from "date-fns";
import { useMemo } from "react";
import { BiCalendar } from "react-icons/bi";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import useEditModal from "@/hooks/useEditModal";
import useFollow from "@/hooks/useFollow";

import Button from "../Button";

interface UserBioProps {
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);

  const editModal = useEditModal();

  const { isFollowing, toggleFollow } = useFollow(userId); 

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }

    return format(new Date(fetchedUser.createdAt), 'MMMM dd,   yyyy');
  }, [fetchedUser?.createdAt]);
  
  return (
    <div>
      <div className="flex justify-between ml-32 p-2">
        {currentUser?.id === userId ? (
          <Button 
            onClick={editModal.onOpen} 
            label="Edit"
            secondary
          />
        ) : (
          <Button
            onClick={toggleFollow}
            label={isFollowing ? 'Unfollow' : 'Follow'}
            secondary={!isFollowing}
            unfollow={isFollowing}
          />
        )}
      </div>
      <div className="mt-5 pl-8 h-screen">
        <div className="flex flex-col">
          <p className="text-2xl font-semibold">
            {fetchedUser?.name}
          </p>
          <p className="text-md text-teal-200 -mt-0.5">
            @{fetchedUser?.username}
          </p>
        </div>
        <div className="flex flex-col mt-2">
          <p>
            {fetchedUser?.bio}
          </p>
          <div className="flex flex-row items-center gap-1 mt-0.5">
            <BiCalendar size={20} />
            <p className="text-md">
              Joined {createdAt}
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-1 gap-2"> 
          <div className="flex flex-row items-center gap-1">
            <p>
              {fetchedUser?.followersCount || 0}
            </p>
            <p>
              Followers 
            </p>
          </div>
          <p>
            |
          </p>  
          <div className="flex flex-row items-center gap-1">
            <p>
              {fetchedUser?.followingIds?.length}
            </p>
            <p>
              Following
            </p>
          </div>   
        </div>
      </div>
    </div>
  )
}

export default UserBio;