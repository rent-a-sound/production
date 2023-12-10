import { BsLightningChargeFill } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TbArrowBigRightFilled } from "react-icons/tb";
import { CgMusicSpeaker } from "react-icons/cg";
import { TbPhoneFilled } from "react-icons/tb";
import { HiMail } from "react-icons/hi";
import partybox110 from "../public/110.webp";
import partybox310f from "../public/310.webp";
import partybox310s from "../public/310.png";
import partybox710 from "../public/710.webp";
import { useState, useEffect } from "react";

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempus, neque in feugiat scelerisque, elit magna semper nibh, nec vulputate magna sapien tincidunt diam. Fusce ac dui et augue vehic";

const Hero = () => {
  const [isAnimating, setIsAnimating] = useState(true);

  const handleClick = () => {
    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
    }, 2300);
  };

  const [isTranslated, setIsTranslated] = useState(false);

  const translate = () => {
    setIsTranslated(!isTranslated);
  };

  return (
    <div
      name="container"
      className="w-full md:h-screen overflow-hidden bg-neutral-950 flex flex-col md:flex-row items-center md:items-start md:justify-between font-montserrat"
    >
      <div
        name="left-half"
        className={`text-white m-8 -mb-10 md:mx-36 md:mb-0 flex flex-col items-center ${
          isTranslated ? "opacity-0" : "opacity-100"
        } duration-300`}
      >
        <div className="w-full font-bold p-1.5 pr-2 text-3xl my-8 flex items-center text-white tracking-wide">
          RENT
          <CgMusicSpeaker className="text-4xl mx-2 text-purple-400" />
          SOUND
        </div>
        <div>
          <div name="title" className="font-bold text-4xl md:text-6xl mb-3">
            LOREM IPSUM
          </div>
          <div name="subtitle" className="font-thin md:text-xl mb-6">
            {lorem}
          </div>
          <div
            name="tip-container"
            className="font-extralight bg-neutral-900 p-4 mb-16 text-sm rounded-lg text-neutral-400 flex flex-row items-center justify-between"
          >
            <div name="tip-icon" className="text-3xl pr-4 text-purple-400">
              <BsLightningChargeFill />
            </div>
            <div name="tip-text">{lorem}</div>
          </div>
        </div>
        <div
          name="banner-container"
          onClick={handleClick}
          className="grid grid-cols-1 grid-rows-1 mb-12 lg:mb-0 mr-3 lg:mr-32 lg:mt-12 relative -mt-8"
        >
          <img
            src={partybox110}
            className={`absolute top-20 left-48 lg:top-24 lg:left-72 max-h-48 lg:max-h-72 ${
              isAnimating ? "animate-nilemation1" : ""
            }`}
          />
          <img
            src={partybox310f}
            className={`absolute max-h-72 lg:max-h-96 left-16 lg:left-32 top-2 lg:top-5 ${
              isAnimating ? "animate-nilemation2" : ""
            }`}
          />
          <img
            src={partybox310s}
            className={`absolute max-h-72 lg:max-h-96 right-28 lg:right-28 ${
              isAnimating ? "animate-nilemation3" : ""
            }`}
          />
          <img
            src={partybox710}
            className={`max-h-72 lg:max-h-96 mr-12 -ml-6 lg:ml-0 lg:mr-6 mt-12 z-0 lg:mt-16 ${
              isAnimating ? "animate-nilemation4" : ""
            }`}
          />
        </div>
      </div>
      <div
        name="right-half"
        className="text-white flex flex-col items-center justify-center md:mx-16 md:my-14"
      >
        <div className="flex items-center justify-center flex-col bg-neutral-900 p-4 rounded-2xl mb-10 px-6">
          <div className="text-4xl font-bold mt-3 tracking-wide">KATALOG</div>
          <div
            onClick={translate}
            name="novi-sad"
            className="bg-neutral-800 w-72 h-24 my-6 rounded-3xl flex flex-col items-center justify-center tracking-wide"
          >
            <div className="m-5 font-bold text-2xl flex flex-row items-center justify-between">
              <FaMapMarkerAlt className="text-red-600 mr-2 animate-spinle2" />
              NOVI SAD
              <TbArrowBigRightFilled className="ml-5" />
            </div>
          </div>
          <div
            name="beograd"
            className="bg-neutral-800 w-72 h-24 rounded-3xl flex flex-col items-center justify-center tracking-wide mb-5"
          >
            <div className="m-5 font-bold text-2xl flex flex-row items-center justify-between">
              <FaMapMarkerAlt className="text-red-600 mr-2 animate-spinle1" />
              BEOGRAD
              <TbArrowBigRightFilled className="ml-5" />
            </div>
          </div>
        </div>
        <div
          className={`flex items-center justify-center flex-col bg-neutral-900 p-4 rounded-2xl px-6 mb-12 ${
            isTranslated ? "opacity-0" : "opacity-100"
          } duration-300`}
        >
          <div
            name="contact-title"
            className="text-4xl font-bold mb-6 mt-3 tracking-wide"
          >
            KONTAKT
          </div>
          <div
            name="instagram"
            className="bg-neutral-800 h-24 w-72 rounded-3xl flex-col items-center justify-center font-bold text-2xl tracking-wide mb-6"
          >
            <div className="flex flex-row items-center mt-4 ml-4">
              <RiInstagramFill className="text-2xl mr-2 text-pink-500" />
              INSTAGRAM
            </div>
            <div className="text-lg font-thin ml-4 mt-2">
              @zvucnici_iznajmljivanje
            </div>
          </div>
          <div
            name="phone"
            className="bg-neutral-800 h-24 w-72 rounded-3xl flex-col items-center justify-center font-bold text-2xl tracking-wide mb-6"
          >
            <div className="flex flex-row items-center mt-4 ml-4">
              <TbPhoneFilled className="text-2xl mr-2 text-green-500" />
              TELEFON
            </div>
            <div className="text-lg font-thin ml-4 mt-2">061 335599</div>
          </div>
          <div
            name="mail"
            className="bg-neutral-800 h-24 w-72 rounded-3xl flex-col items-center justify-center font-bold text-2xl tracking-wide mb-6"
          >
            <div className="flex flex-row items-center mt-4 ml-4">
              <HiMail className="text-2xl mr-2 text-blue-500" />
              MAIL
            </div>
            <div className="text-lg font-thin ml-4 mt-2">
              djura@rentasound.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
