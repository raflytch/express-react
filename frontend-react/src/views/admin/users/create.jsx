import SidebarMenu from "../../../components/SidebarMenu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Api from "../../../services/api";

const token = Cookies.get("token");

export default function UsersCreate() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validation, setValidation] = useState([]);

  const storeUser = async (e) => {
    e.preventDefault();

    Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await Api.post("/api/v1/admin/users", {
      name: name,
      email: email,
      password: password,
    })
      .then(() => {
        navigate("/admin/users");
      })
      .catch((error) => {
        setValidation(error.response.data);
      });
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
            <div className="bg-gray-100 px-4 py-3 rounded-t-lg">
              <h2 className="text-xl font-semibold">ADD USER</h2>
            </div>

            <div className="p-6">
              {validation.errors && (
                <div className="bg-red-100 text-red-600 p-3 mb-4 rounded-md">
                  {validation.errors.map((error, index) => (
                    <p key={index}>
                      <strong>{error.path}</strong>: {error.msg}
                    </p>
                  ))}
                </div>
              )}

              <form onSubmit={storeUser}>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    placeholder="Full Name"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    placeholder="Email Address"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    placeholder="Password"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 transition"
                >
                  SAVE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
