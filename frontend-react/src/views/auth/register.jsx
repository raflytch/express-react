import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   Define state validation
  const [validation, setValidation] = useState([]);

  const register = async (e) => {
    e.preventDefault();
    await api
      .post("/api/v1/register", {
        name: name,
        email: email,
        password: password,
      })
      .then(() => {
        // redirect to login page
        navigate("/login");
      })
      .catch((error) => {
        // set validation
        setValidation(error.response.data);
        console.log(error.response.data);
      });
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-xl font-semibold mb-4">REGISTER</h4>
          <hr className="mb-4" />
          {validation.errors && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {validation.errors.map((error, index) => (
                <p key={index}>
                  {error.path} : {error.msg}
                </p>
              ))}
            </div>
          )}
          <form onSubmit={register}>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
