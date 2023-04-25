import { BsBellFill } from 'react-icons/bs';
import { MdCircleNotifications } from 'react-icons/md'
import { MdAccountCircle } from 'react-icons/md';
import { MdArrowCircleLeft } from 'react-icons/md'
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

import SidebarLogo from './SidebarLogo';
import SidebarItem from './SidebarItem';
import SidebarTweetButton from './SidebarTweetButton';

import useCurrentUser from '@/hooks/useCurrentUser';

const Sidebar = () => {
  const { data: currentUser } = useCurrentUser();
  const items = [
    {
      label: 'Notifications',
      href: '/notifications',
      icon: MdCircleNotifications,
      auth: true,
      alert: currentUser?.hasNotification
    },
    {
      label: 'Profile',
      href: `/users/${currentUser?.id}`,
      icon: MdAccountCircle,
      auth: true
    }
  ];

  const router = useRouter();

  return (
    <div className='h-full'>
      <div>
        <div className='flex items-center justify-between p-4'>
          <div className='flex items-center justify-center'>
            <SidebarLogo />
            <div 
            onClick={() => router.push('/')}
            className='text-2xl ml-1 p-4 tracking-[12px] flex cursor-pointer
            text-amber-300'>
              <p className='logo-letter'>B</p>
              <p className='logo-letter'>O</p>
              <p className='logo-letter'>N</p>
              <p className='logo-letter'>F</p>
              <p className='logo-letter'>I</p>
              <p className='logo-letter'>R</p>
              <p className='logo-letter'>E</p>
            </div>
          </div>
          <div className='flex'>
            {items.map((item) => (
              <SidebarItem
                key={item.href}
                label={item.label}
                href={item.href} 
                icon={item.icon}
                auth={item.auth}
                alert={item.alert}
              />
            ))}
            {currentUser && (
              <SidebarItem onClick={() => signOut()} 
              icon={MdArrowCircleLeft} label='Logout' />
            )}
            <SidebarTweetButton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar