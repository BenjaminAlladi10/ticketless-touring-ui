import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CreditCard, Calendar as CalendarIcon, Lock, CheckCircle2, QrCode, ArrowLeft, ShieldCheck, Mail } from 'lucide-react';

import userContext from '@/contexts/userContext';
import { clearCart } from "@/store/cartSlice";
import { useGetQRCode } from '@/hooks/usePayment';
import { EXTERNAL_ASSETS } from "@/constants/links";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from '@/components/ui/separator';

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
      toast.error("Please login to proceed");
      navigate("/login");
      return;
    }

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      navigate("/");
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
      toast.success("Payment successful! Check your email for tickets.");
      dispatch(clearCart());
    }
    catch (error) {
      toast.error(error.response?.data?.error?.errorMessage || "Payment processing failed. Please try again.");
    }
  }

  const handleClose = () => {
    setPaymentSuccess(false);
    navigate("/");
  };

  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/cart")} className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
            <p className="text-muted-foreground">Complete your purchase securely</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <Card className="lg:col-span-3 border-border/50 shadow-xl backdrop-blur-sm bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Payment Method
              </CardTitle>
              <CardDescription>All transactions are secure and encrypted</CardDescription>
            </CardHeader>
            <form onSubmit={handlePayment}>
              <CardContent className="space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="full_name">Cardholder Name</Label>
                  <Input id="full_name" placeholder="John Doe" required className="h-11" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <div className="relative">
                    <Input 
                      id="card-number" 
                      placeholder="0000 0000 0000 0000" 
                      required 
                      className="h-11 pr-12"
                      pattern="^[0-9 ]{12,19}$"
                    />
                    <div className="absolute right-3 top-3 flex gap-1">
                       <ShieldCheck className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="expiration">Expiration Date</Label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="expiration" 
                        type="date" 
                        min={new Date().toISOString().split('T')[0]} 
                        required 
                        className="h-11 pl-10" 
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="cvv" placeholder="123" type="password" maxLength="4" required className="h-11 pl-10" />
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-muted/50 p-4 border border-border/50">
                   <div className="flex items-center gap-3 text-sm">
                     <Mail className="h-5 w-5 text-primary" />
                     <span>Tickets will be sent to <strong>{user?.email}</strong></span>
                   </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-4">
                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20"
                  disabled={getQRCodeMutation.isPending}
                >
                  {getQRCodeMutation.isPending ? "Processing Payment..." : `Pay ₹${cartTotalAmount}`}
                </Button>
                <div className="flex justify-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all">
                  <img className="h-6" src={EXTERNAL_ASSETS.VISA_LOGO} alt="Visa" />
                  <img className="h-6" src={EXTERNAL_ASSETS.MASTERCARD_LOGO} alt="Mastercard" />
                  <img className="h-6" src={EXTERNAL_ASSETS.PAYPAL_LOGO} alt="Paypal" />
                </div>
              </CardFooter>
            </form>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tickets</span>
                  <span>{cartTotalQuantity}</span>
                </div>
                <Separator className="bg-border/50" />
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-black text-primary">₹{cartTotalAmount}</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col items-center gap-4 text-center p-6 rounded-2xl border border-dashed border-primary/30 bg-primary/5">
              <ShieldCheck className="h-10 w-10 text-primary" />
              <div className="space-y-1">
                <h4 className="font-bold">Secure Checkout</h4>
                <p className="text-xs text-muted-foreground">Certified SSL security ensures your data is protected.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={paymentSuccess} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md border-border/50 shadow-2xl">
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
               <CheckCircle2 className="h-10 w-10" />
            </div>
            <DialogTitle className="text-2xl text-center">Payment Successful!</DialogTitle>
            <DialogDescription className="text-center text-base">
              Your tickets have been issued and sent to your email.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-xl my-4">
            <p className="text-sm font-medium mb-3 flex items-center gap-2">
              <QrCode className="w-4 h-4" /> Digital Entry Pass
            </p>
            {qrCode && (
              <div className="rounded-lg bg-white p-3 shadow-inner">
                <img src={qrCode} alt="Ticket QR Code" className="h-48 w-48" />
              </div>
            )}
          </div>
          <Button onClick={handleClose} className="w-full h-11">
            Back to Home
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
