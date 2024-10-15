import SidebarMenu from "../../../components/SidebarMenu";
import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import Api from "../../../services/api";
import { useNavigate, useParams } from "react-router-dom";

const token = Cookies.get("token");

export default function UsersEdit() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validation, setValidation] = useState([]);

  const fetchDetailUser = useCallback(async () => {
    await Api.get(`/api/v1/admin/users/${id}`).then((response) => {
      setName(response.data.data.name);
      setEmail(response.data.data.email);
    });
  }, [id]);

  useEffect(() => {
    fetchDetailUser();
  }, [fetchDetailUser]);

  const updateUser = async (e) => {
    e.preventDefault();

    const data = {
      name: name,
      email: email,
      password: password,
    };

    Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await Api.put(`/api/v1/admin/users/${id}`, data)
      .then(() => {
        navigate("/admin/users");
      })
      .catch((error) => {
        setValidation(error.response.data.errors);
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
              <h2 className="text-xl font-semibold">EDIT USER</h2>
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

              <form onSubmit={updateUser}>
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
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
