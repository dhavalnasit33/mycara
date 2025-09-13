import React from "react";

const Footer = () => (
  <footer className="bg-white border-t mt-8">
    <div className="px-4 md:px-[100px] py-6 flex justify-between items-center">
      <p className="text-sm text-gray-600">
        © {new Date().getFullYear()} MyLife MyStyle
      </p>
      <div className="flex space-x-4 text-sm text-gray-600">
        <a href="/terms">Terms</a>
        <a href="/privacy">Privacy</a>
      </div>
    </div>
  </footer>
);

export default Footer;
