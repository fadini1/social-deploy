import { useCallback, useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import Avatar from "../Avatar";

interface CommentItemProps {
  data: Record<string, any>
};

const CommentItem: React.FC<CommentItemProps> = ({ data }) => {
  const router = useRouter();

  const goToUser = useCallback((event: any) => {
    event.stopPropagation();

    router.push(`/users/${data.user.id}`);
  }, [data.user.id, router]);

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  return (
    <div className="p-4 cursor-pointer hover:bg-[#1e1e1e]
    transition duration-500 rounded-lg ml-24">
      <div className="flex items-center gap-2">
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
    </div>
  );
}

export default CommentItem;