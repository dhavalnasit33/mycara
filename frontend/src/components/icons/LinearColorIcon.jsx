import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={60}
    height={51}
    fill="none"
    {...props}
  >
    <path
      fill="url(#a)"
      d="M0 .646h59.271v50H20c-11.046 0-20-8.955-20-20v-30Z"
    />
    <defs>
      <linearGradient
        id="a"
        x1={0}
        x2={50.526}
        y1={25.645}
        y2={25.645}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F43297" stopOpacity={0.8} />
        <stop offset={1} stopColor="#fff" />
      </linearGradient>
    </defs>
  </svg>
)
export default SvgComponent
