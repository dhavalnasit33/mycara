// src/components/LoginForm.jsx
import Logo from "../assets/my_logo.png";
import LoginSlider from "../components/login/loginSlider";
import { FaPlay, FaTimes } from "react-icons/fa";
import SocialButtons from "../components/login/SocialButtons";
import Button from "../components/ui/Button";



const RegistrationForm = ({onClose}) => {
  return (
    <div className="flex items-center justify-center ">
      <div className="bg-white box-shadow  rounded-lg flex w-full overflow-hidden  w-full max-w-[1062px] mx-auto">
        <div className="w-full md:w-2/3 px-5 py-16 relative  md:mx-0 md:px-20  ">
          <button className="absolute top-0 left-0  bg-color  text-2xl font-bold p-3"   onClick={onClose} >
           <FaTimes className="text-white "/>
          </button>

          <div className="mb-6 text-center ">
            <img  src={Logo} className="mx-auto mb-6"/>
            <p className="text-light text-[14px] mb-11">
              Women's wear collection/label/line The high street giant is launching a designer womenswear collection.
            </p>
            <h3 className="text-dark text-bold text-[26px]">Sign Up</h3>
          </div>

          <form className="space-y-4">
            <div className="flex flex-col mb-4">
                <input 
                    type="text" 
                    placeholder="Name" 
                    className="w-full border light-border rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
            </div>
            <div>
              <input
                type="text"
                placeholder="Email"
                className="w-full border light-border rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full border light-border rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm gap-4 w-full pt-[26px]">
                <Button variant="common" className="!min-w-[185px] flex items-center justify-between ">
                    Sign Up
                    <FaPlay size={8} />
                </Button>
            </div>
          </form>
          <div className="mt-4  sm:mt-10 space-x-4">
            <SocialButtons/>
          </div>
        </div>
        <div className="w-1/3 md:flex items-center justify-center light-color hidden"   >
          <LoginSlider /> 
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
