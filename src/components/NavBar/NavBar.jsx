import React from 'react';
import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './NavBar.css';
import {
  Navbar,
  Typography,
} from "@material-tailwind/react";

export default function NavBar({ user, setUser, setIsModalOpen }) {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navList = (
    <ul className="flex flex-col lg:flex-row lg:items-center lg:gap-6 text-white w-full">
      <Typography>
        Hello, {user.name}
      </Typography>
      <li className="block py-2 pl-3 pr-4 text-gray-300 rounded hover:bg-gray-700">
        <Link to='/home'>Home</Link>
      </li>
      <li className="block py-2 pl-3 pr-4 text-gray-300 rounded hover:bg-gray-700">
        <Link to='/account'>Account</Link>
      </li>
    </ul>
  );

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className="block py-4 px-8 shadow-md bg-[#2e2d2d] fixed z-20 top-0 left-0 border-b border-gray-600 text-white w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Typography
            as="a"
            href="#"
            className="flex items-center justify-between pl-2 self-center text-2xl font-semibold whitespace-nowrap"
          >
            NetLinx
          </Typography>
          <button
            className="flex items-center text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={() => setIsModalOpen(true)}
          >
            +
          </button>
          <button
            className="hidden lg:flex items-center text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5"
            type="button"
            onClick={handleLogOut}
          >
            Log Out
          </button>
        </div>

        <div className="hidden lg:flex lg:items-center">{navList}</div>

        <div className="flex items-center lg:hidden">
          <button onClick={() => setOpenNav(!openNav)} className="text-white focus:outline-none">
            {/* Hamburger Icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdown Menu for Mobile */}
      <div className={`lg:hidden ${openNav ? 'block' : 'hidden'} mt-2 text-center`}>
        {navList}
        <button
          className="flex items-center justify-center text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
          type="button"
          onClick={handleLogOut}
        >
          Log Out
        </button>
      </div>
    </nav>
  );
}
