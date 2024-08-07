import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import logo from "../assets/icon.png";
import { navLink } from "../data/dummy.js";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    const handlerScroll = () => {
      setIsScroll(window.scrollY > 0);
    };
    window.addEventListener("scroll", handlerScroll);
    return () => {
      window.removeEventListener("scroll", handlerScroll);
    };
  }, []);

  return (
    <div
      className={`${
        isScroll ? "bg-[#068FFF] h-[60px] lg:-top-[60px]" : "h-[80px]"
      } lg:px-[72px] px-5 w-full z-[10] fixed transition-all duration-300 ease-in-out flex justify-between items-center`}
    >
      <div className="w-[103px] h-[80px]">
        <img src={logo} alt="" className="w-full h-full object-contain" />
      </div>
      <ul className="hidden md:block">
        <li className="flex gap-5">
          {navLink.map((item) => (
            <Link
              key={item.id}
              to={item.id}
              className={`${
                isScroll ? "text-[14px]" : "text-[18px]"
              } hover:text-blue transition duration-300 ease-in-out hover:cursor-pointer`}
            >
              {item.name}
            </Link>
          ))}
        </li>
      </ul>
      <div className="flex items-center gap-x-3">
        {/* <button className="bg-blue text-white py-2 px-8 rounded-full outline-none">
          Sign In
        </button> */}
        <FiMenu
          size={24}
          className="block md:hidden"
          onClick={() => setNav((prev) => !prev)}
        />
      </div>
      <div
        className={`${
          nav ? "right-0" : "-right-full"
        } w-full md:w-[50%] bg-white h-screen absolute top-0 p-10 block md:hidden`}
      >
        <AiOutlineClose
          className="text-2xl mb-3"
          onClick={() => setNav((prev) => !prev)}
        />
        <ul>
          <li className="flex flex-col gap-5">
            {navLink.map((item) => (
              <Link
                key={item.id}
                to={item.id}
                className="text-[18px] py-2 hover:text-blue transition duration-300 ease-in-out border-b-2 z-[20]"
              >
                {item.name}
              </Link>
            ))}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
