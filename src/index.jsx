import ReactDOM from 'react-dom/client';
import '@/index.css';
import App from '@/App';
import AuthLayout from '@/components/AuthLayout.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Body from '@/pages/Body.jsx';
import About from '@/pages/About.jsx';
import Contact from '@/pages/Contact.jsx';
import Cart from '@/pages/Cart.jsx';
import LogIn from '@/pages/LogIn.jsx';
import ForgotPassword from '@/pages/ForgotPassword.jsx';
import ResetPassword from '@/pages/ResetPassword.jsx';
import ErrorPage from '@/pages/ErrorPage.jsx';
import Admin from '@/components/Admin/Admin.jsx';
import PaymentForm from '@/pages/PaymentForm.jsx';
import ProtectedRoute from '@/components/ProtectedRoute.jsx';

import { Provider } from "react-redux";
import appStore from '@/store/store.js';

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  // ── Main app layout (NavBar + Footer) ──────────────────────────────
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Body /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/cart", element: <Cart /> },
      {
        path: "/admin",
        element: (
          <ProtectedRoute requireAdmin={true}>
            <Admin />
          </ProtectedRoute>
        )
      },
      { path: "/checkout/payment", element: <PaymentForm /> },
    ]
  },

  // ── Auth layout (no NavBar / Footer, full viewport) ─────────────────
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LogIn /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/reset-password", element: <ResetPassword /> },
      { path: "/reset-password/:token", element: <ResetPassword /> },
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={appStore}>
      <RouterProvider router={router} />
    </Provider>
  </QueryClientProvider>
);