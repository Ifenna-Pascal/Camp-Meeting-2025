import CountDown from "./sections/countDown";
import HeroSection from "./sections/heroSection";
import TopEvents from "./sections/topEvents";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <TopEvents />
      <CountDown />
      <div className="bg-gray-600 flex items-center justify-center w-full py-5 h-[60px]">
        <span className="text-white text-center">YPLJ Camping Meeting @2025</span>
      </div>
    </div>
  );
}
