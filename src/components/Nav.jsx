import { CgMusicSpeaker } from "react-icons/cg";

const Nav = () => {
  let Links = [
    { name: "ABOUT", link: "/" },
    { name: "ORDER", link: "/" },
    { name: "CONTACT", link: "/" },
  ];

  return (
    <div className="w-full sticky top-0 left-0 bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0 font-montserrat">
      <div className="flex flex-col items-center md:flex-row md:justify-between">
        <div className="font-bold p-1.5 pr-2 text-2xl mx-5 my-2 flex items-center text-white">
          <span className="mr-2 text-3xl text-purple-400">
            <CgMusicSpeaker />
          </span>
          RENT A SOUND
        </div>
        <ul className="flex flex-col items-center md:flex-row duration-500 pr-10">
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 text-base">
              <a href={link.link}  className="text-white hidden md:block hover:text-purple-400 duration-500 ">
              {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Nav;
