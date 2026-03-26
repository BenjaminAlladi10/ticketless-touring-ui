import React, { useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Menu, ShoppingCart, Moon, Sun, LogOut, User, LayoutDashboard } from 'lucide-react';

import themeContext from '@/contexts/themeContext';
import userContext from '@/contexts/userContext';
import { useLogout } from '@/hooks/useAuth';
import userImg from '@/assets/userImg.jpg';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

export default function NavBar() {
  const { user, setUser } = useContext(userContext);
  const { theme, changeTheme } = useContext(themeContext);
  const logoutMutation = useLogout();
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleLogout = async () => {
    const ans = window.confirm("Are you sure you want to log out?");
    if (ans) {
      try {
        await logoutMutation.mutateAsync();
        setUser();
        toast.success("Logged out");
      }
      catch (error) {
        console.error(error);
        toast.error("Logout failed");
      }
    }
  };

  const NavLinks = ({ className = "" }) => (
    <div className={`flex items-center space-x-6 ${className}`}>
      <NavLink to="/" className={({ isActive }) =>
        `text-sm font-medium transition-colors hover:text-primary ${isActive ? "text-primary" : "text-muted-foreground"}`
      }>
        Home
      </NavLink>
      <NavLink to="/about" className={({ isActive }) =>
        `text-sm font-medium transition-colors hover:text-primary ${isActive ? "text-primary" : "text-muted-foreground"}`
      }>
        About
      </NavLink>
      <NavLink to="/contact" className={({ isActive }) =>
        `text-sm font-medium transition-colors hover:text-primary ${isActive ? "text-primary" : "text-muted-foreground"}`
      }>
        Contact
      </NavLink>
      {user?.isAdmin && (
        <NavLink to="/admin" className={({ isActive }) =>
          `text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${isActive ? "text-primary" : "text-muted-foreground"}`
        }>
          Admin
        </NavLink>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-md supports-[backdrop-filter]:bg-background/40">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
              Ticketless Touring
            </span>
          </Link>
          <nav className="hidden md:flex">
            <NavLinks />
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={changeTheme}
            className="h-9 w-9"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 transition-all" />
            ) : (
              <Moon className="h-5 w-5 transition-all" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative h-9 w-9">
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {cartItems.length}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>

          <Separator orientation="vertical" className="mx-2 h-6 hidden md:block" />

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium leading-none">{user.username}</span>
                  <button
                    onClick={handleLogout}
                    className="text-[10px] text-muted-foreground hover:text-destructive flex items-center gap-1"
                  >
                    Logout <LogOut className="w-3 h-3" />
                  </button>
                </div>
                <div className="h-8 w-8 rounded-full border overflow-hidden">
                  <img src={userImg} alt={user.username} className="h-full w-full object-cover" />
                </div>
              </div>
            ) : (
              <Link to="/login">
                <Button size="sm" className="px-5">Login</Button>
              </Link>
            )}
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 py-8">
                <NavLink to="/" className={({ isActive }) =>
                  `text-lg font-medium transition-colors hover:text-primary ${isActive ? "text-primary" : "text-muted-foreground"}`
                }>Home</NavLink>
                <NavLink to="/about" className={({ isActive }) =>
                  `text-lg font-medium transition-colors hover:text-primary ${isActive ? "text-primary" : "text-muted-foreground"}`
                }>About</NavLink>
                <NavLink to="/contact" className={({ isActive }) =>
                  `text-lg font-medium transition-colors hover:text-primary ${isActive ? "text-primary" : "text-muted-foreground"}`
                }>Contact</NavLink>
                {user?.isAdmin && (
                  <NavLink to="/admin" className={({ isActive }) =>
                    `text-lg font-medium transition-colors hover:text-primary flex items-center gap-2 ${isActive ? "text-primary" : "text-muted-foreground"}`
                  }>
                    <LayoutDashboard className="w-5 h-5" /> Admin Dashboard
                  </NavLink>
                )}
                <Separator className="my-2" />
                {user ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full border overflow-hidden">
                        <img src={userImg} alt={user.username} className="h-full w-full object-cover" />
                      </div>
                      <span className="font-medium">{user.username}</span>
                    </div>
                    <Button variant="outline" onClick={handleLogout} className="justify-start gap-2 text-destructive border-destructive/20 hover:bg-destructive/10">
                      <LogOut className="w-4 h-4" /> Logout
                    </Button>
                  </div>
                ) : (
                  <Link to="/login">
                    <Button className="w-full">Login</Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}