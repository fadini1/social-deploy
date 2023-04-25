import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

import usePost from "@/hooks/usePost";
import Header from "@/components/Header";
import PostItem from "@/components/posts/PostItem";
import Form from "@/components/Form";
import CommentFeed from "@/components/posts/CommentFeed";

const PostView = () => {
  const router = useRouter();
  const { postId } = router.query;
  const { data: fetchedPost, isLoading } = usePost(postId as string);

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader color="lightblue" size={40} />
      </div>
    )
  }

  return (  
    <>
      <div>
        <Header showBackArrow label="" />
        <PostItem data={fetchedPost} />
        <Form
          postId={postId as string}
          isComment
          placeholder="Add a reply..."
        />
        <CommentFeed comments={fetchedPost?.comments} />
      </div>
    </>
  )
}

export default PostView;