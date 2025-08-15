import React from "react";
import { Link } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import { FaPencilAlt } from "react-icons/fa";

const Navbar = () => {
  const { ready, authenticated, login, logout } = usePrivy();

  if (!ready) {
    return (
      <div className="flex justify-center items-center h-16 bg-gradient-to-r from-blue-600 to-purple-400">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link
            to="/"
            className="flex items-center space-x-2 text-xl font-bold"
          >
            <FaPencilAlt className="text-2xl" />
            <span>AI Writing Assistant</span>
          </Link>
        </div>
        <div className="flex-1 flex justify-center mr-20">
          <div className="flex space-x-8 mr-10">
            <NavLink to="/" className="text-xl font-semibold">Home</NavLink>
            <NavLink to="/about" className="text-xl font-semibold">About</NavLink>
            {authenticated && (
              <NavLink to="/write" className="text-xl font-semibold">Write</NavLink>
            )}
          </div>
        </div>
        <div>
          {authenticated ? (
            <button
              onClick={logout}
              className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-blue-100 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={login}
              className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-blue-100 transition duration-300"
            >
              Sign up
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children, className }) => (
  <Link
    to={to}
    className={`text-white hover:text-blue-200 transition duration-300 ${className}`}
  >
    {children}
  </Link>
);

export default Navbar;











// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { FaPencilAlt } from "react-icons/fa";

// const Navbar = () => {
//   const location = useLocation();
//   return (
//     <nav className="bg-white border-b shadow-sm">
//       <div className="container mx-auto flex justify-between items-center py-3 px-4">
//         <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-700">
//           <FaPencilAlt className="text-blue-500" />
//           <span>AI Writing Assistant</span>
//         </Link>
//         <div className="flex gap-6">
//           <NavLink to="/" active={location.pathname === "/"}>Home</NavLink>
//           <NavLink to="/about" active={location.pathname === "/about"}>About</NavLink>
//           <Link
//             to="/login"
//             className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold text-lg shadow hover:bg-blue-700 transition"
//           >
//             Sign Up
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// const NavLink = ({ to, children, active }) => (
//   <Link
//     to={to}
//     className={`text-gray-600 hover:text-blue-700 text-lg font-medium transition ${
//       active ? "border-b-2 border-blue-600" : ""
//     } pb-1`}
//   >
//     {children}
//   </Link>
// );

// export default Navbar;


