<<<<<<< HEAD


=======
>>>>>>> bb961bde4301c04c294824f51451179071434630
import shopsaree3 from '../../assets/shopsaree3.jpg';
import shopsaree4 from '../../assets/shopsaree4.jpg';
import shopsaree5 from '../../assets/shopsaree5.jpg';
import shopsaree6 from '../../assets/shopsaree6.jpg';
import shopsaree7 from '../../assets/shopsaree7.jpg';
import shopsaree8 from '../../assets/shopsaree8.jpg';
import shopsaree9 from '../../assets/shopsaree9.jpg';
import shopsaree10 from '../../assets/shopsaree10.jpg';
import shopsaree11 from '../../assets/shopsaree11.jpg';
import shopsaree12 from '../../assets/shopsaree12.jpg';
import shopsaree13 from '../../assets/shopsaree13.jpg';
import shopsaree14 from '../../assets/shopsaree14.jpg';
import ProductCard from '../productcard/ProductCard';
const products = [
    {
        id: 1,
        brand: "Phataakaa",
        subtitle: "Women Plain Tar Work Fancy Saree",
        price: "1,137",
        oldPrice: "4,575",
        discount: "75%",
        // સ્લાઇડર માટેની ઇમેજીસ
        image: shopsaree3, 
        allImages: [shopsaree3, shopsaree4, shopsaree5], 
        colorOptions: ['bg-[#A51414]', 'bg-[#458754]'],
        express: true,
        isSale: false
    },
    {
        id: 2,
        brand: "Zillika",
        subtitle: "Women Georgette Floral Black an...",
        price: "1,137",
        oldPrice: "4,575",
        discount: "75%",
        image: shopsaree4,
        colorOptions: ['bg-[#16D5FF]', 'bg-[#E45BE7]', 'bg-[#ECF01D]'],
        express: false,
        isSale: true 
    },
    {
        id: 3,
        brand: "Gajara Gang",
        subtitle: "Women Plain Tar Work Fancy Saree",
        price: "1,137",
        oldPrice: "4,575",
        discount: "75%",
        image: shopsaree5,
        colorOptions: ['bg-[#A51414]', 'bg-[#458754]'],
        express: true,
        isSale: false
    },
    {
        id: 4,
        brand: "Phataakaa",
        subtitle: "Women Plain Tar Work Fancy Saree",
        price: "1,137",
        oldPrice: "4,575",
        discount: "75%",
        image: shopsaree6,
        colorOptions: ['bg-[#A51414]', 'bg-[#458754]'],
        express: true,
        isSale: false
    },
    {
        id: 5, 
        brand: "Gajara Gang",
        subtitle: "Women Plain Tar Work Fancy Saree",
        price: "1,137",
        oldPrice: "4,575",
        discount: "75%",
        image: shopsaree7, 
        colorOptions: ['bg-[#A51414]', 'bg-[#458754]'],
        express: false, 
        isSale: true 
    },
    {
        id: 6,
        brand: "Gajara Gang",
        subtitle: "Women Plain Tar Work Fancy Saree",
        price: "1,137",
        oldPrice: "4,575",
        discount: "75%",
        image: shopsaree8,
        colorOptions: ['bg-[#16D5FF]', 'bg-[#E45BE7]', 'bg-[#ECF01D]'],
        express: true,
        isSale: false
    },
    {
        id: 7,
        brand: "Phataakaa",
        subtitle: "Women Plain Tar Work Fancy Saree",
        price: "1,137",
        oldPrice: "4,575",
        discount: "75%",
        image: shopsaree9,
        colorOptions: ['bg-[#A51414]', 'bg-[#458754]'],
        express: true,
        isSale: false
    },
    {
        id: 8, 
        brand: "Gajara Gang",
        subtitle: "Women Plain Tar Work Fancy Saree",
        price: "1,137",
        oldPrice: "4,575",
        discount: "75%",
        image: shopsaree10, 
        colorOptions: ['bg-[#A51414]', 'bg-[#458754]'],
        express: false, 
        isSale: false 
    },
    {
        id: 9,
        brand: "Gajara Gang",
        subtitle: "Women Plain Tar Work Fancy Saree",
        price: "1,137",
        oldPrice: "4,575",
        discount: "75%",
        image: shopsaree11,
        colorOptions: ['bg-[#A51414]', 'bg-[#458754]'],
        express: true,
        isSale: false
    },
    {
        id: 10,
        brand: "Phataakaa",
        subtitle: "Women Plain Tar Work Fancy Saree",
        price: "1,137",
        oldPrice: "4,575",
        discount: "75%",
        image: shopsaree12,
        colorOptions: ['bg-[#A51414]', 'bg-[#458754]'],
        express: true,
        isSale: false
    },
    {
        id: 11, 
        brand: "Gajara Gang",
        subtitle: "Women Plain Tar Work Fancy Saree",
        price: "1,137",
        oldPrice: "4,575",
        discount: "75%",
        image: shopsaree13, 
        colorOptions: ['bg-[#16D5FF]', 'bg-[#E45BE7]', 'bg-[#ECF01D]'],
        express: false, 
        isSale: true 
    },
    {
        id: 12,
        brand: "Gajara Gang",
        subtitle: "Women Plain Tar Work Fancy Saree",
        price: "1,137",
        oldPrice: "4,575",
        discount: "75%",
        image: shopsaree14,
        colorOptions: ['bg-[#A51414]', 'bg-[#458754]'],
        express: false,
        isSale: false
    },
];

const ProductGrid  = () => {
    return (
        <div className="py-10 ">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-[10px] md:gap-[30px] w-full mx-auto"> {/* px-4 for side spacing */}
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                {/* --- Load More Button Section --- */}
                <div className="flex justify-center mt-10 ">
                    <button
                        className="text-[18px] theme-border font-inter text-theme w-[187px] h-[70px] sm:w-[220px] sm:h-[89px] font-medium rounded-[10px] shadow-lg transition duration-300 uppercase"
                        style={{
                            boxShadow: "inset 0px 0px 30px rgba(244, 50, 151, 0.25)",
                        }}
                    >
                        Load More
                    </button>
                </div>
        </div>
    );
};

export default ProductGrid;










