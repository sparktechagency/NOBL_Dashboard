import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// This is a placeholder for your actual SelectBox component.
// To make this fully functional, you would import your own component:
// import SelectBox from "../share/SelectBox";
const SelectBox = ({ options, value, onChange }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

// Define the type for the props, matching the provided example
interface RevenueChartProps {
  dashboardData: any[]; // Data for the chart
  selectedValue: "Weekly" | "Monthly" | "Yearly";
  setSelectedValue: (value: "Weekly" | "Monthly" | "Yearly") => void;
}

const RevenueChart = ({
  dashboardData,
  selectedValue,
  setSelectedValue,
}: RevenueChartProps) => {
  const selectOptions = [
    { value: "Weekly", label: "Weekly" },
    { value: "Monthly", label: "Monthly" },
    { value: "Yearly", label: "Yearly" },
  ];

  return (
    // Main container with responsive padding
    <div className="rounded-2xl mt-6 p-4 sm:p-6 bg-white shadow-lg">
      {/* Header with responsive flex layout */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-2xl font-medium text-black">User statistics</h3>
        <div className="w-full sm:w-36">
          <SelectBox
            options={selectOptions}
            value={selectedValue}
            onChange={(value) => setSelectedValue(value)}
          />
        </div>
      </div>
      {/* Chart container */}
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
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
              tickLine={false}
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
              tickLine={false}
              tickFormatter={(value) => value}
              // Using the specific ticks from your example
              ticks={[
                0, 20, 40, 60, 80, 100, 200, 500, 1000, 5000, 10000, 15000,
              ]}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="total"
              stroke="#00D6FF"
              fill="url(#colorAmt)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
