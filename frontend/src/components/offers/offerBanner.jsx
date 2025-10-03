import offerbg from '../../assets/offer-bg.png';
import Button from '../ui/Button';

export default function OfferBanner() {
  return (
    <div
        className="w-full max-w-screen mx-auto flex flex-col lg:flex-row items-center  space-y-8 lg:space-y-0 px-4 sm:px-6 xl:px-0 bg-cover bg-no-repeat bg-center 
        py-[7rem] md:m-0 min-h-[400px] lg:min-h-[600px]" style={{ backgroundImage: `url(${offerbg})` }}
        >
  
        <div className='w-full flex justify-end items-center max-w-[1440px] mx-auto'>
            <div className="w-full lg:w-1/2">
            </div>

            <div className="w-full lg:w-1/2 md:w-2/1 flex flex-col items-end text-right">
                <h2 className="xl:text-[62px] lg:text-[48px] sm:text-[20px] font-bold text-theme mb-[10px] xl:mb-[40px] leading break">
                    UP TO 50%
                </h2>
                <h1 className="sec-theme text-[30px] md:text-[60px] xl:text-[120px] font-bold leading-[100%] md:leading-[80px] xl:leading-[111px] mb-5 break-words">
                    LIMITED DISCOUNT
                </h1>

                <p className="text-p text-light mb-3 max-w-[327px] md:mb-11 sm:text-[10px] md:text-[10px]">
                    Women are afraid to try something new at work because they think that they will no...
                </p>
                <Button variant="common">
                    Shop Now!
                </Button>
            </div>

        </div>
    </div>

  );
};
