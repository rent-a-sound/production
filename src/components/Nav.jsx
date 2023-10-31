import React, { useState } from "react";
import { BsSoundwave } from "react-icons/bs";

const Nav = () => {
  let Links = [
    { name: "ABOUT", link: "/" },
    { name: "ORDER", link: "/" },
    { name: "CONTACT", link: "/" },
  ];

  const [showLinks, setShowLinks] = useState(true);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="flex flex-col items-center md:flex-row md:justify-between bg-white py-2 md:px-10 px-7">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center font-mono text-gray-800"
          onClick={toggleLinks}
        >
          <span className="text-3xl text-indigo-600 mr-3">
            <BsSoundwave />
          </span>
          Rent a Sound
        </div>
        <ul className="flex flex-col items-center md:flex-row">
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl">
              <a
                href={link.link}
                className={`text-black ${
                  showLinks ? "block" : "hidden"
                } hover:text-gray-400 duration-500`}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Nav;
