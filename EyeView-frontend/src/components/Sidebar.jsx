import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div className={`w-60 min-h-screen bg-(--color-richblack-800) text-white flex flex-col justify-between fixed md:relative z-50 md:z-auto transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:block`}>
      <div>
        <div className="flex justify-between items-center p-4 md:hidden">
          <h2 className="text-2xl font-bold">EyeView</h2>
          <button onClick={() => setSidebarOpen(false)} className="text-white text-2xl">
            <FiX />
          </button>
        </div>
        <h2 className="text-2xl font-bold p-4 hidden md:block">EyeView</h2>
        <ul className="space-y-2 px-4">
          <li>
            <Link to="/dashboard" onClick={() => setSidebarOpen(false)} className="block py-3 px-2 hover:bg-(--color-richblack-700) rounded-sm text-lg">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/alerts" onClick={() => setSidebarOpen(false)} className="block py-3 px-2 hover:bg-(--color-richblack-700) rounded-sm text-lg">
              Alerts
            </Link>
          </li>
          <li>
            <Link to="/history" onClick={() => setSidebarOpen(false)} className="block py-3 px-2 hover:bg-(--color-richblack-700) rounded-sm text-lg">
              History
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
