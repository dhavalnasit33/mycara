// src/components/LoginForm.jsx
import Logo from "../assets/my_logo.png";
import LoginSlider from "../components/login/loginSlider";
import { FaPlay, FaTimes } from "react-icons/fa";
import SocialButtons from "../components/login/SocialButtons";
import Button from "../components/ui/Button";

const LoginForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center  mx-5">
      <div className="bg-white box-shadow  rounded-lg flex w-full overflow-hidden  w-full max-w-[1062px] mx-auto">
        
        <div className="w-1/3 md:flex items-center justify-center light-color hidden"   >
          <LoginSlider /> 
        </div>

        <div className="w-full md:w-2/3 px-5 py-16 relative  md:mx-0 md:px-20  ">
          <button className="absolute top-0 right-0  bg-color  text-2xl font-bold p-3">
           <FaTimes className="text-white "/>
          </button>

          <div className="mb-6 text-center ">
            <img  src={Logo} className="mx-auto mb-6"/>
            <p className="text-light text-[14px] mb-11">
              Women's wear collection/label/line The high street giant is launching a designer womenswear collection.
            </p>
            <h3 className="text-dark text-bold text-[26px]">Sign In</h3>
          </div>

          <form className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="User name"
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
                <button type="button" className="text-gray-500 text-[14px] hover:underline" >
                    <a href= "">Forgot password?</a>
                </button>
                <Button variant="common" className="!min-w-[185px] flex items-center justify-between">
                    Sign In
                    <FaPlay size={8} />
                </Button>
            </div>
          </form>
          <div className="mt-4  sm:mt-10 space-x-4">
            <SocialButtons/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
