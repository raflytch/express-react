//import SidebarMenu
import SidebarMenu from "../../../components/SidebarMenu";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function Dashboard() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const userData = Cookies.get("user");

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="px-10 mx-auto mt-5 mb-5">
      <div className="flex flex-col gap-5 md:flex-row">
        {/* Sidebar */}
        <div className="md:w-1/4 lg:w-1/5 mb-5 md:mb-0">
          <SidebarMenu />
        </div>

        {/* Main Content */}
        <div className="md:w-3/4">
          <div className="bg-white rounded-lg shadow-md">
            <div className="bg-gray-200 px-4 py-2 text-lg font-semibold">
              DASHBOARD
            </div>
            <div className="p-4">
              Selamat Datang, <strong>{user.name}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
