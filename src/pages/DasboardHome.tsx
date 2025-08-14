import React from "react";
import RevenueChart from "../component/dashHome/RevenuuesChart";
import Status from "../component/dashHome/Status";
import { useGetDashboardQuery } from "../../redux/apiSlices/admin/deshboardSlices";

type Props = {};

const DasboardHome = (props: Props) => {
  const [selectedValue, setSelectedValue] = React.useState("Weekly");
  const { data: dashboardData } = useGetDashboardQuery({
    params: {
      type: selectedValue,
    },
  });
  // console.log(dashboardData?.data);
  return (
    <div className="bg-[#f5f8e4] py-4">
      <Status data={dashboardData?.data} />
      <RevenueChart
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        dashboardData={dashboardData?.data?.user_statistics}
      />
    </div>
  );
};

export default DasboardHome;
