import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-10 w-10/12 mx-auto mb-4 bg-gray-100 rounded-lg shadow-md">
      <div className="px-4 mx-auto py-5">
        <h1 className="text-4xl font-bold mb-4">
          FULLSTACK JAVASCRIPT DEVELOPER
        </h1>
        <p className="text-lg mb-6">
          Belajar Full Stack JavaScript Developer dengan Express dan React di
          SantriKoding.com
        </p>
        <hr className="border-gray-300 mb-6" />
        <Link
          to="/register"
          className="bg-blue-500 text-white py-3 px-6 rounded-lg text-lg mr-3 hover:bg-blue-600 transition-all duration-300"
        >
          REGISTER
        </Link>
        <Link
          to="/login"
          className="bg-gray-500 text-white py-3 px-6 rounded-lg text-lg hover:bg-gray-600 transition-all duration-300"
        >
          LOGIN
        </Link>
      </div>
    </div>
  );
}
