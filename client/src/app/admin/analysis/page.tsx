"use client";
import { useState } from "react";
import React from "react";
import { Line } from "react-chartjs-2";
import { SocketContext } from "../layout";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";

const testData = [
  { testNo: 1, score: 80 },
  { testNo: 2, score: 85 },
  { testNo: 3, score: 50 },
  { testNo: 4, score: 40 },
  { testNo: 5, score: 70 },
  { testNo: 6, score: 50 },
  { testNo: 7, score: 30 },
  { testNo: 8, score: 70 },
  { testNo: 9, score: 80 },
  { testNo: 10, score: 30 },
];

const products = [
  { id: 1, name: "Milk" },
  { id: 2, name: "Bread" },
  { id: 3, name: "Cake" },
  { id: 11, name: "Soap" },
  { id: 12, name: "Toothpaste" },
  { id: 13, name: "Cooking Oil" },
  { id: 21, name: "Wheat" },
  { id: 22, name: "Rice" },
  { id: 23, name: "Dal" },
  { id: 31, name: "Potato" },
  { id: 32, name: "Onion" },
  { id: 33, name: "Tomato" },
  { id: 41, name: "Biscuits" },
  { id: 42, name: "Chips" },
  { id: 43, name: "Drinks" },
];

const AnalysisPage = () => {
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    Filler,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
  );
  const totalTests = testData.length;
  const [startIndex, setStartIndex] = useState(0);
  const [product, setProduct] = useState(1);

  const endIndex = (startIndex + 5) % totalTests;

  // Handle infinite loop for Next and Prev clicks
  const handleNextClick = () => {
    setStartIndex((prevIndex) => (prevIndex + 5) % totalTests);
  };

  const handlePrevClick = () => {
    setStartIndex((prevIndex) => (prevIndex - 5 + totalTests) % totalTests);
  };

  const slicedTestData =
    startIndex + 5 <= totalTests
      ? testData.slice(startIndex, startIndex + 5)
      : [...testData.slice(startIndex), ...testData.slice(0, endIndex)];

  const chartData = {
    labels: slicedTestData.map((test) => `Day ${test.testNo}`),
    datasets: [
      {
        label: "Demand",
        data: slicedTestData.map((test) => test.score),
        borderColor: "#000000",
        fill: true,
        backgroundColor: "rgba(46, 91, 255, 0.2)",
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "#2E5BFF",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        position: "bottom",
      },
      y: {
        grid: {
          color: "#EAEAEA",
          borderColor: "#EAEAEA",
          borderWidth: 1,
        },
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
        },
        position: "left",
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(46, 91, 255, 0.8)",
        bodyColor: "#EAEAEA",
        titleColor: "#EAEAEA",
      },
    },
  };
  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center">
      <div className="mt-2 mb-10">
        <h1>Select Product to Get Detailed Analysis</h1> 
        <select
          id="product"
          name="product"
          className="block w-full rounded-md border-0 py-1.5 px-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={product}
          onChange={(e) => setProduct(parseInt(e.target.value))}
        >
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>
      <div
        style={{
          width: "1000px",
          height: "400px",
          overflowX: "auto",
        }}
      >
        <Line data={chartData} options={chartOptions} />
      </div>
        <div className="flex gap-6 mt-8">
      <button onClick={handlePrevClick} className="bg-indigo-600 text-white p-2 rounded-md w-48">Previous 5 Days</button>
      <button onClick={handleNextClick} className="bg-indigo-600 text-white p-2 rounded-md w-48">Next 5 Days</button>
      </div>
    </div>
  );
};

export default AnalysisPage;
