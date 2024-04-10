import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiMenu } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState("FiMenu");
  const bookedTickets = useSelector((state) => state.bookTicket);

  const handleToggle = () => {
    setOpen(!open);
    setIcon(icon === "FiMenu" ? "IoCloseOutline" : "FiMenu");
  };

  const IconComponent = icon === "FiMenu" ? FiMenu : IoCloseOutline;
  return (
    <nav className="w-full text-black fixed top-0 left-0 font-['Neue_Montreal'] z-[5]">
      <div className="md:flex items-center justify-between bg-white/20 backdrop-blur-xl py-4 md:px-10 px-7">
        <div className="text-lg md:text-2xl cursor-pointer flex items-center ">
          <h1>BookYourShow</h1>
        </div>

        <div
          onClick={handleToggle}
          className="text-xl absolute right-6 top-4 cursor-pointer md:hidden"
        >
          <IconComponent />
        </div>

        <ul
          className={`gap-10 justify-center md:flex md:items-center md:pb-0 pb-12 md:pt-0 absolute md:static md:z-auto z-[10] left-0 w-full h-[30rem] md:h-full md:w-auto md:pl-0 pl-10 md:text-lg text-xl pt-10 transition-all duration-500 ease-in  ${
            open ? "top-20 " : "top-[-490px]"
          }`}
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/createticket">Stream</Link>
          </li>
          <li>
            <Link to="/bookedtickets">
              Bookings<sup className="bg-red-600 text-white h-2 w-2 px-[5px] rounded-full">{bookedTickets.length}</sup>
            </Link>
          </li>
          <li><Link to="/live">Live</Link></li>
        </ul>
        <div className="md:flex hidden items-center justify-center gap-5">
          <button>LOGIN/SIGNUP</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
