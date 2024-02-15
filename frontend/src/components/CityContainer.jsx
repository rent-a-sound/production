import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TbArrowBigRightFilled } from "react-icons/tb";
import { Link } from "react-router-dom";

const CityContainer = () => {
  return (
    <div className="mb-10 flex animate-fade-down flex-col items-center justify-center rounded-2xl p-4 px-6 outline outline-1 outline-neutral-700 animate-delay-500">
      <div className="mt-3 text-4xl font-bold tracking-wide">KATALOG</div>
      <Link
        to={"/katalog/ns"}
        className="my-6 flex h-24 w-72 animate-fade-down flex-col items-center justify-center rounded-3xl bg-neutral-900 tracking-wide outline outline-1 outline-neutral-700 animate-delay-[600ms]"
      >
        <div className="m-5 flex flex-row items-center justify-between text-2xl font-bold">
          <FaMapMarkerAlt className="mr-2 animate-spinle2 text-red-600" />
          NOVI SAD
          <TbArrowBigRightFilled className="ml-5" />
        </div>
      </Link>
      <Link
        to={"/katalog/bg"}
        className="mb-5 flex h-24 w-72 animate-fade-down flex-col items-center justify-center rounded-3xl bg-neutral-900 tracking-wide outline outline-1 outline-neutral-700 animate-delay-[700ms]"
      >
        <div className="m-5 flex flex-row items-center justify-between text-2xl font-bold">
          <FaMapMarkerAlt className="mr-2 animate-spinle1 text-red-600" />
          BEOGRAD
          <TbArrowBigRightFilled className="ml-5" />
        </div>
      </Link>
    </div>
  );
};

export default CityContainer;
