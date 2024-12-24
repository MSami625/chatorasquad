import React, { useState } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import LineChartComponent from "./LineChartComponent"; 
import OrderBarChart from "./BarChart";

const ordersData = [
  { date: "2024-01-15", orders: 120, revenue: 900 },
  { date: "2024-02-10", orders: 200, revenue: 300 },
  { date: "2024-03-05", orders: 150, revenue: 460 },
  { date: "2024-04-20", orders: 300, revenue: 200 },
  { date: "2024-05-18", orders: 400, revenue: 409 },
  { date: "2024-06-22", orders: 220, revenue: 420 },
  { date: "2024-07-13", orders: 180, revenue: 700 },
  { date: "2024-12-05", orders: 350, revenue: 940 },
];

const OrderCharts = () => {
  const [filteredData, setFilteredData] = useState(ordersData);
  const [filterType, setFilterType] = useState("This Year");
  const [customRange, setCustomRange] = useState({ start: "", end: "" });

  const applyFilter = (type) => {
    const now = new Date();
    setFilterType(type);

    switch (type) {
      case "This Month": {
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        setFilteredData(
          ordersData.filter((d) => {
            const date = new Date(d.date);
            return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
          })
        );
        break;
      }
      case "This Year": {
        const currentYear = now.getFullYear();
        setFilteredData(
          ordersData.filter((d) => {
            const date = new Date(d.date);
            return date.getFullYear() === currentYear;
          })
        );
        break;
      }
      default:
        setFilteredData(ordersData);
    }
  };

  const applyCustomRange = () => {
    if (customRange.start && customRange.end) {
      const startDate = new Date(customRange.start);
      const endDate = new Date(customRange.end);
      setFilteredData(
        ordersData.filter((d) => {
          const date = new Date(d.date);
          return date >= startDate && date <= endDate;
        })
      );
    }
  };

  return (
    <div className="p-6 max-w-full mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Orders Bar Chart</h1>

      {/* Filter Section */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            filterType === "This Month" ? "bg-orange-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => applyFilter("This Month")}
        >
          This Month
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            filterType === "This Year" ? "bg-orange-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => applyFilter("This Year")}
        >
          This Year
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            filterType === "Custom Range" ? "bg-orange-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilterType("Custom Range")}
        >
          Custom Range
        </button>
      </div>

      {/* Custom Range Inputs */}
      {filterType === "Custom Range" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="flex flex-wrap justify-center gap-4 mb-6"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <DatePicker
              selected={customRange.start}
              onChange={(date) => setCustomRange({ ...customRange, start: date })}
              className="border rounded-lg px-4 py-2 w-full"
              placeholderText="Select start date"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <DatePicker
              selected={customRange.end}
              onChange={(date) => setCustomRange({ ...customRange, end: date })}
              className="border rounded-lg px-4 py-2 w-full"
              placeholderText="Select end date"
            />
          </div>
          <button
            className="px-4 py-2 text-sm font-medium bg-orange-500 text-white rounded-lg"
            onClick={applyCustomRange}
          >
            Apply
          </button>
        </motion.div>
      )}

      {/* Bar Chart */}
      <OrderBarChart filteredData={filteredData} />

      {/* Linear Chart for Orders vs Revenue */}
      <h2 className="text-xl font-bold text-center mt-8 mb-4">Orders vs Revenue By Dates</h2>
      <LineChartComponent data={filteredData} />
    </div>
  );
};

export default OrderCharts;