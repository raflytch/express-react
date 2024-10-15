import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/AuthContext";
export default function Login() {
  // Navigate
  const navigate = useNavigate();

  const { setIsAuthenticated } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validation, setValidation] = useState([]);

  const [loginFailed, setLoginFailed] = useState([]);

  const login = async (e) => {
    e.preventDefault();

    await api
      .post("/api/v1/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        // set cookie and set token

        Cookies.set("token", response.data.token);
        Cookies.set("user", JSON.stringify(response.data.user));
        setIsAuthenticated(true);

        navigate("/admin/dashboard", { replace: true });
      })
      .catch((error) => {
        setValidation(error.response.data);
        setLoginFailed(error.response.data);
        console.log(error.response.data);
      });
  };
  return (
    <div className="flex justify-center mt-5">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h4 className="text-xl font-semibold">LOGIN</h4>
            <hr className="my-4" />
            {validation.errors && (
              <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                {validation.errors.map((error, index) => (
                  <p key={index}>
                    {error.path} : {error.msg}
                  </p>
                ))}
              </div>
            )}
            {loginFailed.message && (
              <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                {loginFailed.message}
              </div>
            )}
            <form onSubmit={login}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email Address"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                LOGIN
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
