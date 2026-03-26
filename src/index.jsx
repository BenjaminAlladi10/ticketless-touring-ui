import ReactDOM from 'react-dom/client';
import '@/index.css';
import App from '@/App';

import Body from '@/pages/Body.jsx';
import About from '@/pages/About.jsx';
import Contact from '@/pages/Contact.jsx';
import Cart from '@/pages/Cart.jsx';
import LogIn from '@/pages/LogIn.jsx';
import ErrorPage from '@/pages/ErrorPage.jsx';
import Admin from '@/components/Admin/Admin.jsx';
import PaymentForm from '@/pages/PaymentForm.jsx';

import { Provider } from "react-redux";
import appStore from '@/store/store.js';

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: "/",
        element: <Body />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/login",
        element: <LogIn />
      },
      {
        path: "/admin",
        element: <Admin />
      },
      {

        path: "/checkout/payment",
        element: <PaymentForm />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={appStore}>
    <RouterProvider router={router} />
  </Provider>
);