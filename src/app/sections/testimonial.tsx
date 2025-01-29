/* eslint-disable @typescript-eslint/no-explicit-any */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import ReviewCard from "./reviewCard";

const ReviewCarousel = () => {
  const [current, setCurrent] = useState(false);
  const settings = {
    className: "center",
    autoplay: true,
    infinite: true,
    slidesToShow: 2,
    arrows: false,
    slideToScrool: 2,
    lazyLoad: true,
    focusOnSelect: true,
    draggable: true,
    dots: true,
    autoplaySpeed: 5000,
    speed: 2000,
    afterChange: (current: boolean) => setCurrent(current),
    customPaging: (i: any) => (
      <div
        className={`w-[25px]  mt-2 h-[4px] rounded-[10px] ${
          current === i ? "bg-black" : "bg-gray-300"
        }`}
      ></div>
    ),
    responsive: [
      {
        breakpoint: 450,
        settings: {
          autoplay: true,
          centerMode: false,
          infinite: true,
          slidesToShow: 1,
          slideToScroll: 1,
          arrows: false,
          draggable: true,
          dots: true,
          autoplaySped: 1000,
          speed: 500,
          beforeChange: (current:any) => setCurrent(current),
          customPaging: (i: any) => (
            <div
              className={`w-[20px]  mt-4 h-[4px] rounded-[10px] ${
                current === i ? "bg-gray-900" : "bg-gray-400"
              }`}
            ></div>
          ),
        },
      },
    ],
  };

  return (
    <div className="lg:max-w-[1100px] mb-12 mx-auto">
      <Slider {...settings}>
        <ReviewCard
          name="Ben Victorious"
          role="Enugu Branch"
          review="From meeting old friends and brethren and working together, to spending quality time together in worship, the experience- pure bliss. My story won't be complete without mentioning the Prophecies and Words of our Apostle and Ministers that came through, within the year 2023. I genuinely anticipate the new move of the Holy Spirit in this upcoming annual event: the Young People Love Jesus camp meeting 2025! Be there!"
          src={"/img/ben.jpg"}
        />
        <ReviewCard
          name={"Nonso"}
          review="It was a life transforming meeting with Daddy Nick in the fullness of God's presence. It shaped my year and walk with God. The moments of worship were awesome. The word of God changed my mentality towards my purpose and pursuit in life. I really enjoyed the games and fellowship with brethren. I really can't wait to attend this year's YPLJ camp meeting."
          role="Nsukka Branch"
          src={"/img/nonso.jpg"}
        />
        <ReviewCard
          name="Ebube (Miss Yems 2019)"
          review="It was a life transforming meeting with Daddy Nick in the fullness of God's presence. It shaped my year and walk with God. The moments of worship were awesome. The word of God changed my mentality towards my purpose and pursuit in life. I really enjoyed the games and fellowship with brethren. I really can't wait to attend this year's YPLJ camp meeting."
          role="Nsukka Branch"
          src={"/img/ebube.jpg"}
        />
      </Slider>
    </div>
  );
};

export default ReviewCarousel;
