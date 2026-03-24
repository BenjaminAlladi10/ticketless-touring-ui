import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userContext from '@/contexts/userContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { clearCart } from "@/store/cartSlice";
import Modal from 'react-modal';
import { Button } from "@/components/ui/button";
import { EXTERNAL_ASSETS } from "@/constants/links";
import { useGetQRCode } from '@/hooks/usePayment';

import "@/App.css";

export default function PaymentForm() {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const { cartTotalQuantity, cartTotalAmount } = useSelector((state) => state.cart);
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getQRCodeMutation = useGetQRCode();

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!user?.username) {
      toast.error("Please Login");
      navigate("/login");
      return;
    }

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    const data = {
      email: user?.email,
      cartItems: cartItems
    };

    try {
      const res = await getQRCodeMutation.mutateAsync(data);

      setQrCode(res.data.qrCode);
      setPaymentSuccess(true);
      toast.success("Check your email for ticket(s)");
      dispatch(clearCart());
    }
    catch (error) {
      toast.error(error.response?.data?.error?.errorMessage || "Payment failed");
    }
  }

  const closeModal = () => {
    setPaymentSuccess(false);
  };

  return (
    <section className="bg-white antialiased dark:bg-gray-800">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Payment</h2>

          <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
            <form onSubmit={handlePayment} className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8">
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="full_name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Full name (as displayed on card)* </label>
                  <input type="text" id="full_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-sky-500 focus:ring-sky-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-sky-500 dark:focus:ring-sky-500" placeholder="Bonnie Green" required />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="card-number-input" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Card number* </label>
                  <input type="text" id="card-number-input" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-sky-500 focus:ring-sky-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-sky-500 dark:focus:ring-sky-500" placeholder="xxxx-xxxx-xxxx-xxxx" pattern="^4[0-9]{12}(?:[0-9]{3})?$" required />
                </div>

                <div>
                  <label htmlFor="card-expiration-input" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Card expiration* </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                      <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          fillRule="evenodd"
                          d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input id="card-expiration-input" type="date" min={new Date().toISOString().split('T')[0]} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-9 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="12/23" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="cvv-input" className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
                    CVV*
                    <button type="button" data-tooltip-target="cvv-desc" data-tooltip-trigger="hover" className="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white">
                      <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </label>
                  <input type="number" id="cvv-input" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-sky-500 focus:ring-sky-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-sky-500 dark:focus:ring-sky-500" placeholder="•••" required />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={getQRCodeMutation.isPending} 
              >
                {getQRCodeMutation.isPending ? "Processing..." : "Pay Now"}
              </Button>
            </form>

            <div className="mt-6 grow sm:mt-8 lg:mt-0">
              <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex justify-between items-baseline mb-1">
                  <h1 className="text-gray-800 dark:text-gray-100 text-lg font-semibold">Total Quantity:</h1>
                  <span className="dark:text-gray-100">{cartTotalQuantity} item(s)</span>
                </div>

                <div className="flex justify-between items-baseline">
                  <h1 className="text-gray-800 dark:text-gray-100 text-lg font-semibold">Total Amount:</h1>
                  <span className="dark:text-gray-100">₹{cartTotalAmount}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-8 flex-wrap">
                <img className="h-8 w-auto dark:hidden" src={EXTERNAL_ASSETS.PAYPAL_LOGO} alt="PayPal" />
                <img className="hidden h-8 w-auto dark:flex" src={EXTERNAL_ASSETS.PAYPAL_LOGO_DARK} alt="PayPal" />
                <img className="h-8 w-auto dark:hidden" src={EXTERNAL_ASSETS.VISA_LOGO} alt="Visa" />
                <img className="hidden h-8 w-auto dark:flex" src={EXTERNAL_ASSETS.VISA_LOGO_DARK} alt="Visa" />
                <img className="h-8 w-auto dark:hidden" src={EXTERNAL_ASSETS.MASTERCARD_LOGO} alt="Mastercard" />
                <img className="hidden h-8 w-auto dark:flex" src={EXTERNAL_ASSETS.MASTERCARD_LOGO_DARK} alt="Mastercard" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={paymentSuccess}
        onRequestClose={closeModal}
        contentLabel="QR Code Modal"
        className="modal"
        overlayClassName="overlay"
        ariaHideApp={false}
      >
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg max-w-sm mx-auto shadow-xl">
          <h2 className="text-2xl font-semibold text-center mb-4 text-gray-900 dark:text-white">Payment Successful!</h2>
          <p className="text-center text-gray-700 dark:text-gray-300">Here is your QR Code:</p>
          {qrCode && (
            <div className="flex justify-center mt-4">
              <img src={qrCode} alt="QR Code" className="h-40 w-40" />
            </div>
          )}
          <Button onClick={closeModal} className="mt-6 w-full">
            Close
          </Button>
        </div>
      </Modal>
    </section>
  )
}
