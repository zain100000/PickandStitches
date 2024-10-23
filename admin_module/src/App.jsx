import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signin from "./components/shared/Signin";
import Signup from "./components/shared/Signup";
import ForgotPassword from "./components/shared/ForgotPassword";
import Error404 from "./components/shared/Error404";
import Dashboard from "./components/screens/otherScreens/Dashboard";
import GentsOrders from "./components/screens/otherScreens/GentsOrders";
import LadiesOrders from "./components/screens/otherScreens/LadiesOrders";
import AddProducts from "./components/screens/otherScreens/AddProducts";
import GetProducts from "./components/screens/otherScreens/GetProducts";
import FeedBacks from "./components/screens/otherScreens/FeedBacks";
import OrderDetailsScreen from "./components/screens/otherScreens/OrderDetailsScreen";
import Outlets from "./components/ProtectedRoutes/Outlets";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoutes";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/signin" replace />} />
      <Route path="/auth/signin" element={<Signin />} />
      <Route path="/auth/signup" element={<Signup />} />
      <Route path="/auth/forgot_password" element={<ForgotPassword />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Outlets />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="gents_orders" element={<GentsOrders />} />
        <Route path="ladies_orders" element={<LadiesOrders />} />
        <Route path="add_products" element={<AddProducts />} />
        <Route path="get_products" element={<GetProducts />} />
        <Route path="feed_backs" element={<FeedBacks />} />
        <Route path="order_details/:id" element={<OrderDetailsScreen />} />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default App;
