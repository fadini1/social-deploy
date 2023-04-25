import Image from "next/image";

import useUser from "@/hooks/useUser";

import Avatar from "../Avatar";

interface UserHeroProps {
  userId: string;
}

const UserHero: React.FC<UserHeroProps> = ({ userId }) => {
  const { data: fetchedUser } = useUser(userId);
  return (
    <div>
      <div className="bg-neutral-800/40 h-44 relative rounded-2xl">
        {fetchedUser?.coverImage && (
          <Image
            src={fetchedUser.coverImage}
            style={{ objectFit: 'cover' }}
            alt="Cover Image"
            fill
            className="rounded-2xl"
          /> 
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  )
}

export default UserHero