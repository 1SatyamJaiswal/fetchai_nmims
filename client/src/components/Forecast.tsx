// 'use client' sales
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend,CategoryScale, LinearScale } from "chart.js";
import 'chart.js/auto'
const Forecast = () => {
  // Actual and predicted sales data
  // ChartJS.register(CategoryScale,LinearScale)  
  const actualSales = [
    889, 902, 969, 947, 908, 867, 815, 812, 773, 813, 834, 782,
  ];
  const predictedSales = [
    894, 919, 953, 945, 916, 873, 821, 820, 793, 814, 837, 812, 899, 928, 956,
    959, 941, 908, 852, 844, 817, 824,
  ];

  const monthNames = [
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    "January",
    "February",
  ];

  // Number of data points to show at a time
  const dataPointsPerPage = 18;

  // State to manage the current page index
  const [currentPage, setCurrentPage] = useState(0);

  // Calculate the start and end indices for the current page
  const startIndex = currentPage * dataPointsPerPage;
  const endIndex = startIndex + dataPointsPerPage;

  // Labels for the x-axis (months) based on the current page
  const months = Array.from(
    { length: predictedSales.length },
    (_, i) => `${monthNames[i % 12]}`
  ).slice(startIndex, endIndex);

  // Data for the chart based on the current page
  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Actual Sales",
        data: actualSales.slice(startIndex, endIndex),
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        fill: false,
      },
      {
        label: "Predicted Sales",
        data: predictedSales.slice(startIndex, endIndex),
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "rgba(0,0,0,0.05)",
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  // Function to handle next page button click
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Function to handle previous page button click
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 align-middle justify-center">
      <h2 className="text-2xl font-semibold mb-4">Future Sales Forecast</h2>
      <div className="bg-white p-4 ">
        <Line data={chartData} options={chartOptions} />
        <div className="flex justify-between mt-4">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded w-28"
            onClick={handlePrevPage}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded w-28"
            onClick={handleNextPage}
            disabled={endIndex >= predictedSales.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Forecast;