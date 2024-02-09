"use client";
import { Fragment, useContext, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
// import { CheckIcon } from "@heroicons/react/outline";
// import { UserCircleIcon } from "@heroicons/react/solid";
// import { SocketContext } from "@/app/layout";
// 
interface ExampleComponentProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const products = [
    { id: 1, name: 'Milk' },
    { id: 2, name: 'Bread' },
    { id: 3, name: 'Cake' },
    { id: 11, name: 'Soap' },
    { id: 12, name: 'Toothpaste' },
    { id: 13, name: 'Cooking Oil' },
    { id: 21, name: 'Wheat' },
    { id: 22, name: 'Rice' },
    { id: 23, name: 'Dal' },
    { id: 31, name: 'Potato' },
    { id: 32, name: 'Onion' },
    { id: 33, name: 'Tomato' },
    { id: 41, name: 'Biscuits' },
    { id: 42, name: 'Chips' },
    { id: 43, name: 'Drinks' },
];

const RestockModal: React.FC<ExampleComponentProps> = ({ open, setOpen }) => {
  const cancelButtonRef = useRef(null);
  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [product, setProduct] = useState(1);
  // const socket = useContext(SocketContext);

  const handleItemSell = () => {
    console.log("id: ", product);
    console.log("Quantity: ", quantity);
    console.log("Amount: ", amount);

    // socket?.emit("restock", {
    //   mode: "restock",
    //   id: product,
    //   quantity: quantity,
    //   amount: amount,
    // });

    setOpen(false);
  };

  





  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Restock Product
                    </h2>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-12">
                        <label
                          htmlFor="product"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Product
                        </label>
                        <div className="mt-2">
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
                      </div>

                      <div className="sm:col-span-12">
                        <label
                          htmlFor="quantity"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Quantity
                        </label>
                        <div className="mt-2">
                        <input
                            type="number"
                            name="quantity"
                            id="quantity"
                            className="block w-full rounded-md border-0 py-1.5 px-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Enter Quantity"
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                        />
                        </div>
                      </div>

                      <div className="sm:col-span-12">
                        <label
                          htmlFor="amount"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Price (in Rupees)
                        </label>
                        <div className="mt-2">
                        <input
                            type="number"
                            name="price"
                            id="price"
                            className="block w-full rounded-md border-0 py-1.5 px-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Enter Amount"
                            onChange={(e) => setAmount(parseInt(e.target.value))}
                        />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  onClick={handleItemSell}
                >
                  Restock
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default RestockModal;
