import Slider from "react-slick";
import heroImg1 from "../../assets/slider.png";

export default function LoginSlider() {
  const settings = {
    dots: true,            
    infinite: true,        
    speed: 500,
    slidesToShow: 1,       
    slidesToScroll: 1,
    autoplay: true,        
    autoplaySpeed: 3000,  
    arrows: false ,  
    appendDots: dots => (
    <div className="w-full relative">
      <ul className="absolute left-1/2 transform -translate-x-1/2 flex justify-center  mt-5">{dots}</ul>
    </div>
  ),
    customPaging: i => (
        <div className="w-[10px] h-[10px] bg-[#D2AF9F] transition-colors duration-300 rounded-full"></div>
    )
  };

  return (
    <div className="w-full flex items-center justify-center px-5 ">
      <Slider {...settings} className="w-full h-full loginSlider" >
        <div>
          <img
            src={heroImg1}
            alt="Slide 1"
            className="object-cover max-h-[448px] w-full"
          />
        </div>
        <div>
          <img
            src={heroImg1}
            alt="Slide 2"
            className="object-cover max-h-[448px]  h-full w-full"
          />
        </div>
        <div>
          <img
            src={heroImg1}
            alt="Slide 3"
            className="object-cover  max-h-[448px] h-full w-full"
          />
        </div>
        <div>
          <img
            src={heroImg1}
            alt="Slide 3"
            className="object-cover  max-h-[448px] h-full w-full"
          />
        </div>
      </Slider>
    </div>
  );
}

