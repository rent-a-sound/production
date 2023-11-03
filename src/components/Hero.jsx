import { BsLightningChargeFill } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TbArrowBigRightFilled } from "react-icons/tb";
import partyBox310 from '../public/party-box-310.png';

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempus, neque in feugiat scelerisque, elit magna semper nibh, nec vulputate magna sapien tincidunt diam. Fusce ac dui et augue vehic';

const Hero = () => {
  return (
    <div name="container" className='w-full h-screen bg-neutral-800 flex flex-col md:flex-row items-center justify-start md:justify-between font-montserrat'>
        <div name="left-half" className='text-white m-8 md:m-16 flex flex-col items-start'>
            <div name="title" className='font-bold text-4xl md:text-6xl mb-3'>LOREM IPSUM</div>
            <div name="subtitle" className='font-thin md:text-xl mb-5'>{lorem}</div>
            <div name="tip-container" className='font-extralight bg-neutral-900 p-4 mb-5 text-sm rounded-lg text-neutral-500 flex flex-row items-center justify-between'>
                <div name="tip-icon" className='text-3xl pr-4 text-purple-500'><BsLightningChargeFill/></div>
                <div name="tip-text">{lorem}</div>
            </div>
        </div>
            <div name='city-container' className="w-full flex flex-col md:justify-around items-center text-white">
                <div name='novi-sad' className="bg-neutral-900 w-72 h-24 m-5 rounded-3xl flex flex-col items-center justify-center border-2 border-purple-500">
                   <div className="m-5 font-bold text-2xl flex flex-row items-center justify-between"><FaMapMarkerAlt className="text-red-600 mr-1"/>NOVI SAD<TbArrowBigRightFilled className="ml-5"/></div>
                </div>
                <div name='beograd' className="bg-neutral-900 w-72 h-24 m-5 rounded-3xl flex flex-col items-center justify-center border-2 border-purple-500">
                   <div className="m-5 font-bold text-2xl flex flex-row items-center justify-between"><FaMapMarkerAlt className="text-red-600 mr-1"/>BEOGRAD<TbArrowBigRightFilled className="ml-5"/></div>
                </div>
            </div>
    </div>
  )
}

export default Hero