import React, { useState } from "react";
import ExpertBooking from "../../components/Dashbaord/ExpertBooking";
import Header from "../../components/Dashbaord/Header";
import { Footer } from "../../components/Home/Footer";
import Loader from "../../components/Loader/Loader";

const ExpertBookingMain = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Header />
      <div
        style={{
          position: "relative",
          minHeight: "60vh",
          backgroundColor: "#ffffff",
        }}
      >
        {loading && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#ffffff",
              zIndex: 10,
            }}
          >
            <Loader />
          </div>
        )}
        <ExpertBooking setLoading={setLoading} />
      </div>
      <Footer />
    </>
  );
};

export default ExpertBookingMain;
