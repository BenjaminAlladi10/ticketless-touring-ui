import ReactDOM from 'react-dom/client';
import '@/index.css';
import App from '@/App';

import Body from '@/components/Body.jsx';
import About from '@/components/About.jsx';
import Contact from '@/components/Contact.jsx';
import Cart from '@/components/Cart.jsx';
import LogIn from '@/components/LogIn.jsx';
import ErrorPage from '@/components/ErrorPage.jsx';
import Admin from '@/components/Admin/Admin.jsx';
import PaymentForm from '@/components/PaymentForm.jsx';

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