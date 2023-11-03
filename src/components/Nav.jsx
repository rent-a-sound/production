import { CgMusicSpeaker } from "react-icons/cg";

const Nav = () => {
  let Links = [
    { name: "ABOUT", link: "/" },
    { name: "ORDER", link: "/" },
  ];

  return (
    <div className="w-full top-0 left-0 bg-transparent font-montserrat">
      <div className="w-full flex flex-col items-center font-montserrat">
        <div className="font-bold p-1.5 pr-2 text-2xl mx-5 my-2 flex items-center text-white">
          <CgMusicSpeaker className="mr-2 text-3xl text-purple-400"/>
          RENT A SOUND
        </div>
      </div>
    </div>
  );
};

export default Nav;
