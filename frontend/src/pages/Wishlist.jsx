import SecondarySection from "../components/ui/SecondarySection";
import wishlistbg from "../assets/wishlistbg.png";
import WishlistTable from "../components/wishlist/WishlistTable";
import prod1 from "../assets/shopsaree3.jpg";
import prod2 from "../assets/shopsaree4.jpg";
import Section from "../components/ui/Section";
import Row from "../components/ui/Row";
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
    return(
        <>
           <SecondarySection
                heading="WishList"
                subText="Your saved favorites are waiting for you!"
                backgroundImage={wishlistbg}
            />
           <Section >
            <Row className="pt-[50px]">
                <WishlistTable products={products} />
            </Row>
            </Section>
        </>
    );
}