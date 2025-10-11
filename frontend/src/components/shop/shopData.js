// D:\mycara\frontend\src\components\shop\shopData.js
// --------------------- Products ---------------------
import shopsaree1 from '../../assets/shopsaree1.jpg';
import shopsaree2 from '../../assets/shopsaree2.jpg';

// --------------------- Categories ---------------------
export const mockCategories = [
    { name: 'Saree', count: 256 },
    { name: 'Cotton Kurti', count: 1026 },
    { name: 'Jewellery', count: 206 },
    { name: 'T-Shirts', count: 989 },
    { name: 'Jeans', count: 1200 },
    { name: 'Shoes', count: 526 },
    { name: 'Westernwear', count: 1026 },
    { name: 'Crop Tops', count: 1539 },
    { name: 'Accessories', count: 4000 },
    { name: 'Bags', count: 200 },
    { name: 'SportsWear', count: 493 },
    { name: 'Indianwear', count: 5000 },
];

// --------------------- Sizes ---------------------
export const mockSizes = ['4XL', '3XL', 'XXL', 'XL', 'L', 'M', 'S', 'XS', 'XXS', 'All Size'];

// --------------------- Colors ---------------------
export const mockColors = [
    { name: 'Black', hex: '#000000', border: true },
    { name: 'Peach', hex: '#FFD379' },
    { name: 'Brown', hex: '#964B00' },
    { name: 'Red', hex: '#E10404' },
    { name: 'Gray', hex: '#808080' },
    { name: 'Orange', hex: '#FF9000' },
    { name: 'Rust', hex: '#289E3A' },
    { name: 'Beige', hex: '#FFC0CB' },
    { name: 'Teal', hex: '#800080' },
    { name: 'Magnt', hex: '#FF00FF' },
    { name: 'Green', hex: '#008000' },
    { name: 'Pink', hex: '#A363E2' },
    { name: 'Maruti', hex: '#A0392F' },
    { name: 'Blue', hex: '#0000FF' },
    { name: 'White', hex: '#FFFFFF', border: true },
    { name: 'Purple', hex: '#800080' },
];

// --------------------- Brands ---------------------
export const mockBrands = [
    { name: 'W', count: 50 },
    { name: 'Vero Moda', count: 120 },
    { name: 'Libas', count: 90 },
    { name: 'Global Desi', count: 200 },
    { name: 'Zudio', count: 350 },
    { name: 'Max', count: 180 },
];

// --------------------- Types ---------------------
export const mockTypes = ['Casual', 'Ethnic', 'Party Wear', 'Formal', 'Sports'];

// --------------------- Fabrics ---------------------
export const mockFabrics = ['Cotton', 'Silk', 'Linen', 'Georgette', 'Rayon', 'Wool'];

// --------------------- Discounts ---------------------
export const mockDiscounts = ['10% and above', '20% and above', '30% and above', '50% and above'];

// --------------------- Labels ---------------------
export const mockLabels = ['Bestseller', 'New Arrival', 'Limited Edition', 'Top Rated'];


export const mockProducts = [
    {
        id: 1,
        name: 'CHECKED SAREE WITH HIGH NACK',
        price: 3599.00,
        imageSrc: shopsaree1,
        isNew: true,
    },
    {
        id: 2,
        name: 'CHECKED SAREE WITH CRAPIO DETAIL',
        price: 2999.00,
        imageSrc: shopsaree2,
        isNew: false,
    },
];
