// Sales.js
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import 'chart.js/auto'

const Sales = () => {
  const totalSales = [
    894, 919, 953, 945, 916, 873, 821, 820, 793, 814, 837, 812, 899, 928, 956,
    959, 941, 908, 852, 844, 817, 824, 890, 901, 935, 927, 888, 845, 792, 791,
    764, 785, 808, 783, 870, 899, 928, 956, 959, 941, 908, 852, 844, 817, 824,
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
    { length: totalSales.length },
    (_, i) => `${monthNames[i % 12]}`
  ).slice(startIndex, endIndex);

  // Data for the chart based on the current page
  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Sales",
        data: totalSales.slice(startIndex, endIndex),
        borderColor: "rgb(99,0,111)",
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
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Total Sales</h2>
      <div className="bg-white p-4 ">
        <Line data={chartData} options={chartOptions} />
        <div className="flex justify-between mt-4">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            onClick={handlePrevPage}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleNextPage}
            disabled={endIndex >= totalSales.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sales;