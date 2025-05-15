import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const linkClass = (path) =>
    `px-4 py-2 rounded-md font-medium transition ${
      location.pathname === path
        ? "bg-white text-black"
        : "text-stone-300 hover:bg-stone-700 hover:text-white"
    }`;

  return (
    <nav className="bg-stone-950 fixed w-full shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-extrabold text-white cursor-pointer select-none">
          Jobzilla
        </div>
        <div className="space-x-6">
          <Link to="/" className={linkClass("/")}>
            Home
          </Link>
          <Link to="/add-job" className={linkClass("/add-job")}>
            Add Job
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
