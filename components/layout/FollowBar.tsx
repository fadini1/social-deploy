import useUsers from "@/hooks/useUsers"
import Avatar from "../Avatar";

const FollowBar = () => {
  const { data: users = [] } = useUsers();
  
  if (users.length === 0) {
    return null;
  }

  return (
    <div className="px-2 ml-2 mt-4 hidden lg:block">
      <div className="bg-[#1e1e1e] rounded-xl px-3 py-1.5 
      hover:bg-[#222222] transition duration-500 cursor-pointer">
        <h2 className="text-xl font-medium">
          Popular Users
        </h2>
        <div className="flex flex-col gap-3 mt-4">
          {users.map((user: Record<string, any>) => (
            <div key={user.id} className="flex flex-row gap-2
            hover:opacity-80 transition duration-500">
              <Avatar userId={user.id} />
              <div className="flex flex-col">
                <p className="font-medium">
                  {user.name}
                </p>
                <p className="text-teal-200 -mt-1">
                  @{user.username}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FollowBar