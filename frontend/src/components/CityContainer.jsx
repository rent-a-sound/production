import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TbArrowBigRightFilled } from "react-icons/tb";
import { Link } from "react-router-dom";

const CityContainer = () => {
  return (
    <div className="flex items-center justify-center flex-col outline-1 outline-neutral-700 outline p-4 rounded-2xl mb-10 px-6 animate-fade-down animate-delay-500">
      <div className="text-4xl font-bold mt-3 tracking-wide">KATALOG</div>
      <Link
        to={{
          pathname: "/katalog",
          search: "?city=ns",
        }}
        className="bg-neutral-900 outline-1 outline-neutral-700 animate-fade-down animate-delay-[600ms] outline w-72 h-24 my-6 rounded-3xl flex flex-col items-center justify-center tracking-wide"
      >
        <div className="m-5 font-bold text-2xl flex flex-row items-center justify-between">
          <FaMapMarkerAlt className="text-red-600 mr-2 animate-spinle2" />
          NOVI SAD
          <TbArrowBigRightFilled className="ml-5" />
        </div>
      </Link>
      <Link
        to={{
          pathname: "/katalog",
          search: "?city=bg",
        }}
        className="bg-neutral-900 w-72 h-24 outline-1 outline-neutral-700 animate-fade-down animate-delay-[700ms] outline rounded-3xl flex flex-col items-center justify-center tracking-wide mb-5"
      >
        <div className="m-5 font-bold text-2xl flex flex-row items-center justify-between">
          <FaMapMarkerAlt className="text-red-600 mr-2 animate-spinle1" />
          BEOGRAD
          <TbArrowBigRightFilled className="ml-5" />
        </div>
      </Link>
    </div>
  );
};

export default CityContainer;
