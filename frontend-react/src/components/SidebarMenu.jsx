//import Link from react router dom
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthContext";

export default function SidebarMenu() {
  const navigate = useNavigate();

  const { setIsAuthenticated } = useContext(AuthContext);

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setIsAuthenticated(false);

    navigate("/login", { replace: true });
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="bg-gray-200 px-4 py-2 font-semibold text-gray-700">
        MAIN MENU
      </div>
      <div className="p-4">
        <div className="flex flex-col space-y-2">
          <Link
            to="/admin/dashboard"
            className="block px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition duration-200"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/users"
            className="block px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition duration-200"
          >
            Users
          </Link>

          <a
            href="#"
            className="block px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition duration-200 cursor-pointer"
            onClick={logout}
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  );
}
