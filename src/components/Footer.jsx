import React from "react";
import { apps, googlePlay, ilustrasi } from "../assets";

const Footer = () => {
  return (
    <div className="footer pb-3 pt-4">
      <div className="container mx-auto px-5">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={ilustrasi}
              alt="Illustration"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-center text-center mt-4 md:mt-0">
            <h1 className="text-warning font-bold">SECURE YOUR HEALTH</h1>
            <h2 className="font-bold text-2xl">Download Your App</h2>
            <p className="text-gray-500 text-[14px]">
              We develop an app to allow you to improve your health better in
              the great way.
            </p>
            <div className="flex justify-center mt-3">
              <img src={apps} alt="App Store" className="mx-2 w-[150px]" />
              <img
                src={googlePlay}
                alt="Google Play"
                className="mx-2 w-[150px]"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <h3 className="font-bold text-white">AlerGlow</h3>
          <div className="flex space-x-3">
            <i className="fa-brands fa-instagram text-white text-2xl"></i>
            <i className="fa-brands fa-facebook text-white text-2xl"></i>
            <i className="fa-brands fa-linkedin text-white text-2xl"></i>
          </div>
        </div>
        <div className="mt-3 text-center">
          <p className="text-white-50">
            &copy; Copyright by Evos Legends 2024, All Right Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
