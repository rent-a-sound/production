import React from "react";
import { TbPhoneFilled } from "react-icons/tb";
import { HiMail } from "react-icons/hi";
import { RiInstagramFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const ContactContainer = () => {
  return (
    <div
      className={`flex items-center animate-fade-down animate-delay-700 justify-center flex-col p-4 rounded-2xl mb-12 md:mb-0 px-6 duration-300 outline-1 outline-neutral-700 outline`}
    >
      <div
        name="contact-title"
        className="text-4xl font-bold mb-6 mt-3 tracking-wide"
      >
        KONTAKT
      </div>
      <Link
        to="https://www.instagram.com/zvucnici_iznajmljivanje"
        target="_blank"
        rel="noopener noreferrer"
        name="instagram"
        className="bg-neutral-900 outline-1 outline-neutral-700 outline animate-fade-down animate-delay-[800ms] h-24 w-72 rounded-3xl flex-col items-center justify-center font-bold text-2xl tracking-wide mb-6"
      >
        <div className="flex flex-row items-center mt-4 ml-4">
          <RiInstagramFill className="text-2xl mr-2 text-pink-500" />
          INSTAGRAM
        </div>
        <div className="text-lg font-thin ml-4 mt-2">
          @zvucnici_iznajmljivanje
        </div>
      </Link>
      <a
        name="phone"
        href="tel:+381643478060"
        className="bg-neutral-900 outline-1 outline-neutral-700 animate-fade-down animate-delay-[900ms] outline h-24 w-72 rounded-3xl flex-col items-center justify-center font-bold text-2xl tracking-wide mb-6"
      >
        <div className="flex flex-row items-center mt-4 ml-4">
          <TbPhoneFilled className="text-2xl mr-2 text-green-500" />
          TELEFON
        </div>
        <div className="text-lg font-thin ml-4 mt-2">+381 64 3478 060</div>
      </a>
      <a
        name="mail"
        href="mailto:zvucnici.i.ns@gmail.com"
        className="bg-neutral-900 outline-1 outline-neutral-700 outline h-24 w-72 rounded-3xl animate-fade-down animate-delay-[1000ms] flex-col items-center justify-center font-bold text-2xl tracking-wide mb-6"
      >
        <div className="flex flex-row items-center mt-4 ml-4">
          <HiMail className="text-2xl mr-2 text-blue-500" />
          MAIL
        </div>
        <div className="text-lg font-thin ml-4 mt-2">
          zvucnici.i.ns@gmail.com
        </div>
      </a>
    </div>
  );
};

export default ContactContainer;
