// components/ContactSection.jsx
import React from "react";
import Row from "../ui/Row";
import Button from "../ui/Button";
import formBg from '../../assets/formbg.png';
import Section from "../ui/Section";

export default function ContactSection() {
  return (
    <Section className="w-full bg-white mb-[25px] md:mb-[50px] " 
    style={{ backgroundImage: `url(${formBg})` }}
     >
      <Row className=" grid grid-cols-1 md:grid-cols-2 gap-[30px] ">
        <div>
          <h2 className="text-[36px]  font-semibold text-dark mb-[18px] leading">
            Get In Touch
          </h2>
          <p className="text-[#989696] text-14 mb-[30px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation......
          </p>

          <form className="space-y-[15px] md:space-y-[28px] ">
          
            <input
              type="text"
              placeholder="Name*"
              className="input-common"
            />
            <input
              type="email"
              placeholder="E-mail*"
              className="input-common"
            />
            <div className="grid grid-cols-2 gap-[15px] md:gap-[28px]">
              <input
                type="text"
                placeholder="Order Number"
                className="input-common"
              />
              <input
                type="date"
                placeholder="DD/MM/YY"
                className="input-common placeholder-[#BCBCBC]"
              />
            </div>

            <textarea
              rows="4"
              placeholder="Description"
              className="input-common"
            ></textarea>
  
            <Button
              type="submit"
              variant="common" 
            >
              Send Message
            </Button>
          </form>
        </div>
        <div className="w-full h-[500px] md:h-full rounded-md overflow-hidden shadow-md">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.857730642045!2d72.86647431503077!3d21.205491385909074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04fb03e1e8c8b%3A0x93dcdbb0e08da8c!2sMota%20Varachha%2C%20Surat!5e0!3m2!1sen!2sin!4v1677840410877!5m2!1sen!2sin"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            className="border-0"
          ></iframe>
        </div>
      </Row>
    </Section>
  );
}
