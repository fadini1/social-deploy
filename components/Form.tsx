import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePosts from "@/hooks/usePosts";
import usePost from "@/hooks/usePost";
import useRegisterModal from "@/hooks/userRegisterModal";

import Button from "./Button";
import Avatar from "./Avatar";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormProps> = ({
  placeholder,
  isComment,
  postId
}) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string);

  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const url = isComment ? `/api/comments?postId=${postId}` : '/api/posts';

      await axios.post(url, { body });

      toast.success('Post Published Successfully');

      setBody('');
      mutatePosts();
      mutatePost();
    } catch (error) {
      toast.error('Something went wrong :D');
    } finally {
      setIsLoading(false);
    }
  }, [body, isComment, postId, mutatePosts, mutatePost]);

  return (
    <div className="px-5 mt-10 ml-10">
      {currentUser ? (
        <div className="flex flex-row gap-2">
          <div>
            <Avatar userId={currentUser?.id} hasBorder />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(e) => setBody(e.target.value)}
              value={body}
              className="disabled:opacity-80 peer resize-none mt-2 rounded-lg
              w-1/2 ring-0 outline-none placeholer-neutral-500 bg-[#242424] 
              px-3 pt-1.5 pb-10 font-medium"
              placeholder={placeholder}
            ></textarea>
            <div className="w-1/2 flex">
              <Button 
                label="Post" 
                secondary
                disabled={isLoading || !body}
                onClick={onSubmit}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-xl">
            Welcome, traveler! Pull up a chair.   
          </h1>
          <div className="flex gap-2 mt-2">
            <Button
              label="Login" 
              onClick={loginModal.onOpen}
              secondary
            />
            <Button 
              label="Register" 
              onClick={registerModal.onOpen}
              secondary 
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Form