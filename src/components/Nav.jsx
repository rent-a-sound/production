import { CgMusicSpeaker } from "react-icons/cg";

const Nav = () => {
  return (
    <div className="w-full top-0 left-0 bg-transparent font-montserrat">
      <div className="w-full flex flex-col items-center font-montserrat">
        <div className="font-bold p-1.5 pr-2 text-3xl mt-8 mb-10 flex items-center text-white tracking-wide">
          RENT
          <CgMusicSpeaker className="text-4xl mx-2 text-purple-400" />
          SOUND
        </div>
      </div>
    </div>
  );
};

export default Nav;
