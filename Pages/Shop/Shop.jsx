import React from "react";
import Sidebar from "../../src/Components/SideBar/sidebar";
import ShopGrid from "../../src/Components/ShopGrid/ShopGrid";
import Navbar from "../../src/Components/Navbar/Navbar";


const ShopPage = () => {
  return (
    <div>
      <div className="flex mt-16">
        <ShopGrid />
      </div>

    </div>
  );
};

export default ShopPage;
