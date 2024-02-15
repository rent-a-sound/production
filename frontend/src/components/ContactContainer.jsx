import React from "react";
import { TbPhoneFilled } from "react-icons/tb";
import { HiMail } from "react-icons/hi";
import { RiInstagramFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const ContactContainer = () => {
  return (
    <div
      className={`mb-12 flex animate-fade-down flex-col items-center justify-center rounded-2xl p-4 px-6 outline outline-1 outline-neutral-700 duration-300 animate-delay-700 md:mb-0`}
    >
      <div
        name="contact-title"
        className="mb-6 mt-3 text-4xl font-bold tracking-wide"
      >
        KONTAKT
      </div>
      <Link
        to="https://www.instagram.com/zvucnici_iznajmljivanje"
        target="_blank"
        rel="noopener noreferrer"
        name="instagram"
        className="mb-6 h-24 w-72 animate-fade-down flex-col items-center justify-center rounded-3xl bg-neutral-900 text-2xl font-bold tracking-wide outline outline-1 outline-neutral-700 animate-delay-[800ms]"
      >
        <div className="ml-4 mt-4 flex flex-row items-center">
          <RiInstagramFill className="mr-2 text-2xl text-pink-500" />
          INSTAGRAM
        </div>
        <div className="ml-4 mt-2 text-lg font-thin">
          @zvucnici_iznajmljivanje
        </div>
      </Link>
      <a
        name="phone"
        href="tel:+381643478060"
        className="mb-6 h-24 w-72 animate-fade-down flex-col items-center justify-center rounded-3xl bg-neutral-900 text-2xl font-bold tracking-wide outline outline-1 outline-neutral-700 animate-delay-[900ms]"
      >
        <div className="ml-4 mt-4 flex flex-row items-center">
          <TbPhoneFilled className="mr-2 text-2xl text-green-500" />
          TELEFON
        </div>
        <div className="ml-4 mt-2 text-lg font-thin">+381 64 3478 060</div>
      </a>
      <a
        name="mail"
        href="mailto:zvucnici.i.ns@gmail.com"
        className="mb-6 h-24 w-72 animate-fade-down flex-col items-center justify-center rounded-3xl bg-neutral-900 text-2xl font-bold tracking-wide outline outline-1 outline-neutral-700 animate-delay-[1000ms]"
      >
        <div className="ml-4 mt-4 flex flex-row items-center">
          <HiMail className="mr-2 text-2xl text-blue-500" />
          MAIL
        </div>
        <div className="ml-4 mt-2 text-lg font-thin">
          zvucnici.i.ns@gmail.com
        </div>
      </a>
    </div>
  );
};

export default ContactContainer;
