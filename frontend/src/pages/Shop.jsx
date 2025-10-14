import React, { useEffect } from 'react';
import SecondarySection from '../components/ui/SecondarySection';
import WomenCollections from '../components/shop/WomenCollections';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPages } from '../features/pages/pagesThunk';
import { getImageUrl } from '../components/utils/helper';

const Shop = () => {

    const dispatch = useDispatch();
    const { pages, loading, error } = useSelector((state) => state.pages);

    useEffect(() => {
        dispatch(fetchPages());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

      const shopPage = pages.find(page => page.slug === 'shop');

    return (
        <>
            <div className="hidden lg:flex relative">
             {shopPage?.sections.map(section => (
                <SecondarySection
                    key={section._id}
                    title={section.title}
                    description={section.description}
                    backgroundImage={getImageUrl(
                    section.background_image_url || section.image_url
                    )}
                />
                ))}
            </div>
            <WomenCollections />
        </>
    );
};
export default Shop;