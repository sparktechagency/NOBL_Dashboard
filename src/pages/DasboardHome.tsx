import React from "react";
import RevenueChart from "../component/dashHome/RevenuuesChart";
import Status from "../component/dashHome/Status";

type Props = {};

const DasboardHome = (props: Props) => {
  return (
    <div className="bg-[#f5f8e4]">
      <Status />
      <RevenueChart />
    </div>
  );
};

export default DasboardHome;
