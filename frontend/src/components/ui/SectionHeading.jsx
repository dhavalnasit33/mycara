import FlowerIcon from "../../assets/flower.png"; // adjust path

export default function SectionHeading({ title }) {
  return (
    <div className="relative mx-4 flex flex-col items-center justify-center h-48">
      {/* Title */}
      <h2 className="font-h2 text-2xl sm:text-3xl text-black whitespace-nowrap relative z-10">
        {title}
      </h2>

      {/* Decorative SVG icon */}
      <FlowerIcon className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[110px] h-[80px] pointer-events-none z-0" />
    </div>
  );
}