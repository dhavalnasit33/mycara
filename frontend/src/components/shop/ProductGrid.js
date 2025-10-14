import ProductCard from '../productcard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/products/productsThunk';
import { useEffect } from 'react';


const ProductGrid  = () => {

    const { products = [], loading } = useSelector((state) => state.product);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    console.log("🧠 Products in component:", products);

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
                <div className="flex justify-center mt-10">
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










