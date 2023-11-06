import { BsLightningChargeFill, BsInstagram, BsFillTelephoneFill } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TbArrowBigRightFilled } from "react-icons/tb";
import { HiMail } from "react-icons/hi"

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempus, neque in feugiat scelerisque, elit magna semper nibh, nec vulputate magna sapien tincidunt diam. Fusce ac dui et augue vehic';

const Hero = () => {
  return (
    <div name="container" className='w-full h-full bg-neutral-800 flex flex-col md:flex-row items-start justify-start md:justify-between font-montserrat'>
        <div name="left-half" className='text-white m-8 md:m-16 flex flex-col items-start'>
            <div name="title" className='font-bold text-4xl md:text-6xl mb-3'>LOREM IPSUM</div>
            <div name="subtitle" className='font-thin md:text-xl mb-5'>{lorem}</div>
            <div name="tip-container" className='font-extralight bg-neutral-900 p-4 mb-16 text-sm rounded-lg text-neutral-500 flex flex-row items-center justify-between'>
                <div name="tip-icon" className='text-3xl pr-4 text-purple-500'><BsLightningChargeFill/></div>
                <div name="tip-text">{lorem}</div>
            </div>
            <div name="contact-title" className="text-4xl font-bold mb-3">CONTACT</div>
            <div name="contact-container" className="flex flex-col justify-center items-start">
                <div name="instagram" className="bg-neutral-900 h-24 w-80 md:w-96 rounded-3xl flex-col items-center justify-center font-bold text-2xl tracking-wide mb-3">
                <div className="flex flex-row items-center mt-4 ml-5"><BsInstagram className="text-3xl mr-2 text-pink-500"/>INSTAGRAM</div>
                <div className="text-xl font-thin ml-5 mt-2">@zvucnici_iznajmljivanje</div></div>
                <div name="phone" className="bg-neutral-900 h-24 w-80 md:w-96 rounded-3xl flex-col items-center justify-center font-bold text-2xl tracking-wide mb-3">
                <div className="flex flex-row items-center mt-4 ml-5"><BsFillTelephoneFill className="text-2xl mr-2 text-green-500"/>PHONE</div>
                <div className="text-xl font-thin ml-5 mt-2">061/335599</div></div>
                <div name="mail" className="bg-neutral-900 h-24 w-80 md:w-96 rounded-3xl flex-col items-center justify-center font-bold text-2xl tracking-wide">
                <div className="flex flex-row items-center mt-4 ml-5"><HiMail className="text-3xl mr-2 text-blue-500"/>MAIL</div>
                <div className="text-xl font-thin ml-5 mt-2">djura@rentasound.com</div></div>
            </div>
        </div>
            <div name='city-container' className="w-full flex flex-col md:mt-16 md:justify-around items-center text-white mb-10">
                <div name='novi-sad' className="bg-neutral-900 w-72 h-24 m-5 rounded-3xl flex flex-col items-center justify-center border-purple-500 tracking-wide">
                   <div className="m-5 font-bold text-2xl flex flex-row items-center justify-between"><FaMapMarkerAlt className="text-red-600 mr-2"/>NOVI SAD<TbArrowBigRightFilled className="ml-5"/></div>
                </div>
                <div name='beograd' className="bg-neutral-900 w-72 h-24 m-5 rounded-3xl flex flex-col items-center justify-center tracking-wide">
                   <div className="m-5 font-bold text-2xl flex flex-row items-center justify-between"><FaMapMarkerAlt className="text-red-600 mr-2"/>BEOGRAD<TbArrowBigRightFilled className="ml-5"/></div>
                </div>
            </div>
    </div>
  )
}

export default Hero