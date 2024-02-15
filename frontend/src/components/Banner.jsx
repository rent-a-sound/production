import React from "react";
import partybox110 from "../public/110.webp";
import partybox310f from "../public/310.webp";
import partybox310s from "../public/310.png";
import partybox710 from "../public/710.webp";

const Banner = () => {
  return (
    <div
      name="banner-container"
      className="relative mb-12 mr-3 grid grid-cols-1 grid-rows-1 lg:mb-0 lg:mr-32"
    >
      <img
        src={partybox110}
        className={`absolute left-48 top-20 max-h-48 animate-nilemation lg:left-72 lg:top-24 lg:max-h-72`}
      />
      <img
        style={{ animationDelay: `200ms` }}
        src={partybox310f}
        className={`absolute left-16 top-2 max-h-72 animate-nilemation lg:left-32 lg:top-5 lg:max-h-96`}
      />
      <img
        style={{ animationDelay: `100ms` }}
        src={partybox310s}
        className={`absolute right-28 max-h-72 animate-nilemation lg:right-28 lg:max-h-96`}
      />
      <img
        style={{ animationDelay: `300ms` }}
        src={partybox710}
        className={`z-0 -ml-6 mr-12 mt-12 max-h-72 animate-nilemation lg:ml-0 lg:mr-6 lg:mt-16 lg:max-h-96`}
      />
    </div>
  );
};

export default Banner;
