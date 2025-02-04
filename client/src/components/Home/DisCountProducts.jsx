import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import label from "../../assets/icons/label.png";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import useAllProducts from "../../hooks/useAllProducts";
import ProductCard from "../Common/ProductCard";
import ProductSkeleton from "../Common/ProductCardSkeleton";

// Sample discount products data


const DiscountProducts = () => {
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const [products, isLoading] = useAllProducts()
  const discountProducts = products?.filter(prev => prev.unitPrice > prev.newPrice)
  // console.log(discountProducts);
  

  return (
    <div className="discount-slider mx-auto">
      <div className="flex justify-between items-center mb-5 md:mb-0">
        <h2 className="text-2xl font-bold md:mb-6">Discount Products({discountProducts.length})</h2>
        <div className="flex gap-3 items-center">
          <div
            ref={prevButtonRef}
            className="bg-accent p-2 rounded-full cursor-pointer select-none"
          >
            <IoMdArrowRoundBack className="text-xl" />
          </div>
          <div
            ref={nextButtonRef}
            className="bg-accent p-2 rounded-full cursor-pointer select-none"
          >
            <IoMdArrowRoundForward className="text-xl" />
          </div>
        </div>
      </div>
      <Swiper
      style={{zIndex: '0'}}
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={4}
        navigation={{
          prevEl: prevButtonRef.current,
          nextEl: nextButtonRef.current,
        }}
        // loop={true}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevButtonRef.current;
          swiper.params.navigation.nextEl = nextButtonRef.current;
        }}
        // pagination={{ clickable: true }}
        breakpoints={{
          // Adjust the number of cards based on viewport width
          375: { slidesPerView: 1, spaceBetween: 10 }, // Small screens (phones)
          425: { slidesPerView: 1, spaceBetween: 10 }, // Small screens (phones)
          768: { slidesPerView: 2, spaceBetween: 15 }, // Medium screens (tablets in portrait mode)
          1024: { slidesPerView: 3, spaceBetween: 20 }, // Large screens (tablets in landscape mode)
          1280: { slidesPerView: 4, spaceBetween: 20 }, // Extra large screens (desktops)
        }}
        onInit={(swiper) => {
          swiper.update(); // Ensure swiper updates on initialization
        }}
      >
        {isLoading && <ProductSkeleton/>}
        {discountProducts.map((product, index) => (
            <SwiperSlide key={index}>
            <ProductCard product={product}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DiscountProducts;
