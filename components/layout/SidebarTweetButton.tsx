import { useRouter } from "next/router"
import { FiFeather } from "react-icons/fi";
import { useCallback } from "react";

import useLoginModal from "@/hooks/useLoginModal";

const SidebarTweetButton = () => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const onClick = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  return (
    <div className="flex items-center justify-center" 
    onClick={onClick}>
      <div className="rounded-full flex items-center px-4 py-[3px]
      justify-center transition duration-700 ease-in-out 
      cursor-pointer bg-teal-200 hover:bg-teal-900
      hover:text-teal-200 text-teal-900 lg:w-full">
        <FiFeather className="h-6 w-6 rounded-lg mr-1" />
        <p className="text-lg font-medium hover:opacity-80">
          +
        </p>
      </div>
    </div>
  )
}

export default SidebarTweetButton