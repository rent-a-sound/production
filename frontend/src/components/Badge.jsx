import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Link
      to="https://www.linkedin.com/in/nikola-dragomirovi%C4%87-374343299/"
      target="_blank"
      rel="noopener noreferrer"
      name="linkedin"
      className="animate-fade-down rounded-xl bg-neutral-900 p-4 text-center text-sm font-extralight text-neutral-400 outline outline-1 outline-neutral-700 animate-delay-500"
    >
      Developed by Nikola Dragomirović
    </Link>
  );
};

export default Footer;
