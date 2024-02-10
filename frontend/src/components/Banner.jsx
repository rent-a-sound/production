import React from "react";
import partybox110 from "../public/110.webp";
import partybox310f from "../public/310.webp";
import partybox310s from "../public/310.png";
import partybox710 from "../public/710.webp";

const Banner = () => {
  return (
    <div
      name="banner-container"
      className="grid grid-cols-1 grid-rows-1 mb-12 lg:mb-0 mr-3 lg:mr-32 relative"
    >
      <img
        src={partybox110}
        className={`absolute top-20 left-48 lg:top-24 lg:left-72 max-h-48 lg:max-h-72 animate-nilemation`}
      />
      <img
        style={{ animationDelay: `200ms` }}
        src={partybox310f}
        className={`absolute max-h-72 lg:max-h-96 left-16 lg:left-32 top-2 lg:top-5 animate-nilemation`}
      />
      <img
        style={{ animationDelay: `100ms` }}
        src={partybox310s}
        className={`absolute max-h-72 lg:max-h-96 right-28 lg:right-28 animate-nilemation`}
      />
      <img
        style={{ animationDelay: `300ms` }}
        src={partybox710}
        className={`max-h-72 lg:max-h-96 mr-12 -ml-6 lg:ml-0 lg:mr-6 mt-12 z-0 lg:mt-16 animate-nilemation`}
      />
    </div>
  );
};

export default Banner;
