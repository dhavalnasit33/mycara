import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaUser,
} from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faGift,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import {
  ChevronDown,
  Contact,
  HandCoins,
  Heart,
  Menu,
  Package,
  SearchX,
  XCircleIcon,
} from "lucide-react";

import ShopIcon from "../icons/shop";
import CollectionsIcon from "../icons/Collections";
import HeaderLogo from "../../assets/logo.png";
import bannerImg from "../../assets/banner.png";
import banner1 from "../../assets/banner1.png";
import WhiteLogin from "../../assets/white login.png";
import SvgComponent from "../icons/login";

import { useDispatch, useSelector } from "react-redux";
import { fetchNavbar } from "../../features/navbar/navbarThunk";
import { logout } from "../../features/auth/authSlice";

import Button from "../ui/Button";
import Row from "../ui/Row";
import LoginForm from "../../pages/Login";
import RegistrationForm from "../../pages/RegistrationForm";
import { clearCart } from "../../features/cart/cartSlice";
import useProtectedLink from "../../hooks/useProtectedLink";

const staticNavItems = [
  { name: "Home", path: "/home", icon: <ShopIcon className="w-5 h-6 hidden custom-lg:block" /> },
  { name: "Shop", path: "/shop", icon: <ShopIcon className="w-5 h-6" /> },
  {
    name: "Collections",
    path: "/collections",
    icon: <CollectionsIcon className="w-5 h-5" />,
    hasDropdown: true,
    dropdownIcon: <ChevronDown className="w-4 h-4 ml-1 inline-block" />,
  },
  { name: "Offers", path: "/offer", icon: <HandCoins className="w-5 h-5" /> },
  { name: "About", path: "/about", icon: <SearchX className="w-5 h-5" /> },
  { name: "Contact", path: "/contact-us", icon: <Contact className="w-5 h-5" /> },
];

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { navbars = [] } = useSelector((state) => state.navbar);
  const { token, user } = useSelector((state) => state.auth);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

const cart = useSelector((state) => state.cart.cart);
const wishlist = useSelector((state) => state.wishlist.items);

const cartCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
const wishlistCount = wishlist?.length || 0;


  useEffect(() => {
    dispatch(fetchNavbar());
  }, [dispatch]);

  const navItems = navbars.length
    ? navbars.map((item) => ({
        name: item.label,
        path: item.url,
        icon: item.icon ? (
          <img
            src={`${process.env.REACT_APP_API_URL_IMAGE}${item.icon}`}
            alt={item.label}
            className="w-5 h-5 object-contain"
          />
        ) : null,
      }))
    : staticNavItems;

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart()); 
    navigate("/shop");
    alert("Logged out successfully!");
  };

  const openProtectedLink = useProtectedLink(setIsLoginOpen, token);

  return (
    <header className="w-full mb-[5px] md:mb-[10px] sec-theme box-shadow">
      <Row className="h-[70px] custom-lg:h-[100px] flex items-center justify-between gap-[10px]">
        {/* ===== Mobile Menu Button ===== */}
        <button
          className="custom-lg:hidden text-light transition-colors duration-300 border rounded-[3px] p-[5px] border-[#D2AF9F]"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={20} />
        </button>

        {/* ===== Logo ===== */}
        <div className="flex items-center">
          <Link to="/home">
            <img src={HeaderLogo} alt="Logo" className="h-10 custom-lg:h-14" />
          </Link>
        </div>

        {/* ===== Navbar ===== */}
        <div className="hidden custom-lg:flex items-center gap-6">
          <nav>
            <ul className="flex gap-[24px] xl:gap-[32px] text-base font-normal">
              {navItems.map((item, i) => (
                <li key={i} className="relative group">
                  <NavLink
                    to={item.path}
                      className={({ isActive }) => `relative cursor-pointer transition-all duration-300 pb-[10px]
                      ${isActive
                          ? "text-[var(--theme-color)] font-medium after:opacity-100"
                          : "text-black hover:text-[var(--theme-color)] hover:font-medium after:opacity-0"
                      }
                      after:content-['•••'] after:absolute after:left-[52%] after:-bottom-[4px]
                      after:-translate-x-1/2 after:text-[20px] after:tracking-[3px]
                      after:font-bold after:text-[var(--theme-color)]
                      after:h-[14px] after:leading-[14px]
                      after:transition-opacity after:duration-300`
                      }
                  >
                    {item.name}
                    {item.hasDropdown && item.dropdownIcon}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* ===== Right Section ===== */}
        <div className="flex items-center gap-4">
          <div className="relative hidden custom-lg:block group">
              <Button
                variant="common"
                className="!min-w-[113px] !py-[7px] !px-[8px] flex items-center"
                onClick={() => {
                  if (!token) {
                    setIsLoginOpen(true);
                  }
                }}
              >
                <img src={WhiteLogin} alt="Login" className="w-5 h-5 mr-2" />

                {/* ✅ Text changes based on login state */}
                {!token ? (
                  <>
                    Login
                    <ChevronDown
                      size={16}
                      className="ml-1 transition-transform duration-300 group-hover:rotate-180"
                    />
                  </>
                ) : (
                  <>
                    <span
                  className="inline-block max-w-[40px] overflow-hidden text-ellipsis whitespace-nowrap"
                  title={user?.name || "User"}
                >
                  {user?.name || "User"}
                </span>
                    <ChevronDown
                      size={16}
                      className="ml-1 transition-transform duration-300 group-hover:rotate-180"
                    />
                  </>
                )}
              </Button>

              {/* ✅ Dropdown */}
              <div className="absolute right-0 mt-2 w-[280px] bg-white rounded-[10px] form-shadow z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="p-[17px] text-light text-p flex justify-between border-b border-[#989696]">
                  {!token ? (
                    <>
                      <span>Welcome User!</span>
                      <span
                        className="text-color cursor-pointer font-18 font-medium"
                        onClick={() => setIsRegisterOpen(true)}
                      >
                        Sign Up
                      </span>
                    </>
                  ) : (
                    <>
                      <span>Welcome {user?.name || "User"} !</span>
                      <span
                        className="text-color cursor-pointer font-18 font-medium whitespace-nowrap"
                        onClick={handleLogout}
                      >
                        Sign Out
                      </span>
                    </>
                  )}
                </div>

                <ul className="text-light text-p p-[17px]">
                  <li className="py-[10px] hover:text-[#F43297]">
                     <button  onClick={() => openProtectedLink("/my-account")}
                        className="flex items-center gap-[15px] w-full"
                      >
                      <SvgComponent />
                      <span>My Profile</span>
                    </button>
                  </li>
                  <li className="py-[8px] hover:text-[#F43297]">
                    <button  onClick={() => openProtectedLink("/my-account/orders")}
                      className="flex items-center gap-[15px] w-full"
                    >
                      <Package size={18} />
                      <span>Orders</span>
                    </button>
                  </li>
                  <li className="py-[8px] hover:text-[#F43297]">
                    <button   onClick={() => openProtectedLink("/wishlist")} className="flex items-center gap-[15px] w-full">
                      <FontAwesomeIcon icon={farHeart} />
                      <span>Wishlist</span>
                    </button>
                  </li>
                  <li className="py-[8px] hover:text-[#F43297]">
                    <Link to="/cart" className="flex items-center gap-[15px] w-full">
                      <FontAwesomeIcon icon={faGift} />
                      <span>Coupons</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>


          {/* Wishlist Icon */}
          <button  onClick={() => openProtectedLink("/wishlist")} className=" relative text-light">
            <Heart className="w-5 h-5 " />
             {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#D2AF9F] text-black text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
          </button>

          {/* Cart Icon */}
          <button className="relative text-light"  onClick={() => openProtectedLink("/cart")}>
            <FontAwesomeIcon icon={faCartShopping} className="w-5 h-5" />
               {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#D2AF9F] text-black text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
          </button>
        </div>
      </Row>

      {/* ===== Mobile Drawer Overlay ===== */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* ===== Mobile Drawer ===== */}
      <div onClick={() => setIsMenuOpen(false)} 
        className={`fixed top-0 left-0 w-3/4 max-w-[430px] h-screen bg-white box-shadow z-50 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }` }
      >
        <button
          className="absolute top-4 right-2 transition-colors text-light border rounded-[3px] p-[5px] border-[#D2AF9F]"
          onClick={() => setIsMenuOpen(false)}
        >
          <XCircleIcon size={22} />
        </button>

        <div className="flex h-full flex-col overflow-y-auto no-scrollbar">
          <img src={bannerImg} className="w-full" alt="Banner" />

          <nav className="py-3">
            {navItems.map((item, i) => {
              if (item.name === "Home") return null;
                const isOdd = i % 2 !== 0; 
              return (
                <NavLink
                  key={i}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                   className={`flex items-center gap-3 py-4 px-4 text-light 
                      ${isOdd ? "light-color " : "bg-white "}
                    `}
                >
                  {item.icon}
                  <span>{item.name}</span>
                  <span className="ml-auto">›</span>
                </NavLink>
              );
            })}

            <div className="flex items-center justify-center h-[60px]">
              <hr className="w-full border-t border-dashed border-gray-400" />
            </div>

            <div className="text-light">
              <div className="py-4 px-4 cursor-pointer light-color">
                <button  onClick={() => openProtectedLink("/my-account")} className="flex items-center gap-[15px]">
                  <FaUser /> My Profile
                </button>
              </div>
              <div className="py-4 px-4 cursor-pointer">
                <button  onClick={() => openProtectedLink("/my-account/orders")}
                  className="flex items-center gap-[15px]"
                >
                  <Package size={20} /> Orders
                </button>
              </div>
              <div className="py-4 px-4 cursor-pointer light-color">
                <button  onClick={() => openProtectedLink("/wishlist")} className="flex items-center gap-[15px]">
                  <FontAwesomeIcon icon={farHeart} /> Wishlist
                </button>
              </div>
              <div className="py-4 px-4 cursor-pointer">
                <Link to="/cart" className="flex items-center gap-[15px]">
                  <FontAwesomeIcon icon={faGift} /> Coupons
                </Link>
              </div>
            </div>
          </nav>

          <img src={banner1} className="w-full" alt="Bottom Banner" />
        </div>
      </div>

      {/* ===== Login Popup ===== */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
          <div className="relative bg-white w-full max-w-[1062px] rounded-md overflow-hidden">
            <LoginForm
              onClose={() => setIsLoginOpen(false)}
              onSwitch={() => {
                setIsLoginOpen(false);
                setIsRegisterOpen(true);
              }}
            />
          </div>
        </div>
      )}

      {/* ===== Register Popup ===== */}
      {isRegisterOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
          <div className="relative bg-white w-full max-w-[1062px] rounded-md overflow-hidden">
            <RegistrationForm
              onClose={() => setIsRegisterOpen(false)}
              onSwitch={() => {
                setIsRegisterOpen(false);
                setIsLoginOpen(true);
              }}
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
