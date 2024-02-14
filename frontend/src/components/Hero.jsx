import { BsExclamationLg } from "react-icons/bs";
import ContactContainer from "./ContactContainer";
import CityContainer from "./CityContainer";
import Banner from "./Banner";
import Badge from "./Badge";

const subtitleText =
  "Iznajmljivanje JBL PartyBox zvučnika za nezaboravne trenutke u Novom Sadu i Beogradu. Vrhunski zvuk, jednostavno korišćenje i podrška za savršeno iskustvo. Rezervišite sada i uživajte u muzici!";

const tipText =
  "Nakon ispune forme za naručivanje bićete kontaktirani radi potvrde porudžbine, dogovora o tačnom vremenu i mestu preuzimanja i povrata, kao i dodatnim informacijama.";

const Hero = () => {
  return (
    <div
      name="container"
      className="w-full md:h-screen bg-neutral-950 flex flex-col md:flex-row items-center md:items-start md:justify-between font-montserrat"
    >
      <div
        name="left-half"
        className={`text-white m-8 -mb-10 md:mx-36 md:mb-0 flex flex-col items-center duration-300`}
      >
        <div className="outline outline-1 rounded-2xl outline-neutral-700 md:mt-10 pb-8 mt-2 mb-8 md:mb-4 px-8 md:px-10 animate-fade-down">
          <div
            name="title"
            className="font-bold text-4xl mt-10 text-center md:text-start md:text-6xl mb-3 tracking-wide animate-fade-down animate-delay-100"
          >
            NARUČI ONLINE
          </div>
          <div
            name="subtitle"
            className="font-thin text-center md:text-start text-lg md:text-xl mb-6 animate-fade-down animate-delay-200"
          >
            {subtitleText}
          </div>
          <div
            name="tip-container"
            className="font-extralight bg-neutral-900 p-4 pl-1 text-md mb-5 rounded-2xl outline-1 outline-neutral-700 outline text-neutral-400 flex flex-row items-center justify-between animate-fade-down animate-delay-300"
          >
            <div name="tip-icon" className="text-4xl text-purple-400">
              <BsExclamationLg />
            </div>
            <div name="tip-text">{tipText}</div>
          </div>
          <div className="w-full flex items-center md:items-start justify-center md:justify-start">
            <Badge />
          </div>
        </div>
        <Banner />
      </div>
      <div
        name="right-half"
        className="text-white flex flex-col items-center justify-center md:mr-32 md:my-14"
      >
        <CityContainer />
        <ContactContainer />
      </div>
    </div>
  );
};

export default Hero;
