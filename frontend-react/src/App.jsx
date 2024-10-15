// import router
import AppRoutes from "./routes";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <nav className="bg-gray-900 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-xl font-bold">
            HOME
          </Link>
          <button
            className="text-white lg:hidden focus:outline-none"
            type="button"
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
          <div className="hidden lg:flex lg:items-center">
            <ul className="flex space-x-4">
              <li>
                <a
                  href="https://santrikoding.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300"
                >
                  RAFLY
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mx-auto mt-5">
        <AppRoutes />
      </div>
    </div>
  );
}
