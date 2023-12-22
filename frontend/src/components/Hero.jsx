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
import { Link } from "react-router-dom";
import Footer from "./Footer";

const lorem1 =
  "Iznajmljivanje JBL PartyBox zvučnika za nezaboravne trenutke u Novom Sadu i Beogradu. Vrhunski zvuk, jednostavno korišćenje i podrška za savršeno iskustvo. Rezervišite sada i uživajte u muzici!";

const lorem2 =
  "Nakon ispune forme za naručivanje bićete kontaktirani radi potvrde porudžbine, dogovora o tačnom vremenu i mestu preuzimanja i povrata, kao i dodatnim informacijama.";

const Hero = () => {
  return (
    <div
      name="container"
      className="w-full md:h-screen overflow-hidden md:overflow-scroll bg-neutral-950 flex flex-col md:flex-row items-center md:items-start md:justify-between font-montserrat"
    >
      <div
        name="left-half"
        className={`text-white m-8 -mb-10 md:mx-36 md:mb-0 flex flex-col items-center duration-300`}
      >
        <div>
          <div className="w-full md:w-fit font-bold p-4 text-3xl my-6 flex items-center justify-center text-white tracking-wide animate-fade-down bg-gradient-to-b from-neutral-900 outline-1 outline-neutral-500 outline rounded-md">
            RENT <CgMusicSpeaker className="mx-2 text-4xl text-purple-400" />{" "}
            SOUND
          </div>
          <div
            name="title"
            className="font-bold text-4xl text-center md:text-start md:text-6xl mb-3 tracking-wide animate-fade-down animate-delay-100"
          >
            NARUČI ONLINE
          </div>
          <div
            name="subtitle"
            className="font-thin text-center md:text-start md:text-xl mb-6 animate-fade-down animate-delay-200"
          >
            {lorem1}
          </div>
          <div
            name="tip-container"
            className="font-extralight bg-gradient-to-b from-neutral-900 to-neutral-950 p-4 text-sm mb-6 rounded-lg outline-1 outline-neutral-500 outline text-neutral-400 flex flex-row items-center justify-between animate-fade-down animate-delay-300"
          >
            <div name="tip-icon" className="text-3xl pr-4 text-purple-400">
              <BsLightningChargeFill />
            </div>
            <div name="tip-text">{lorem2}</div>
          </div>
        </div>
        <div className="w-full flex items-center md:items-start justify-center md:justify-start mb-16">
          <Footer />
        </div>
        <div
          name="banner-container"
          className="grid grid-cols-1 grid-rows-1 mb-12 lg:mb-0 mr-3 lg:mr-32 relative -mt-8"
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
      </div>
      <div
        name="right-half"
        className="text-white flex flex-col items-center justify-center md:mr-32 md:my-14"
      >
        <div className="flex items-center justify-center flex-col bg-gradient-to-b from-neutral-900 outline-1 outline-neutral-500 outline p-4 rounded-2xl mb-10 px-6 animate-fade-down animate-delay-500">
          <div className="text-4xl font-bold mt-3 tracking-wide">KATALOG</div>
          <Link
            to="/katalog/ns"
            name="novi-sad"
            className="bg-gradient-to-b shadow-[0_0_10px_black] from-neutral-800 to-neutral-900 outline-1 outline-neutral-500 animate-fade-down animate-delay-[600ms] outline w-72 h-24 my-6 rounded-3xl flex flex-col items-center justify-center tracking-wide"
          >
            <div className="m-5 font-bold text-2xl flex flex-row items-center justify-between">
              <FaMapMarkerAlt className="text-red-600 mr-2 animate-spinle2" />
              NOVI SAD
              <TbArrowBigRightFilled className="ml-5" />
            </div>
          </Link>
          <Link
            to="/katalog/bg"
            name="beograd"
            className="bg-gradient-to-b shadow-[0_0_10px_black] from-neutral-800 to-neutral-900 w-72 h-24 outline-1 outline-neutral-500 animate-fade-down animate-delay-[700ms] outline rounded-3xl flex flex-col items-center justify-center tracking-wide mb-5"
          >
            <div className="m-5 font-bold text-2xl flex flex-row items-center justify-between">
              <FaMapMarkerAlt className="text-red-600 mr-2 animate-spinle1" />
              BEOGRAD
              <TbArrowBigRightFilled className="ml-5" />
            </div>
          </Link>
        </div>
        <div
          className={`flex items-center animate-fade-down animate-delay-700 justify-center flex-col bg-gradient-to-b from-neutral-900 p-4 rounded-2xl mb-12 md:mb-0 px-6 duration-300 outline-1 outline-neutral-500 outline`}
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
            className="bg-gradient-to-b shadow-[0_0_10px_black] outline-1 outline-neutral-500 outline from-neutral-800 animate-fade-down animate-delay-[800ms] to-neutral-900 h-24 w-72 rounded-3xl flex-col items-center justify-center font-bold text-2xl tracking-wide mb-6"
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
            className="bg-gradient-to-b shadow-[0_0_10px_black] from-neutral-800 to-neutral-900 outline-1 outline-neutral-500 animate-fade-down animate-delay-[900ms] outline h-24 w-72 rounded-3xl flex-col items-center justify-center font-bold text-2xl tracking-wide mb-6"
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
            className="bg-gradient-to-b shadow-[0_0_10px_black] from-neutral-800 to-neutral-900 outline-1 outline-neutral-500 outline h-24 w-72 rounded-3xl animate-fade-down animate-delay-[1000ms] flex-col items-center justify-center font-bold text-2xl tracking-wide mb-6"
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
      </div>
    </div>
  );
};

export default Hero;
