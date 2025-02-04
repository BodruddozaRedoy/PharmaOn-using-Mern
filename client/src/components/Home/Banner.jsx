import React, { useMemo } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import { Pagination, Navigation, Autoplay, Scrollbar } from "swiper/modules";
import MainBtn from "../../shared/MainBtn";
import { Link, NavLink } from "react-router-dom";
import useAllAdvertise from "../../hooks/useAllAdvertise";

const banner = [
  {
    id: 1,
    category: "Baby & Mom Care",
    title: "Have your item delivered at any time",
    description:
      "We have prepered the most discount and best selling product for everyday",
    btnLink: "/shop",
    imgUrl:""
  },
  {
    id: 2,
    category: "Baby & Mom Care",
    title: "Have your item delivered at any time",
    description:
      "We have prepered the most discount and best selling product for everyday",
    btnLink: "/shop",
    imgUrl:""
  },
  {
    id: 3,
    category: "Baby & Mom Care",
    title: "Have your item delivered at any time",
    description:
      "We have prepered the most discount and best selling product for everyday",
    btnLink: "/shop",
    imgUrl:""
  },
];

const Banner = () => {
  const { ads, refetch } = useAllAdvertise();
  const filteredAds = ads.filter(prev => prev.status !== "pending")
  // const filtered_Ads = useMemo(() => {
  //   return ads?.filter(/* filtering logic */);
  // }, [ads]);
  return (
    <div className="">
      <div className="rounded-xl overflow-hidden">
        <Swiper style={{zIndex: '0'}} pagination={true} autoplay={true} modules={[Pagination, Navigation, Scrollbar, Autoplay]} className="mySwiper">
          {(filteredAds.length > 0 ? filteredAds : banner).map((i, index) => (
            <SwiperSlide key={index}>
              <div className={`${index % 2 === 0 ? 'bg-accent' : 'bg-[#f5eee2]'} p-5 md:py-10 px-10 lg:px-20 rounded-xl justify-center flex flex-col md:flex-row gap-5 items-center md:justify-between md:overflow-hidden md:relative`}>

                {/* TODO: need some icon animation at banner bg  */}
                <div className="lg:w-[400px] space-y-4">
                  <p>{i.category}</p>
                  <h1 className="text-bannerText text-4xl font-bold">
                    {i.name}
                  </h1>
                  <p className="">
                    {i.description}
                  </p>
                  <div className="hidden md:flex"><Link to={"/shop"}><MainBtn text={"Shop Now"} /></Link></div>
                </div>
                <div className="w-80 h-80 rounded-full bg-white overflow-hidden">
                  <img
                    className="w-full object-center object-cover"
                    src={i.imgUrl}
                    alt=""
                  />
                </div>
                <div className="flex md:hidden"><Link to={"/shop"}><MainBtn text={"Shop Now"} /></Link></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
