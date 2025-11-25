import React from "react";
import HeroBanner from "../components/Home/HeroBanner";
import { Slider } from "../components/Home/Slider";
import { SliderTwo } from "../components/Home/SliderTwo";
import { SliderThree } from "../components/Home/SliderThree";
import { VideSection } from "../components/Home/VideSection";
import { SectionFour } from "../components/Home/SectionFour";
import { Footer } from "../components/Home/Footer";


export const Home = () => {
  return (
    <>
    <HeroBanner />
    <Slider />
    <SliderTwo />
    <SliderThree />
    <VideSection />
    <SectionFour />
    <Footer />
    </>
  );
};
