import { Link } from "react-router-dom";

const TrendingCard = ({ product }) => (
 <Link
    to="/products"
    className="block relative group overflow-hidden bg-white transition-transform duration-300 hover:scale-[1.02]"
  >
      <div className="w-full h-auto overflow-hidden">
        <img
          src={product.imageSrc}
          alt={product.name}
          className="w-full h-full object-cover aspect-[4/5] sm:aspect-square transition-transform duration-500"
        />
      </div>
    <div className="absolute right-2 bottom-2 sm:right-4 sm:bottom-4
                    w-11/12 max-w-[350px] h-[210px] lg:h-[231px] p-3 sm:p-5
                    bg-white/70 backdrop-blur-sm transition-opacity duration-300 opacity-100
                    flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div className="pr-2 sm:pr-4">
          <h3 className="text-xs sm:text-sm font-medium font-inter tracking-wider text-black uppercase leading-tight">
            {product.name}
          </h3>
        </div>
        <button className="flex-shrink-0 flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full shadow-lg transition duration-300 border border-white bg-pink-500/10 hover:bg-pink-500/20">
          <span className="text-lg font-bold text-black leading-none pb-0.5">+</span>
        </button>
      </div>
      <div>
        <p className="text-sm font-medium font-inter text-black">
          RS {product.price ? product.price.toFixed(2) : "0.00"}
        </p>
      </div>
    </div>
 </Link>
);

export default TrendingCard;