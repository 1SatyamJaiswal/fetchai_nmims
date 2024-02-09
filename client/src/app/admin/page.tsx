"use client";
import { Fragment, useContext, useEffect, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
// import {
//   ScaleIcon,
//   ShieldCheckIcon,
//   UserGroupIcon,
//   XIcon,
// } from '@heroicons/react/outline'
// import {
//   CashIcon,
//   CheckCircleIcon,
//   ChevronDownIcon,
//   ChevronRightIcon,
//   OfficeBuildingIcon,
//   SearchIcon,
// } from '@heroicons/react/solid'
import {
  BuildingOffice2Icon
} from '@heroicons/react/24/solid'
import SellModal from '@/components/SellModal'
import RestockModal from '@/components/RestockModal';
import Forecast from '@/components/Forecast';
import Sales from '@/components/Sales';
// import { SocketContext } from './layout';

const cards = [
  // { name: 'Total Revenue', href: '#', icon: ScaleIcon, amount: '₹1,00,000' },
  // More items...
]
// const transactions = [
//   {
//     id: 1,
//     name: 'Potato',
//     href: '#',
//     quantity: '10',
//     amount: '1000',
//     currency: 'INR',
//     status: 'sold',
//     date: '2020-07-11',
//     time: '10:45 PM'
//   },
// ]
const statusStyles = {
  sold: 'bg-green-100 text-green-800',
  restock: 'bg-gray-100 text-gray-800',
}

function classNames(...classes:string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Home() {
  const [sellOpen, setSellOpen] = useState(false)
  const [restockOpen, setRestockOpen] = useState(false)
  const [Revenue, setRevenue] = useState(0)

  // const socket = useContext(SocketContext);

  const [transactions, setTransactions] = useState<any>([])


  // useEffect(() => {
    // if (transactions.length == 0){
    // socket?.emit('sales');

    // socket?.on('send_products', (data) => {
    //   let sum= 0
    //   console.log('daaataa',data);
    //   // data.data.forEach(element => {
    //   //     console.log('element',element);
    //   //     transactions.push(element);
          
    //   // });
    //   // data.data.reverse()
    //   data.data.forEach(element => {
    //     sum +=  element[4]*element[3];
    //   });
    //   setRevenue(sum)
    //   transactions.reverse()

    //   setTransactions(data.data);
    //   console.log('transactions',transactions);
      
      
    // })}
  // },[socket?.connected])

  return (
    <>
      <SellModal open={sellOpen} setOpen={setSellOpen}/>
      <RestockModal open={restockOpen} setOpen={setRestockOpen}/>
      <main className="flex-1 pb-8">
        {/* Page header */}
        <div className="bg-white shadow">
          <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
              <div className="flex-1 min-w-0">
                {/* Profile */}
                <div className="flex items-center ">
                  <div>
                    <div className="flex items-center ">
                      <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate ">
                        Hello, Saty
                      </h1>
                    </div>
                    <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                      <dt className="sr-only">Company</dt>
                      <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                        <BuildingOffice2Icon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        Mumbai
                      </dd>
                      <dt className="sr-only">Account status</dt>
                      <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                        
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setRestockOpen(true)}
                >
                  Restock Product
                </button>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setSellOpen(true)}
                >
                  Sell Product
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Overview</h2>
            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Card */}
              {cards.map((card) => (
                <div key={card.name} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <card.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">{ card.name}</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">₹{Revenue}</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-5 py-3">
                    <div className="text-sm">
                      <a href={card.href} className="font-medium text-indigo-700 hover:text-indigo-900">
                        View all
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* <Forecast/>/ */}
            <Sales/>
          </div>
{/* 
          <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
            Recent Activities
          </h2> */}

          <div className="shadow sm:hidden">
            <ul role="list" className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
              {transactions.map((transaction,i) => {
                return <li key={i}>
                  <div className="block px-4 py-4 bg-white hover:bg-gray-50">
                    <span className="flex items-center space-x-4">
                      <span className="flex-1 flex space-x-2 truncate">
                        <span className="flex flex-col text-gray-500 text-sm truncate">
                          <span className="truncate">{transaction[2]}</span>
                          <span>Quantity: {transaction[3]} Amount: <span className="text-gray-900 font-medium">{transaction[4]}</span>{' '}
                          {/* {transaction.currency} */}
                          </span>
                          <time>{transaction[1]}, {transaction[1]}</time>
                        </span>
                      </span>
                      <span
                          className={classNames(
                            // statusStyles[transaction.status],
                            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize'
                          )}
                        >
                          {/* {transaction.status} */}
                       </span>
                    </span>
                  </div>
                </li>})
              }
            </ul>
          </div>

          {/* Activity table (small breakpoint and up) */}
          <div className="hidden sm:block">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ">
              <div className="flex flex-col mt-2">
                <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                  {/* <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Time
                        </th>
                        
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 self-center ">
                      {transactions.map((transaction,i) => (
                        <tr key={i} className="bg-white">
                          <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <span className="text-gray-900 font-medium">{transaction[2]} </span>
                          </td>
                          <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                            <span className="text-gray-900 font-medium">{transaction[3]} </span>
                          </td>
                          <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                            <span className="text-gray-900 font-medium">{transaction[4]} </span>
                            
                          </td>
                          <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                            <time>{new Date(transaction[1]).toLocaleDateString()}</time>
                          </td>
                          <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                            <time>{new Date(transaction[1]).toLocaleTimeString()}</time>
                          </td>
                          <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                            <span
                        
                            >
                             
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
