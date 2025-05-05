import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Switch from "./Switch";
import img from "../assets/avatar.png";

const Navbar = ({ darkMode, setDarkMode }) => {
  const { currentUser, logOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-neutral-100 dark:bg-gray-900 py-3 dark:text-white w-full fixed z-50">
      <div className="flex w-full flex-wrap items-center justify-between px-6">
        <Link className="pr-2 text-2xl font-semibold" to="/">
          MovieApp
        </Link>
        
        <div className="flex items-center space-x-4">
          {currentUser && (
            <h5 className="mr-2 capitalize">
              {currentUser.displayName || currentUser.email}
            </h5>
          )}
          
          <Switch darkMode={darkMode} setDarkMode={setDarkMode} />
          
          <div className="relative" ref={menuRef}>
            <img
              className="h-8 w-8 rounded-full cursor-pointer"
              src={currentUser?.photoURL || img}
              alt="User avatar"
              onClick={() => setMenuOpen(!menuOpen)}
            />
            
            {menuOpen && (
              <div className="absolute right-0 z-[1000] mt-1 min-w-max list-none overflow-hidden rounded-lg bg-white shadow-lg dark:bg-neutral-700">
                {!currentUser ? (
                  <>
                    <li>
                      <Link
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-white/30"
                        to="/register"
                        onClick={() => setMenuOpen(false)}
                      >
                        Register
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-white/30"
                        to="/login"
                        onClick={() => setMenuOpen(false)}
                      >
                        Login
                      </Link>
                    </li>
                  </>
                ) : (
                  <li>
                    <span
                      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-white/30 cursor-pointer"
                      role="button"
                      onClick={() => {
                        logOut();
                        setMenuOpen(false);
                      }}
                    >
                      Logout
                    </span>
                  </li>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;