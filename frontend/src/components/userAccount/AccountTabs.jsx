import Row from "../ui/Row";
import { NavLink, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaShoppingBag, FaUser } from "react-icons/fa";

import Orders from "./Orders";
import Dashboard from "./Dashbord";
import Section from "../ui/Section";
import { LogOut, MapPin } from "lucide-react";
import dashboard from "../../assets/dashboard.png";


const tabs = [
  { name: "Dashboard", path: "/my-account/dashboard", icon: <FaTachometerAlt />, component: Dashboard },
  { name: "Orders", path: "/my-account/orders", icon: <FaShoppingBag />, component: Orders },
  { name: "Address", path: "/my-account/address", icon: <MapPin />, component: () => <p>Address content goes here.</p> },
  { name: "Account Details", path: "/my-account/account-details", icon: <FaUser/>, component: () => <p>Account details content goes here.</p> },
  { name: "Log out", path: "/my-account/logout", icon: <LogOut />, component: null },
];

export default function AccountTabs() {
  const location = useLocation();

  const activeTab = tabs.find(tab => tab.path === location.pathname) || tabs[0];

  const ActiveComponent = activeTab.component;

  return (
     <Section className="!pt-0 -mt-[43px]">
        <Row className="!max-w-[1122px]">
                <div className="flex gap-[10px] flex-wrap">
                {tabs.map(tab => (
                    <NavLink
                    key={tab.name}
                    to={tab.path}
                    className={({ isActive }) =>
                        `flex items-center h-[43px] gap-[10px] px-[15px] sm:px-[30px] py-2 transition text-[18px] 
                        ${isActive
                        ? "bg-[#fff] font-medium text-theme "
                        : "bg-[rgba(255,255,255,0.50)] text-dark hover:text-[#F43297]"
                        }`
                    }
                    >
                    <span className="flex-shrink-0">{tab.icon}</span>
                    {/* <img src={tab.icon}/> */}
                    <span className="hidden custom-lg:inline">{tab.name}</span>
                    </NavLink>
                ))}
                </div>
            </Row>
            <Row className="!max-w-[1122px] mt-[34px]">
            {ActiveComponent ? <ActiveComponent /> : <p>{activeTab.path} content goes here.</p>}
            </Row>
      </Section>
  );
}
