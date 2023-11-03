import { BsLightningChargeFill } from "react-icons/bs";

const Hero = () => {
  return (
    <div name="container" className='w-full h-screen md:-mt-16 bg-neutral-800 flex flex-col md:flex-row items-center justify-around md:justify-between font-montserrat'>
        <div name="left-half" className='text-white m-8 md:m-16 flex flex-col items-start justify-around'>
            <div name="title" className='font-bold text-4xl md:text-6xl mb-3'>LOREM IPSUM</div>
            <div name="subtitle" className='font-thin md:text-xl mb-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempus, neque in feugiat scelerisque, elit magna semper nibh, nec vulputate magna sapien tincidunt diam. Fusce ac dui et augue vehic</div>
            <div name="tip-container" className='font-extralight bg-neutral-900 p-4 text-sm rounded-lg text-neutral-500 flex flex-row items-center justify-between'>
                <div name="tip-icon" className='text-3xl pr-4'><BsLightningChargeFill/></div>
                <div name="tip-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempus, neque in feugiat scelerisque, elit magna semper nibh, nec vulputate magna sapien tincidunt diam. Fusce ac dui et augue vehice </div>
            </div>
        </div>
        <div>
            <div>LOREM</div>
            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempus, neque in feugiat scelerisque, elit magna semper nibh, nec vulputate magna sapien tincidunt diam. Fusce ac dui et augue vehic</div>
        </div>
    </div>
  )
}

export default Hero