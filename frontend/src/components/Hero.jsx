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
      className="flex w-full flex-col items-center bg-neutral-950 font-montserrat md:h-screen md:flex-row md:items-start md:justify-between"
    >
      <div
        name="left-half"
        className={`m-8 -mb-10 flex flex-col items-center text-white duration-300 md:mx-36 md:mb-0`}
      >
        <div className="mb-8 mt-2 animate-fade-down rounded-2xl px-8 pb-8 outline outline-1 outline-neutral-700 md:mb-4 md:mt-10 md:px-10">
          <div
            name="title"
            className="mb-3 mt-10 animate-fade-down text-center text-4xl font-bold tracking-wide animate-delay-100 md:text-start md:text-6xl"
          >
            NARUČI ONLINE
          </div>
          <div
            name="subtitle"
            className="mb-6 animate-fade-down text-center text-lg font-thin animate-delay-200 md:text-start md:text-xl"
          >
            {subtitleText}
          </div>
          <div
            name="tip-container"
            className="text-md mb-5 flex animate-fade-down flex-row items-center justify-between rounded-2xl bg-neutral-900 p-4 pl-1 font-extralight text-neutral-400 outline outline-1 outline-neutral-700 animate-delay-300"
          >
            <div name="tip-icon" className="text-4xl text-purple-400">
              <BsExclamationLg />
            </div>
            <div name="tip-text">{tipText}</div>
          </div>
          <div className="flex w-full items-center justify-center md:items-start md:justify-start">
            <Badge />
          </div>
        </div>
        <Banner />
      </div>
      <div
        name="right-half"
        className="flex flex-col items-center justify-center text-white md:my-14 md:mr-32"
      >
        <CityContainer />
        <ContactContainer />
      </div>
    </div>
  );
};

export default Hero;
