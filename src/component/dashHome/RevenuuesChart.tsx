import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import SelectBox from "../share/SelectBox";

// Define the type for each data point

interface DataPoint {
  day: string;
  total: number;
}

const RevenueChart = ({
  dashboardData,
  selectedValue,
  setSelectedValue,
}: any) => {
  const selectOptions = [
    { value: "Weekly", label: "Weekly" },
    { value: "Monthly", label: "Monthly" },
    { value: "Yearly", label: "Yearly" },
  ];

  // console.log(dashboardData);

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
          <AreaChart data={dashboardData} syncId="anyId">
            <defs>
              <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00D6FF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#00D6FF" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />

            <XAxis
              axisLine={false}
              dataKey={
                selectedValue === "Yearly"
                  ? "year"
                  : selectedValue === "Monthly"
                  ? "month"
                  : "day"
              }
            />
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
              dataKey="total"
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
