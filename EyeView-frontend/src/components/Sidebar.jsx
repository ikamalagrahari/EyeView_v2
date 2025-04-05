import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-60 min-h-screen bg-[var(--color-richblack-800)] text-white flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold p-4">EyeView</h2>
        <ul className="space-y-2 px-4">
          <li>
            <Link to="/dashboard" className="block py-2 hover:bg-[var(--color-richblack-700)] rounded">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/alerts" className="block py-2 hover:bg-[var(--color-richblack-700)] rounded">
              Alerts
            </Link>
          </li>
          <li>
            <Link to="/history" className="block py-2 hover:bg-[var(--color-richblack-700)] rounded">
              History
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
