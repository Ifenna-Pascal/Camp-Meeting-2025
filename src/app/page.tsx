'use client'
import CountDown from "./sections/countDown";
import Guests from "./sections/guests";
import HeroSection from "./sections/heroSection";
import ReviewCarousel from "./sections/testimonial";
import TopEvents from "./sections/topEvents";
// import AOS from "aos";
// import "aos/dist/aos.css";

export default function Home() {
  // useEffect(() => {
  //   AOS.init({
  //     once: true,
  //   });
  //   AOS.refresh();
  // }, []);

  return (
    <div>
      <HeroSection />
      <TopEvents />
      <Guests  />
      <CountDown />
      <ReviewCarousel />
      <div className="bg-gray-600 flex items-center justify-center w-full py-5 h-[60px]">
        <span className="text-white text-center">YPLJ Camping Meeting @2025</span>
      </div>
    </div>
  );
}
