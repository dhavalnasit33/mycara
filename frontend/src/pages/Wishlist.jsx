// D:\mycara\frontend\src\pages\Wishlist.jsx

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



// const products = [
// ];

export default function Wishlist(){
  const dispatch = useDispatch();
    const { pages, loading, error } = useSelector((state) => state.pages);
    const { products} = useSelector((state) => state.products);



    useEffect(() => {
        dispatch(fetchPages());
    }, [dispatch]);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    const wishlistpage = pages.find(page => page.slug === 'wishlist');
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
                <WishlistTable products={products} />
            </Row>
            </Section>
        </>
    );
}