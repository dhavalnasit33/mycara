import SecondarySection from "../components/ui/SecondarySection";
import WishlistTable from "../components/wishlist/WishlistTable";
import prod1 from "../assets/shopsaree3.jpg";
import prod2 from "../assets/shopsaree4.jpg";
import Section from "../components/ui/Section";
import Row from "../components/ui/Row";
import { useDispatch, useSelector } from "react-redux";
import { fetchPages } from "../features/pages/pagesThunk";
import { useEffect } from "react";
import { getImageUrl } from "../components/utils/helper";
import { fetchWishlist } from "../features/wishlist/wishlistThunk";
const products = [
  {
    name: "Analog Watch for Women",
    sku: "12345",
    image: prod1,
    oldPrice: 4575,
    price: 1137,
    quantity: 1,
    inStock: true,
    stockText: "50 in stock",
  },
  {
    name: "Women Latest Trendy Pink Mojari",
    sku: "12345",
    image: prod2,
    price: 1137,
    quantity: 1,
    inStock: false,
    stockText: "out of stock",
  },
  // add more products as needed
];



export default function Wishlist(){
  // const dispatch = useDispatch();
  //   const { pages, loading, error } = useSelector((state) => state.pages);

  //   useEffect(() => {
  //       dispatch(fetchPages());
  //   }, [dispatch]);

  //   if (loading) return <p>Loading...</p>;
  //   if (error) return <p>{error}</p>;
  //   const wishlistpage = pages.find(page => page.slug === 'wishlist');
const dispatch = useDispatch();

  // ✅ Fetch wishlist + page data
  const { pages, loading: pagesLoading, error } = useSelector(
    (state) => state.pages
  );
  const { wishlist, loading: wishlistLoading } = useSelector(
    (state) => state.wishlist
  );

  useEffect(() => {
    dispatch(fetchPages());
    dispatch(fetchWishlist()); // ✅ Fetch wishlist from backend
  }, [dispatch]);

  if (pagesLoading || wishlistLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const wishlistpage = pages.find((page) => page.slug === "wishlist");



    return(
        <>
          {wishlistpage?.sections.map(section => (
              <SecondarySection
                  key={section._id}
                  title={section.title}
                  description={section.description}
                  backgroundImage={getImageUrl(
                  section.background_image_url || section.image_url
                  )}
              />
              ))}
           <Section >
            <Row className="pt-[50px]">
                {/* <WishlistTable products={products} /> */}
                  <WishlistTable products={wishlist || []} />
            </Row>
            </Section>
        </>
    );
}