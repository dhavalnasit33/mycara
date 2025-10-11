import { Link } from 'react-router-dom';
import offerbg from '../../assets/offer-1.png';
import Button from '../ui/Button';
import Row from '../ui/Row';

export default function OfferBanner() {
  return (
    <div
        className="w-full max-w-screen mx-auto flex flex-col lg:flex-row items-center  space-y-8 lg:space-y-0 px-4 sm:px-6 xl:px-0 bg-cover bg-no-repeat bg-center 
        py-[7rem] md:m-0 min-h-[400px] lg:min-h-[600px] xl:min-h-[776px]" style={{ backgroundImage: `url(${offerbg})` }}
        >
  
        <Row className='w-full flex justify-end items-center max-w-[1440px] mx-auto'>
            <div className="w-full lg:w-1/2">
            </div>
            <div className="w-full lg:w-1/2 md:w-2/1 flex flex-col items-end text-right">
                <h2 className="xl:text-[62px] lg:text-[48px] sm:text-[20px] font-bold text-theme mb-[10px] xl:mb-[40px] leading break">
                    UP TO 50%
                </h2>
                <h1 className=" text-[30px] md:text-[70px] xl:text-[120px] font-bold leading-[100%] md:leading-[60px] xl:leading-[111px] text-[#D2AF9F] mb-5 break-words">
                    LIMITED DISCOUNT
                </h1>
                <p className="text-p text-light mb-3 max-w-[327px] md:mb-11 sm:text-[10px] md:text-[10px]">
                    Women are afraid to try something new at work because they think that they will no...
                </p>
                <Button variant="common">
                    <Link to="/shop">Shop Now!</Link>
                </Button>
            </div>

        </Row>
    </div>

//     <div className="w-full relative flex items-center h-[80vh] lg:h-screen">
//   {/* Row 1 Background Image */}
//   <img
//     src={offerbg}
//     alt="Hero Background"
//     className="absolute top-0 left-0 w-full lg:h-full"
//   />


//   {/* Content Row */}
//   <div className="container mx-auto relative z-10 flex flex-col lg:flex-row w-full px-4">
//     {/* Left Column - empty on PC, zero on mobile */}
//     <div className="w-0 lg:w-3/5"></div>

//     {/* Right Column - visible on mobile and PC */}
//     <div className="w-2/5 flex flex-col items-center lg:items-end text-center lg:text-right mt-10  px-4 lg:px-0">
//       <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] xl:text-[62px] font-bold text-theme mb-2 lg:mb-[10px] xl:mb-[40px] leading-none">
//         UP TO 50%
//       </h2>
//       <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[70px] xl:text-[120px] font-bold leading-snug md:leading-[60px] lg:leading-[111px] text-[#D2AF9F] mb-3 lg:mb-5 break-words">
//         LIMITED DISCOUNT
//       </h1>
//       <p className="text-sm sm:text-base md:text-lg text-light mb-4 lg:mb-11 max-w-full lg:max-w-[327px]">
//         Women are afraid to try something new at work because they think that they will no...
//       </p>
//       <Button variant="common">
//         <Link to="/shop">Shop Now!</Link>
//       </Button>
//     </div>
//   </div>
// </div>


  );
};
