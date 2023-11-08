import { BsLightningChargeFill, BsInstagram, BsFillTelephoneFill } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TbArrowBigRightFilled } from "react-icons/tb";
import { HiMail } from "react-icons/hi"

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempus, neque in feugiat scelerisque, elit magna semper nibh, nec vulputate magna sapien tincidunt diam. Fusce ac dui et augue vehic';

const Hero = () => {
  return (
    <div name="container" className='w-full h-full bg-neutral-950 flex flex-col md:flex-row items-center md:justify-between font-montserrat'>
        <div name="left-half" className='text-white m-8 md:m-16 flex flex-col items-start'>
            <div name="title" className='font-bold text-4xl md:text-6xl mb-3'>LOREM IPSUM</div>
            <div name="subtitle" className='font-thin md:text-xl mb-6'>{lorem}</div>
            <div name="tip-container" className='font-extralight bg-neutral-900 p-4 mb-16 text-sm rounded-lg text-neutral-400 flex flex-row items-center justify-between'>
                <div name="tip-icon" className='text-3xl pr-4 text-purple-400'><BsLightningChargeFill/></div>
                <div name="tip-text">{lorem}</div>
            </div>
        </div>
        <div name='right-half' className="text-white flex flex-col items-center justify-center md:m-8">
            <div className="flex items-center justify-center flex-col bg-neutral-900 p-4 rounded-2xl mb-10 px-6" >
                <div className="text-4xl font-bold mt-3 tracking-wide">ORDER</div>
                <div name='novi-sad' className="bg-neutral-800 w-72 h-24 my-6 rounded-3xl flex flex-col items-center justify-center tracking-wide">
                   <div className="m-5 font-bold text-2xl flex flex-row items-center justify-between"><FaMapMarkerAlt className="text-red-600 mr-2"/>NOVI SAD<TbArrowBigRightFilled className="ml-5"/></div>
                </div>
                <div name='beograd' className="bg-neutral-800 w-72 h-24 rounded-3xl flex flex-col items-center justify-center tracking-wide mb-5">
                   <div className="m-5 font-bold text-2xl flex flex-row items-center justify-between"><FaMapMarkerAlt className="text-red-600 mr-2"/>BEOGRAD<TbArrowBigRightFilled className="ml-5"/></div>
                </div>
            </div>
            <div className="flex items-center justify-center flex-col bg-neutral-900 p-4 rounded-2xl px-6 mb-12 md:mb-8">
                <div name="contact-title" className="text-4xl font-bold mb-6 mt-3 tracking-wide">CONTACT</div>
                <div name="instagram" className="bg-neutral-800 h-24 w-72 rounded-3xl flex-col items-center justify-center font-bold text-2xl tracking-wide mb-6">
                    <div className="flex flex-row items-center mt-4 ml-4"><BsInstagram className="text-3xl mr-2 text-pink-500"/>INSTAGRAM</div>
                    <div className="text-lg font-thin ml-4 mt-2">@zvucnici_iznajmljivanje</div></div>
                <div name="phone" className="bg-neutral-800 h-24 w-72 rounded-3xl flex-col items-center justify-center font-bold text-2xl tracking-wide mb-6">
                    <div className="flex flex-row items-center mt-4 ml-4"><BsFillTelephoneFill className="text-2xl mr-2 text-green-500"/>PHONE</div>
                    <div className="text-lg font-thin ml-4 mt-2">061 335599</div>
                    </div>
                <div name="mail" className="bg-neutral-800 h-24 w-72 rounded-3xl flex-col items-center justify-center font-bold text-2xl tracking-wide mb-6">
                    <div className="flex flex-row items-center mt-4 ml-4"><HiMail className="text-3xl mr-2 text-blue-500"/>MAIL</div>
                    <div className="text-lg font-thin ml-4 mt-2">djura@rentasound.com</div>
                </div>
            </div>
            </div>
        </div>
  )
}

export default Hero