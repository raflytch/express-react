import { useState, useEffect } from "react";
import SidebarMenu from "../../../components/SidebarMenu";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Api from "../../../services/api";

export default function UsersIndex() {
  const [users, setUsers] = useState([]);

  const fetchDataUsers = async () => {
    const token = Cookies.get("token");
    if (token) {
      Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const response = await Api.get("/api/v1/admin/users");

        setUsers(response.data.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Token not found");
    }
  };

  useEffect(() => {
    fetchDataUsers();
  }, []);

  const deleteUser = async (id) => {
    const token = Cookies.get("token");

    if (token) {
      Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      try {
        await Api.delete(`/api/v1/admin/users/${id}`);
        fetchDataUsers();
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Token not found");
    }
  };

  return (
    <div className="px-4 py-5 mx-auto max-w-7xl">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <SidebarMenu />
        </div>

        {/* Main Content */}
        <div className="md:w-3/4">
          <div className="bg-white shadow-lg rounded-lg">
            <div className="bg-gray-100 px-4 py-3 flex justify-between items-center rounded-t-lg">
              <h2 className="text-xl font-semibold">USERS</h2>
              <Link
                to="/admin/users/create"
                className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition"
              >
                ADD USER
              </Link>
            </div>

            <div className="overflow-x-auto p-4">
              <table className="min-w-full table-auto border-collapse border border-gray-200">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-700">
                      Full Name
                    </th>
                    <th className="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-700">
                      Email Address
                    </th>
                    <th
                      className="px-4 py-2 border border-gray-300 text-center text-sm font-medium text-gray-700"
                      style={{ width: "20%" }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border border-gray-200 text-sm">
                          {user.name}
                        </td>
                        <td className="px-4 py-2 border border-gray-200 text-sm">
                          {user.email}
                        </td>
                        <td className="px-4 py-2 border border-gray-200 text-center">
                          <Link
                            to={`/admin/users/edit/${user.id}`}
                            className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition"
                          >
                            EDIT
                          </Link>
                          <button
                            className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition ml-2"
                            onClick={() => deleteUser(user.id)}
                          >
                            DELETE
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="px-4 py-2 border border-gray-200 text-center text-sm text-gray-500"
                      >
                        <div className="bg-red-100 text-red-500 py-2 px-4 rounded-lg">
                          Data Belum Tersedia!
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
