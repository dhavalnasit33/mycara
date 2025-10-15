import ProductCard from '../productcard/ProductCard';
<<<<<<< HEAD
export const products = [
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
=======
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/products/productsThunk';
import { useEffect } from 'react';

>>>>>>> 05356209fcdb09ac6cf464f3c1ddc506b82b0aaa

const ProductGrid  = () => {

    const { products = [], loading } = useSelector((state) => state.product);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    console.log("Products in component:", products);

    return (
        <div className="py-10 ">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-[30px]">
                    {products && products.length > 0 ? (
                        products.map((product, index) => (
                            <ProductCard key={product.id || index} product={product} />
                        ))
                    ) : (
                        <p>No products found.</p>
                    )}
                </div>

                {/* --- Load More Button Section --- */}
<<<<<<< HEAD
                <div className="flex justify-center lg:mt-[50px]  ">
=======
                <div className="flex justify-center mt-10">
>>>>>>> 05356209fcdb09ac6cf464f3c1ddc506b82b0aaa
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










