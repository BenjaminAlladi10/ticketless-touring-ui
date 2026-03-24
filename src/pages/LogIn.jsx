import React, { useState, useContext } from 'react';
import { Button } from "@/components/ui/button";
import userContext from '@/contexts/userContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLogin, useRegister } from '@/hooks/useAuth';

export default function LogIn() {
  const [showLogin, setShowLogin] = useState(true);

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', fullName: '', email: '', password: '', termsAccepted: false });

  const { setUser } = useContext(userContext);
  const navigate = useNavigate();

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData({ ...registerData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginMutation.mutateAsync(loginData);
      const userData = { ...data.data.user };
      setUser(userData);
      toast.success(`Welcome back, ${data.data.user.username}`);
      navigate("/");
    }
    catch (error) {
      toast.error('Login failed: ' + (error.response?.data?.error?.errorMessage || "Unknown error"));
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (!registerData.termsAccepted) {
      toast.warning('Please accept the terms and conditions.');
      return;
    }

    if ([registerData.username, registerData.email, registerData.password].some((field) => !field?.trim())) {
      toast.warning("All fields are required.");
      return;
    }

    try {
      await registerMutation.mutateAsync(registerData);
      toast.info("Registration successful. Please Login to continue.")
      setShowLogin(true);
      navigate("/login");
    }
    catch (error) {
      toast.error('Registration failed: ' + (error.response?.data?.error?.errorMessage || "Unknown error"));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto py-6 px-4 flex flex-col justify-center items-center border border-gray-400 rounded-md shadow-md my-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="mb-6 flex gap-2">
        <Button 
          variant={showLogin ? "default" : "outline"} 
          onClick={() => setShowLogin(true)}
          className="rounded-full"
        >
          Log In
        </Button>
        <Button 
          variant={!showLogin ? "default" : "outline"} 
          onClick={() => setShowLogin(false)}
          className="rounded-full"
        >
          Register
        </Button>
      </div>

      {showLogin ? (
        <form onSubmit={handleLoginSubmit} className="flex flex-col gap-y-6 items-center w-full">
          <input 
            type="email" 
            name='email' 
            placeholder="E-mail" 
            value={loginData.email}
            onChange={handleLoginChange} 
            className="w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:ring-2 focus:ring-sky-500 dark:bg-slate-700 dark:border-white/10 dark:text-white"
            required
          />
          <input 
            type="password" 
            name='password' 
            placeholder="Password" 
            value={loginData.password}
            onChange={handleLoginChange} 
            className="w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:ring-2 focus:ring-sky-500 dark:bg-slate-700 dark:border-white/10 dark:text-white"
            required
          />
          <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-600 text-white">
            Log In
          </Button>
        </form>
      ) : (
        <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-y-6 items-center w-full">
          <input 
            type="text" 
            name='username' 
            placeholder="Username" 
            required 
            value={registerData.username} 
            onChange={handleRegisterChange} 
            className="w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:ring-2 focus:ring-sky-500 dark:bg-slate-700 dark:border-white/10 dark:text-white"
          />
          <input 
            type="text" 
            name='fullName' 
            placeholder="Full Name" 
            required 
            value={registerData.fullName} 
            onChange={handleRegisterChange} 
            className="w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:ring-2 focus:ring-sky-500 dark:bg-slate-700 dark:border-white/10 dark:text-white"
          />
          <input 
            type="email" 
            name='email' 
            placeholder="E-mail" 
            required 
            value={registerData.email} 
            onChange={handleRegisterChange} 
            className="w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:ring-2 focus:ring-sky-500 dark:bg-slate-700 dark:border-white/10 dark:text-white"
          />
          <input 
            type="password" 
            name='password' 
            placeholder="Password" 
            required 
            value={registerData.password} 
            onChange={handleRegisterChange} 
            className="w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:ring-2 focus:ring-sky-500 dark:bg-slate-700 dark:border-white/10 dark:text-white"
          />
          <div className="flex items-center w-full">
            <input 
              type="checkbox" 
              name="termsAccepted" 
              checked={registerData.termsAccepted} 
              onChange={handleRegisterChange} 
              id="terms" 
              className="mr-2"
            />
            <label htmlFor="terms" className="text-sm dark:text-gray-200">I agree to the terms and conditions.</label>
          </div>
          <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-600 text-white">
            Register
          </Button>
        </form>
      )}
    </div>
  );
}
