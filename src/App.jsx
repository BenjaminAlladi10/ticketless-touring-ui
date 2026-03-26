import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import { Outlet } from 'react-router-dom';

import { ThemeProvider } from '@/contexts/themeContext';
import { UserProvider } from '@/contexts/userContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { getTotals } from "@/store/cartSlice";

const queryClient = new QueryClient();

function App() {
  const [theme, setTheme]= useState(localStorage.getItem("preferredTheme") || "dark");

  const changeTheme= ()=>{
    const newTheme= theme==="dark"?"light":"dark";
    setTheme(newTheme);
  };

  useEffect(()=>{
    if (theme === "dark") {
      document.querySelector("html").classList.add('dark');
    } else {
      document.querySelector("html").classList.remove('dark');
    }
    localStorage.setItem("preferredTheme", theme);
  }, [theme]);

  const dispatch= useDispatch();
  useEffect(()=>{
    dispatch(getTotals());
  })

  const [user, setUser]= useState();

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider value={{user, setUser}}>
        <ThemeProvider value={{theme, changeTheme}}>
          <div className="flex flex-col justify-between min-h-screen dark:bg-gray-800 dark:border-gray-70">
            <NavBar/>
            <Outlet/>
            <ToastContainer position="bottom-right" autoClose={2000} theme="colored"/>
            <Footer/>
          </div>
        </ThemeProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
