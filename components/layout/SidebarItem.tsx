import { useCallback } from "react";
import { IconType } from "react-icons";
import { useRouter } from "next/router";
import { BsDot } from "react-icons/bs";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";

interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
  auth,
  alert
}) => {
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();
  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (auth && !currentUser) {
      loginModal.onOpen();

    } else if (href) {
      router.push(href);
    }
  }, [onClick, router, href, auth, loginModal, currentUser]);
  return (
    <div
    onClick={handleClick} 
    className="flex items-center">
      <div className="rounded-full cursor-pointer hover:bg-teal-300/20 
      hover:text-teal-200 text-teal-300 transition duration-500 mr-2">
        <Icon className="h-10 w-10 rounded-full"/>
        {alert ? <BsDot className="
          bg-amber-300 text-amber-300 absolute top-[1.8rem] right-[18.3rem] 
          h-3 w-3 rounded-full animate-bounce" 
        /> : null}
      </div>
    </div>
  )
}

export default SidebarItem