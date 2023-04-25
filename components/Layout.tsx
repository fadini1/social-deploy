import FollowBar from "./layout/FollowBar";
import Sidebar from "./layout/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-full">
      <div className="mx-auto max-w-6xl">
        <div>
          <Sidebar />  
        </div>
        <div className="flex h-full -mt-2">
          <div className="w-full">
            {children}
          </div>
          <FollowBar />
        </div>
      </div>
    </div>
  );
}

export default Layout