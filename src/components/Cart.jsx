import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMonument, clearCart, getTotals, removeMonument } from '@/store/cartSlice';
import { toast } from 'react-toastify';
import userContext from '@/contexts/userContext';
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";

const Cart = () => {

  const { cartItems, cartTotalQuantity, cartTotalAmount } = useSelector((state) => state.cart);

  const { user } = useContext(userContext);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleIncrement = (item) => {
    if (item.quantity >= 10) {
      toast.info("Maximum 10 tickets allowed per monument.");
      return;
    }
    dispatch(addMonument({ ...item, quantity: item.quantity + 1 }));
    dispatch(getTotals());
    toast.success(`Added +1 item(s) to Cart`);
  };

  const handleDecrement = (item) => {
    if (item.quantity <= 1) {
      dispatch(removeMonument(item._id));
      dispatch(getTotals());

      toast.warning("Item removed from Cart");
      return;
    }

    dispatch(addMonument({ ...item, quantity: item.quantity - 1 }));
    dispatch(getTotals());
    toast.info("1 ticket removed from Cart");
  };

  if (cartItems?.length === 0) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
          Cart is Empty!
        </p>
      </div>
    );
  }

  const handleCheckout = () => {
    if (!user?.username) {
      toast.error("Please Login!");
      navigate("/login");
      return;
    }
    navigate("/checkout/payment");
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col justify-start items-center gap-2 w-full max-w-2xl mx-auto">

        <div className="flex justify-between w-full px-6 text-gray-900 dark:text-gray-300 mb-4">
          <h1 className="font-semibold text-xl">Cart</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => dispatch(clearCart())}
          >
            Clear
          </Button>
        </div>

        {cartItems.map((item, index) => (

          <div key={index} className="flex flex-col md:flex-row md:justify-between items-center p-4 w-full gap-x-8 rounded-lg shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:scale-[1.02] transition-transform">
            <div>
              <h2 className="text-lg text-gray-800 dark:text-white font-semibold">
                {item.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Price: ₹{item.price}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tickets: {item.quantity}</p>
            </div>

            <div className="flex flex-col items-center">
              <img src={item.image} alt="" className="w-24 h-auto rounded shadow-sm mb-2" />

              <div className="flex justify-center items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-r-none border-r-0"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </Button>
                <span className="px-4 py-1 text-sm border-y text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-700">
                  {item.quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-l-none border-l-0"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        ))}

        <div className="w-full mt-6 px-6">
          <div className="flex justify-between items-baseline mb-1">
            <h1 className="text-gray-800 dark:text-gray-100 text-lg font-semibold">Total Quantity:</h1>
            <span className="dark:text-gray-100">{cartTotalQuantity} item(s)</span>
          </div>

          <div className="flex justify-between items-baseline mb-4">
            <h1 className="text-gray-800 dark:text-gray-100 text-lg font-semibold">Total Amount:</h1>
            <span className="dark:text-gray-100">₹{cartTotalAmount}</span>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleCheckout} className="w-full sm:w-auto">
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
