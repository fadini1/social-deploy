import { useCallback, useMemo } from "react";
import { FiMessageCircle } from "react-icons/fi";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";

import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLike from "@/hooks/useLike";

import Avatar from "../Avatar";

interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });

  const goToUser = useCallback((event: any) => {
    event.stopPropagation();

    router.push(`/users/${data.user.id}`);

  }, [router, data.user.id]);

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  const onLike = useCallback((event: any) => {
    event.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    toggleLike();
  }, [loginModal, currentUser, toggleLike]);

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  const LikeIcon = hasLiked ? AiFillLike : AiOutlineLike;

  return (
    <div
      onClick={goToPost}
      className=" p-4 cursor-pointer hover:bg-[#1e1e1e] transition
      duration-500 ml-10 rounded-lg"
    >
      <div className="flex items-start gap-2">
        <div>
          <div className="flex gap-4 items-center">
            <Avatar userId={data.user.id} hasBorder />
            <p
            onClick={goToUser} 
            className="font-medium hover:text-teal-100 transition
            duration-500 text-lg">
              {data.user.name}
            </p>
            <span className="bg-emerald-400 text-black px-2 py-.5 rounded-xl
            text-sm font-medium">
              {createdAt} ago
            </span>
          </div>
          <div className="max-w-3xl bg-emerald-400 px-5 py-3 ml-14 rounded-xl
          text-black font-medium">
            &apos;&apos;{data.body}&apos;&apos;
          </div>
          <div className="flex items-center mt-2 gap-6">
            <div 
            onClick={onLike}
            className="flex items-center gap-2 cursor-pointer ml-14">
              <LikeIcon
              className={`
                rounded-full p-1.5 h-8 w-8 transition duration-500
                border-2  
                ${hasLiked ? 'bg-emerald-200' : 'bg-transparent'}
                ${hasLiked ? 'border-black' : 'border-[#d3d3d3]'}
                ${hasLiked ? 'text-black' : ''}
                ${hasLiked ? 'hover:bg-transparent' : 'hover:bg-emerald-100'}
                ${hasLiked ? 'hover:text-white' : 'hover:text-black'}
              `}/>
              <p className="font-medium text-lg">
                {data.likedIds.length}
              </p>
            </div>
            <div className="flex items-center gap-2 cursor-pointer -ml-2">
              <FiMessageCircle 
                className={`
                bg-emerald-200 text-black rounded-full p-1.5 h-8 w-8
                border-2 border-black
              `}/>
              <p className="font-medium text-lg">
                {data.comments?.length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostItem