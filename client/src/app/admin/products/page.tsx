'use client';
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { SocketContext } from '../layout';
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
} from 'chart.js';
/* This example requires Tailwind CSS v2.0+ */
const products = [
  {
    id: 'AAPS0L',
    company: 'Chase & Co.',
    share: 'CAC',
    commission: '+$4.37',
    price: '$3,509.00',
    quantity: '12.00',
    netAmount: '$4,397.00',
  },
  // More products...
];

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

export default function Page() {
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
    labels: slicedTestData.map((test) => `Test ${test.testNo}`),
    datasets: [
      {
        label: 'Score',
        data: slicedTestData.map((test) => test.score),
        borderColor: '#000000',
        fill: true,
        backgroundColor: 'rgba(46, 91, 255, 0.2)',
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: '#2E5BFF',
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
        position: 'bottom',
      },
      y: {
        grid: {
          color: '#EAEAEA',
          borderColor: '#EAEAEA',
          borderWidth: 1,
        },
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
        },
        position: 'left',
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(46, 91, 255, 0.8)',
        bodyColor: '#EAEAEA',
        titleColor: '#EAEAEA',
      },
    },
  };

  const [products, setProducts] = useState([])

  const send_products = (data) => {
    console.log('sp',data);
    setProducts(data.data)
  }


  const socket = React.useContext(SocketContext);
  React.useEffect(() => {
    // if (!socket?.connected) {
    console.log('connecting 1');

    // }

    socket?.emit('get_products');
    socket?.on('send_products', send_products);

    return () => {
      socket?.off('send_products', send_products);
    };
  });
  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-10">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Products</h1>
          <p className="mt-2 text-sm text-gray-700">
            List of all the available products
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                     ID
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Item
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Date Bought In
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Cost Price
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Selling Price
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {products.map((product) => (
                    <tr key={product[0]}>
                      <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                        {product[0]}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                        {product[1]}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">
                        {product[3]}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        {product[7]}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        {product[5]}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        {product[6]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
