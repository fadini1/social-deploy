import { useRouter } from "next/router";
import { useCallback } from "react";
import { BiArrowBack } from 'react-icons/bi'

interface HeaderProps {
  label: string;
  showBackArrow?: boolean;

}

const Header: React.FC<HeaderProps> = ({ label, showBackArrow }) => {
  const router = useRouter();
  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="pt-4 pb-2">
      <div className="flex flex-row items-center gap-2">
        {
          showBackArrow && (
            <BiArrowBack
              onClick={handleBack}
              size={20}
              className="cursor-pointer hover:opacity-80 transition duration-500"
            />
          )
        }
      </div>
    </div>
  )
}

export default Header