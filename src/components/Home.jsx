import React from "react";

const Home = () => {
  return (
    <div className="w-full h-screen home flex items-center px-5 lg:px-[72px]">
      <div className="max-w-[450px] md:max-w-[500px] lg:max-w-[600px] flex flex-col gap-7">
        <h1 className="text-[30px] md:text-[40px] lg:text-[50px] font-bold">
          AlerGlow: Free Skin Allergy Check
        </h1>
        <p className="text-text text-[14px] lg:text-[18px]">
          Alerglow is an innovative app that uses Convolutional Neural Network
          (CNN) algorithm to accurately detect skin allergies. With Alerglow,
          users can easily overcome the difficulty in identifying skin allergy
          symptoms that are often confusing. The app provides an effective and
          quick solution to know the type of skin allergy experienced, helping
          users in taking better care of their skin.
        </p>
        <div>
          <button className="py-2 px-8 bg-blue rounded-full">
            Try Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
