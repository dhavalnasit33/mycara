// src/components/LoginForm.jsx
import Logo from "../assets/my_logo.png";
import LoginSlider from "../components/login/loginSlider";
import { FaPlay } from "react-icons/fa";
import SocialButtons from "../components/login/SocialButtons";
import Button from "../components/ui/Button";
import { X } from "lucide-react";
import { loginUser } from "../features/auth/authThunk";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const LoginForm = ({onClose, onSwitch}) => {
   const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser(formData));
    if (res.meta.requestStatus === "fulfilled") {
      alert("Login successful!");
      onClose();
    }
  };
  return (
    <div className="flex items-center justify-center ">
      <div className="bg-white box-shadow  rounded-lg flex w-full overflow-hidden  w-full max-w-[1062px] mx-auto ">
        
        <div className="w-1/3 md:flex items-center justify-center light-color hidden"   >
          <LoginSlider /> 
        </div>

        <div className="w-full md:w-2/3 px-5 py-16 relative  md:mx-0 md:px-20  ">
          <button  onClick={onClose}  className="absolute top-0 right-0  bg-color p-[8px]">
           <X className="text-white " size={20}/>
          </button>

          <div className="mb-6 text-center ">
            <img  src={Logo} className="mx-auto mb-6"/>
            <p className="text-light text-[14px] mb-11">
              Women's wear collection/label/line The high street giant is launching a designer womenswear collection.
            </p>
            <h3 className="text-dark text-bold text-[26px]">Sign In</h3>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit} >
            <div>
              <input
                type="email"
                name="email"
                placeholder="Username"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border light-border rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border light-border rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center text-sm gap-4 w-full pt-[26px]">
                <button type="button" className="text-gray-500 text-[14px] hover:underline" >
                    <a href= "">Forgot password?</a>
                </button>
                <Button type="submit"   disabled={loading} variant="common" className="!min-w-[185px] flex items-center justify-between">
                    {loading ? "Signning in..." : "Sign In"}
                    <FaPlay size={8} />
                     
                </Button>
            </div>
           
          </form>
           
          <div className="mt-4  sm:mt-10 space-x-4">
            <SocialButtons/>
          </div>
          <div className="text-center mt-[40px] text-p">
              <button
                onClick={onSwitch}
                className="text-theme underline"
              >
                Create Account
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

// const LoginForm = ({ onClose, onSwitch }) => {
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.auth);
//   const [formData, setFormData] = useState({ email: "", password: "" });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await dispatch(loginUser(formData));
//     if (res.meta.requestStatus === "fulfilled") {
//       alert("Login successful!");
//       onClose();
//     }
//   };

//   return (
//     <div className="bg-white p-8 rounded-lg w-[400px] relative">
//       <button
//         onClick={onClose}
//         className="absolute top-2 right-2 text-gray-500 text-lg"
//       >
//         ✕
//       </button>
//       <h2 className="text-xl font-semibold mb-6 text-center">Login</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           className="border w-full p-2 rounded"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//           className="border w-full p-2 rounded"
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white p-2 rounded"
//           disabled={loading}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//       <p className="text-center mt-4 text-sm">
//         Don’t have an account?{" "}
//         <button
//           onClick={onSwitch}
//           className="text-blue-600 underline"
//         >
//           Create Account
//         </button>
//       </p>
//     </div>
//   );
// };

// export default LoginForm;
