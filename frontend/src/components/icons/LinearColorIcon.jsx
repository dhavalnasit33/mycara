import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={61}
    height={50}
    fill="none"
    {...props}
  >
    <path fill="url(#a)" d="M0 0h61v50H20C8.954 50 0 41.046 0 30V0Z" />
    <defs>
      <linearGradient
        id="a"
        x1={0}
        x2={52}
        y1={25}
        y2={25}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F43297" stopOpacity={0.8} />
        <stop offset={1} stopColor="#fff" />
      </linearGradient>
    </defs>
  </svg>
)
export default SvgComponent
