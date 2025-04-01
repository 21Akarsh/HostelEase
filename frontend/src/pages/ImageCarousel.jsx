import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // Import Autoplay module
import "swiper/css";
import "swiper/css/pagination";

import block1 from "../assets/hostelPics/block1.jpg";
import block2 from "../assets/hostelPics/block2.jpg";
import lblock from "../assets/hostelPics/lblock.jpg";
import pgblock from "../assets/hostelPics/pgblock.jpg";
import parkingImg from "../assets/hostelPics/parkingImg.jpg";

function ImageCarousel() {
  const images = [block1, block2, lblock, pgblock,block1, parkingImg ,lblock,pgblock,block2,parkingImg,lblock];

 // console.log(images); // chck images are loading

  return (
    <div className="w-full flex justify-center mt-10">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={5} // Show 3 images at a time
        spaceBetween={4} // Space between images
        autoplay={{ delay: 2500, disableOnInteraction: false }} // Auto-slide every 2.5 sec
        loop={true}
        speed={800} // Smooth transition speed (0.8 sec)
        centeredSlides={true} // Keeps the middle image in focus
        pagination={{ clickable: true }} // Pagination enabled
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Slide ${index}`}
              className="w-[220px] h-[230px] object-cover rounded-xl shadow-md border border-gray-200 hover:scale-105 transition-all duration-300 mx-auto"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ImageCarousel;


