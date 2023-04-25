import { useEffect } from "react";

import useCurrentUser from "@/hooks/useCurrentUser"
import useNotifications from "@/hooks/useNotifications";

const NotificationsFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = []} = useNotifications(currentUser?.id);

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (fetchedNotifications.length === 0) {
    return (
      <div className="flex items-center justify-center h-[25rem]">
        <p className="py-3 px-4 bg-teal-300 text-black text-xl rounded-xl
        font-medium hover:bg-teal-200 transition duration-500">
          Looks like you&apos;re all caught up, Mate!
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {fetchedNotifications.map((notification: Record<string, any>) => (
        <div 
        key={notification.id}
        className="flex items-center p-4 gap-2">
          <p className="py-3 px-4 bg-teal-300 text-black text-xl rounded-xl
        font-medium hover:bg-teal-200 transition duration-500">
            {notification.body}
          </p>
        </div>
      ))}
    </div>
  )
}

export default NotificationsFeed