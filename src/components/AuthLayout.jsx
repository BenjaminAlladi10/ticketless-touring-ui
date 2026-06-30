import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/themeContext';
import { UserProvider } from '@/contexts/userContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { getTotals } from '@/store/cartSlice';
import { useCurrentUser } from '@/hooks/useAuth';

export default function AuthLayout() {
  const [theme, setTheme] = useState(localStorage.getItem('preferredTheme') || 'dark');
  const changeTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector('html').classList.add('dark');
    } else {
      document.querySelector('html').classList.remove('dark');
    }
    localStorage.setItem('preferredTheme', theme);
  }, [theme]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotals());
  });

  const [user, setUser] = useState();
  const { data: currentUser } = useCurrentUser();
  useEffect(() => {
    if (currentUser !== undefined) setUser(currentUser);
  }, [currentUser]);

  return (
    <UserProvider value={{ user, setUser }}>
      <ThemeProvider value={{ theme, changeTheme }}>
        {/* Full viewport — no NavBar or Footer */}
        <div className="h-screen w-screen overflow-hidden dark:bg-gray-900 bg-background">
          <Outlet />
        </div>
        <ToastContainer position="bottom-right" autoClose={2000} theme="colored" />
      </ThemeProvider>
    </UserProvider>
  );
}
