import React from "react";
import Link from "next/link";
import TabDescription from "./TabDescription";
import TabDetailsFit from "@/components/shared/products/TabDetailsFit";
import TabFabricationCare from "@/components/shared/products/TabFabricationCare";

const ProductDetailsTab = ({ product }) => {
  // variables
  return (
    <div className="ltn__shop-details-tab-inner ltn__shop-details-tab-inner-2">
      <div className="ltn__shop-details-tab-menu">
        <div className="nav">
          <Link
            className="active show"
            data-bs-toggle="tab"
            href="#liton_tab_details_1_1"
          >
            Description
          </Link>
          <Link
            data-bs-toggle="tab"
            href="#liton_tab_details_1_2"
          >
            Details & Fit
          </Link>
          <Link
            data-bs-toggle="tab"
            href="#liton_tab_details_1_3"
          >
            Fabrication & Care
          </Link>
        </div>
      </div>
      <div className="tab-content">
        <div className="tab-pane fade active show" id="liton_tab_details_1_1">
          <TabDescription />
        </div>
        <div className="tab-pane fade active show" id="liton_tab_details_1_2">
          <TabDetailsFit />
        </div>
        <div className="tab-pane fade active show" id="liton_tab_details_1_3">
          <TabFabricationCare />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsTab;
