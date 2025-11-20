import React from "react";
import Section from "../ui/Section";
import Row from "../ui/Row";
import { useSelector } from "react-redux";
import defaultimg from "../../assets/default-avatar.png";


export default function UserProfile () {
    const { user } = useSelector((state) => state.auth);
  return (
    <Section className="bg-theme !pt-[75px] ">
        <Row className="flex flex-col md:flex-row justify-between items-center md:items-start gap-y-[30px] md:gap-x-[30px] !max-w-[1122px] pb-[57px]">
            <div className="text-center md:text-left flex-1">
                <h1 className="text-[40px] font-medium text-dark mb-[24px] leading">My Account</h1>
                <p className="text-[20px] text-dark mb-[20px] leading">Hello {user?.name || "User"} !</p>
                <p className="text-light text-p">
                Aspernatur magni in repellat repellendus itaque consequuntur alias necessitatibus.
                </p>
            </div>

            <div className="flex-shrink-0">
                <img
                src={defaultimg}
                alt={user.name}
                className="w-[150px] h-[150px] rounded-full border-4 circle-border transition-all duration-300 mx-auto md:mx-0"
                />
            </div>
        </Row>
    </Section>
  );
};