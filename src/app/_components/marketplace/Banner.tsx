import React from "react";
import BannerStripe from "./BannerStripe";

const Banner = () => {
  return (
    <>
      <div className="fixed left-0 top-0 hidden h-52 w-full lg:flex">
        <BannerStripe color="bg-red-500" />
        <BannerStripe color="bg-white" />
        <BannerStripe color="bg-red-500" />
        <BannerStripe color="bg-white" />
        <BannerStripe color="bg-red-500" />
        <BannerStripe color="bg-white" />
        <BannerStripe color="bg-red-500" />
        <BannerStripe color="bg-white" />
        <BannerStripe color="bg-red-500" />
        <BannerStripe color="bg-white" />
      </div>
      <div className="fixed left-0 top-0 hidden h-52 w-full md:flex lg:hidden">
        <BannerStripe color="bg-red-500" />
        <BannerStripe color="bg-white" />
        <BannerStripe color="bg-red-500" />
        <BannerStripe color="bg-white" />
        <BannerStripe color="bg-red-500" />
        <BannerStripe color="bg-white" />
        <BannerStripe color="bg-red-500" />
      </div>
      <div className="fixed left-0 top-0 flex h-40 w-full md:hidden lg:hidden">
        <BannerStripe color="bg-red-500" />
        <BannerStripe color="bg-white" />
        <BannerStripe color="bg-red-500" />
        <BannerStripe color="bg-white" />
        <BannerStripe color="bg-red-500" />
      </div>
    </>
  );
};

export default Banner;
