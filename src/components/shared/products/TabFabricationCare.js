import React from "react";

const TabFabricationCare = () => {
  return (
    <div className="ltn__shop-details-tab-content-inner">
      <div className="mb-4">
        <h5>Material:</h5>
        <ul style={{ listStyle: "disc"}}>
          <li>95% Cotton</li>
          <li>5% Elastane</li>
        </ul>
      </div>
      <div>
        <h5>Care Instructions:</h5>
        <ul style={{ listStyle: "disc" }}>
          <li>Wash in cold water</li>
          <li>Do not bleach</li>
          <li>Iron on low heat</li>
          <li>Wash separately</li>
          <li>Do not tumble dry</li>
        </ul>
      </div>
    </div>
  );
};

export default TabFabricationCare;
