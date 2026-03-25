import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMonument, clearCart, getTotals, removeMonument } from '@/store/cartSlice';
import { toast } from 'react-toastify';
import userContext from '@/contexts/userContext';
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, IndianRupee } from 'lucide-react';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

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
  };

  if (cartItems?.length === 0) {
    return (
      <div className="container flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="rounded-full bg-muted p-6 text-muted-foreground">
          <ShoppingCart className="h-12 w-12" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Your cart is empty</h2>
        <p className="text-muted-foreground">Looks like you haven't added any tickets yet.</p>
        <Button onClick={() => navigate("/")} className="mt-4">
          Browse Monuments
        </Button>
      </div>
    );
  }

  const handleCheckout = () => {
    if (!user?.username) {
      toast.error("Please login to proceed to checkout!");
      navigate("/login");
      return;
    }
    navigate("/checkout/payment");
  }

  return (
    <div className="container py-12 md:py-24">
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        <div className="flex-1 w-full space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
              <p className="text-muted-foreground">Manage your monument tickets</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                dispatch(clearCart());
                toast.info("Cart cleared");
              }}
              className="text-destructive hover:bg-destructive/10 hover:text-destructive gap-2"
            >
              <Trash2 className="h-4 w-4" /> Clear Cart
            </Button>
          </div>

          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <Card key={index} className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/20">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row items-center gap-6 p-4">
                    <img src={item.image} alt={item.name} className="w-24 h-24 rounded-lg object-cover shadow-md" />
                    
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-lg font-bold">{item.name}</h3>
                      <div className="flex items-center justify-center sm:justify-start gap-1 text-primary font-semibold mt-1">
                        <IndianRupee className="w-3.5 h-3.5" />
                        <span>{item.price} per ticket</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-3 pr-4">
                      <div className="flex items-center border rounded-lg bg-background p-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-md"
                          onClick={() => handleDecrement(item)}
                        >
                          {item.quantity === 1 ? <Trash2 className="h-4 w-4 text-destructive" /> : <Minus className="h-4 w-4" />}
                        </Button>
                        <span className="w-10 text-center font-bold text-lg">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-md"
                          onClick={() => handleIncrement(item)}
                          disabled={item.quantity >= 10}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm font-bold">
                        Total: ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="w-full lg:w-[400px] border-border/50 shadow-2xl backdrop-blur-md bg-card/50 sticky top-24">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>Review your tickets before payment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">Total Tickets</span>
              <span className="font-semibold">{cartTotalQuantity}</span>
            </div>
            <Separator className="bg-border/50" />
            <div className="flex justify-between items-center py-4">
              <span className="text-xl font-bold">Total Amount</span>
              <span className="text-2xl font-black text-primary flex items-center">
                <IndianRupee className="h-5 w-5" />
                {cartTotalAmount}
              </span>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleCheckout} className="w-full h-12 text-lg font-bold gap-2 shadow-lg shadow-primary/20">
              Proceed to Payment <ArrowRight className="h-5 w-5" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Cart;
