import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import useCategory from "../../hooks/useCategory";
import label from "../../assets/icons/label.png";
import useAllProducts from "../../hooks/useAllProducts";
import ProductCard from "../Common/ProductCard";
import ProductSkeleton from "../Common/ProductCardSkeleton";
import { axiosPublic } from "../../hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";

const AllProducts = () => {
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const [categories, isPending] = useCategory();
  const [products, isLoading] = useAllProducts();
  // const [filteredProducts, setFilteredProducts] = useState(products)
  const [selected, setSelected] = useState(null);
  // console.log(filteredProducts);

  const { data: filteredProducts = [], isLoading: categoryLoading } = useQuery({
    queryKey: ["category-products", selected],
    queryFn: async () => {
      const res = await axiosPublic.get(`/categories/${selected}`);
      // setFilteredProducts(res.data);
      return res.data;
    },

    enabled: !!selected,
  });

  // useEffect(() => {
  //   products
  // }, [])

  const handleCategory = async (item) => {
    setSelected(item);
  };

  const displayProducts = selected ? filteredProducts : products;

  return (
    <div className="">
      <div className="">
        <div className="flex justify-between ">
        <div className="flex items-center mb-6 gap-4 ">
          <h2
            onClick={() => setSelected(null)}
            className="text-2xl  font-bold cursor-pointer "
          >
            All Products({displayProducts.length})
          </h2>
          <div className="lg:flex gap-3 hidden flex-wrap ">
            {categories.map((i, index) => (
              <div
                key={index}
                onClick={() => handleCategory(i.slug)}
                className="hover:bg-slate-100 cursor-pointer text-sm rounded-3xl py-2 px-4 border"
              >
                {i.name}
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-3 items-center ">
          <div
            ref={prevButtonRef}
            className="bg-accent p-2 rounded-full cursor-pointer select-none "
          >
            <IoMdArrowRoundBack className="text-xl" />
          </div>
          <div
            ref={nextButtonRef}
            className="bg-accent p-2 rounded-full cursor-pointer select-none "
          >
            <IoMdArrowRoundForward className="text-xl" />
          </div>
        </div>
        </div>
        <div className="flex gap-3 items-center justify-start overflow-auto mb-5 lg:hidden">
            {categories.map((i, index) => (
              <div
                key={index}
                onClick={() => handleCategory(i.slug)}
                className="hover:bg-slate-100 cursor-pointer text-sm text-nowrap rounded-3xl w-full py-2 px-3 border"
              >
                {i.name}
              </div>
            ))}
          </div>
      </div>
      <Swiper
        style={{ zIndex: "0" }}
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
          424: { slidesPerView: 1, spaceBetween: 10 }, // Small screens (phones)
          768: { slidesPerView: 2, spaceBetween: 15 }, // Medium screens (tablets in portrait mode)
          1024: { slidesPerView: 3, spaceBetween: 20 }, // Large screens (tablets in landscape mode)
          1280: { slidesPerView: 4, spaceBetween: 20 }, // Extra large screens (desktops)
        }}
        onInit={(swiper) => {
          swiper.update(); // Ensure swiper updates on initialization
        }}
      >
        {isLoading || categoryLoading ? (
          <ProductSkeleton />
        ) : (
          displayProducts.map((product, index) => (
            <SwiperSlide key={index}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
};

export default AllProducts;
