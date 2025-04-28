import React, { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Title from "../share/Title";
import SelectBox from "../share/SelectBox";

// Define the type for each data point
interface DataPoint {
  name: string;
  amt: number;
}

const weeklyData: DataPoint[] = [
  { name: "Sat", amt: 20 },
  { name: "Sun", amt: 50 },
  { name: "Mon", amt: 70 },
  { name: "Tue", amt: 60 },
  { name: "Wed", amt: 80 },
  { name: "Thu", amt: 40 },
  { name: "Fri", amt: 90 },
];

const monthlyData: DataPoint[] = [
  { name: "Week 1", amt: 200 },
  { name: "Week 2", amt: 300 },
  { name: "Week 3", amt: 400 },
  { name: "Week 4", amt: 500 },
];

const yearlyData: DataPoint[] = [
  { name: "Jan", amt: 7000 },
  { name: "Feb", amt: 5000 },
  { name: "Mar", amt: 9000 },
  { name: "Apr", amt: 9500 },
  { name: "May", amt: 8010 },
  { name: "Jun", amt: 10000 },
  { name: "Jul", amt: 9000 },
  { name: "Aug", amt: 8500 },
  { name: "Sep", amt: 9000 },
  { name: "Oct", amt: 12000 },
  { name: "Nov", amt: 13000 },
  { name: "Dec", amt: 14000 },
];

const RevenueChart: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState("weekly");
  const formatYAxis = (tickItem: number) => {
    return `${tickItem}`;
  };

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    console.log("Selected", value);
  };
  const selectOptions = [
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
  ];

  const getChartData = () => {
    switch (selectedValue) {
      case "monthly":
        return monthlyData;
      case "yearly":
        return weeklyData;
      default:
        return  yearlyData;
    }
  };

  return (
    <div className=" rounded-2xl mt-2 p-2 text-gray-300 pr-14">
      <div className="flex justify-between items-center">
        <h3 className="mb-5 text-[24px] font-roboto font-medium  text-black">
          User statistics
        </h3>
        <SelectBox
          options={selectOptions}
          value={selectedValue}
          onChange={(value) => setSelectedValue(value)}
        />
      </div>
      <div className="bg-white py-8 px-4">
        <ResponsiveContainer className=" " width="100%" height={400}>
          <AreaChart data={getChartData()} syncId="anyId">
            <defs>
              <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00D6FF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#00D6FF" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />

            <XAxis axisLine={false} dataKey="name" />
            <YAxis
              axisLine={false}
              tickFormatter={(value) => value}
              ticks={[
                0, 20, 40, 60, 80, 100, 200, 500, 1000, 5000, 10000, 15000,
              ]}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="amt"
              stroke="url(#colorAmt)"
              fill="url(#colorAmt)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
