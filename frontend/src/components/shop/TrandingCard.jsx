import { Link } from "react-router-dom";
import { getImageUrl } from "../utils/helper";
import { Plus } from "lucide-react";

export default function TrendingCard ({ product }){
  return(
 <Link
     to={`/products/${product._id}`}
    className="block relative group overflow-hidden bg-white transition-transform duration-300 hover:scale-[1.02]"
  >
      <div className="w-full h-auto overflow-hidden">
        <img
          src={getImageUrl(product.images)}
          alt={product.name}
          className="w-full h-full  aspect-[4/5] sm:aspect-square transition-transform duration-500"
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
        <button className="flex-shrink-0 flex items-center justify-center w-[20px] h-[20px] rounded-full transition duration-300 border border-white">
          <Plus size={14}/>
        </button>
      </div>
      <div>
        <p className="text-sm font-medium font-inter text-black">
          Rs {Number(product.variants?.[0]?.price || 0).toLocaleString("en-IN")}
        </p>
      </div>
    </div>
 </Link>
);
}