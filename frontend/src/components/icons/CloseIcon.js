import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path stroke="#ffffffff" strokeWidth={1.5} d="m1 1 8 8M9 1 1 9" />
  </svg>
)
export default SvgComponent
