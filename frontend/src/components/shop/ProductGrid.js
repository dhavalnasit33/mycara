import ProductCard from '../productcard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/products/productsThunk';
import { useEffect, useState } from 'react';


const ProductGrid  = () => {
    const dispatch = useDispatch();
    const { products = [], loading = false } = useSelector((state) => state.products || {});
    const [visibleCount, setVisibleCount] = useState(3);

    const [page] = useState(1);
    const limit = 100;

    useEffect(() => {
        dispatch(fetchProducts({ page, limit }));
    }, [dispatch, page, limit ]);

    const visibleProducts = products.slice(0, visibleCount); 

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 3); 
    };

    console.log("Products in component:", products);

    return (
        <div className="py-10 ">
            <div className="grid grid-cols-2 md:grid-cols-3  gap-[10px] md:gap-[30px]">
                {visibleProducts.length > 0 ? (
                    visibleProducts.map((product, index) => (
                        <ProductCard key={product.id || index} product={product} />
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>

                {/* --- Load More Button Section --- */}
            {visibleCount < products.length && (
                <div className="flex justify-center mt-10">
                    <button  onClick={handleLoadMore}
                        className="text-[18px] theme-border text-theme w-[187px] h-[70px] sm:w-[220px] sm:h-[89px] font-medium rounded-[10px] shadow-lg transition duration-300 uppercase"
                        style={{
                            boxShadow: "inset 0px 0px 30px rgba(244, 50, 151, 0.25)",
                        }}
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductGrid;

