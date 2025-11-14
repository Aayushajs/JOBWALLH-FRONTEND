import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const BannerCarousel = () => {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(
          "https://job-search-b2.onrender.com/api/v1/banner/banners"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch banners");
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          setBanners(data);
        } else {
          throw new Error("Data format is incorrect");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === banners.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [banners]);

  const handleButtonClick = (url) => {
    navigate(url);
  };

  if (error) {
    return (
      <div className="text-red-500 text-center font-bold text-xl mt-4">
        Error: {error}
      </div>
    );
  }

  if (banners.length === 0)
    return (
      <div className="text-center text-white text-lg font-semibold my-4">
        Loading banners...
      </div>
    );

  return (
    <div className="relative overflow-hidden h-[30rem]  rounded-xl shadow-xl bg-black bg-opacity-30 backdrop-blur-lg border border-white/20">
      <AnimatePresence>
        {banners.map((banner, index) =>
          index === currentIndex ? (
            <motion.div
              key={index}
              className="absolute w-full h-full rounded-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 1 }}
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover rounded-xl brightness-75"
                onClick={() => handleButtonClick(banner.link)}
                onError={(e) => {
                  e.target.src =
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxglGb8lyD054JBcJEpXTnXiHBz_yH5PRblIebaZkU08tnEvmMhXTMhPmXFkeODVGPgAA&usqp=CAU";
                }}
              />
              <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                <h1 className="text-4xl sm:text-6xl font-bold text-white drop-shadow-lg">
                  {banner.title}
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 mb-4">
                  {banner.subtitle}
                </p>
                <button
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-8 rounded-full hover:from-pink-500 hover:to-purple-500 transition-all duration-300 shadow-lg transform hover:scale-110"
                  onClick={() => handleButtonClick(banner.link)}
                >
                  {banner.ctaText || "Explore Now"}
                </button>
              </div>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-3 rounded-full shadow-xl hover:bg-black/70 transition-all duration-300 hover:scale-125"
        onClick={() =>
          setCurrentIndex(currentIndex === 0 ? banners.length - 1 : currentIndex - 1)
        }
      >
        ❮
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-3 rounded-full shadow-xl hover:bg-black/70 transition-all duration-300 hover:scale-125"
        onClick={() =>
          setCurrentIndex(currentIndex === banners.length - 1 ? 0 : currentIndex + 1)
        }
      >
        ❯
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full cursor-pointer transition-all duration-300 shadow-lg transform ${
              index === currentIndex ? "bg-purple-500 scale-125 shadow-purple-500" : "bg-gray-500"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
