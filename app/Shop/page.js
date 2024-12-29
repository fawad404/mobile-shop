import React from "react";
import Sidebar from "@/app/Components/SideBar/sidebar";
import ShopGrid from "@/app/Components/ShopGrid/ShopGrid";
import Navbar from "@/app/Components/Navbar/Navbar";


const Page = () => {
  return (
    <div>
      <div className="flex mt-16">
        <ShopGrid />
      </div>

    </div>
  );
};

export default Page;
