import { useRouter } from "next/router";
import Image from "next/image";

const SidebarLogo = () => {
  const router = useRouter(); 

  return (
    <div 
    onClick={() => router.push('/')}
    className="rounded-full hover:bg-amber-300 hover:bg-opacity-80
    cursor-pointer p-1.5 text-teal-300 hover:text-teal-200 transition 
    duration-500 ease-in-out bg-white">
       <Image
        style={{
          objectFit: 'cover',
          borderRadius: '100%'
        }} 
        width={34}
        height={34}
        alt="Logo"
        src={'/images/bonfire.png'}
      />
    </div>
  )
}

export default SidebarLogo