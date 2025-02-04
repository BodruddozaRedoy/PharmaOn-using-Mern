import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/Home/HomePage";
import RegisterPage from "./pages/Register/RegisterPage";
import LoginPage from "./pages/Login/LoginPage";
import "./index.css";
import ShopPage from "./pages/Shop/ShopPage";
import CartPage from "./pages/Cart/CartPage";
import useAuth from "./hooks/useAuth";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import AdminHomepage from "./pages/Dashboard/Admin/AdminHomepage";
import ManageUser from "./pages/Dashboard/Admin/ManageUser";
import ManageCategory from "./pages/Dashboard/Admin/ManageCategory";
import SalesReport from "./pages/Dashboard/Admin/SalesReport";
import BannerAdvertise from "./pages/Dashboard/Admin/BannerAdvertise";
import PaymentManagement from "./pages/Dashboard/Admin/PaymentManagement";
import SellerHomepage from "./pages/Dashboard/Seller/SellerHomepage";
import ManageMedicines from "./pages/Dashboard/Seller/ManageMedicines";
import AskForAdvertise from "./pages/Dashboard/Seller/AskForAdvertise";
import CategoryProductPage from "./pages/Category/CategoryProductPage";
import UpdateProfilePage from "./pages/Profile/UpdateProfilePage";
import PrivateRoute from "./routes/PrivateRoute";
import UserPaymentHistory from "./pages/Dashboard/User/UserPaymentHistory";
import SellerPaymentHistory from "./pages/Dashboard/Seller/SellerPaymentHistory";
import Cart from "./pages/Cart/Cart";
import InvoicePage from "./pages/Dashboard/Invoice/InvoicePage";
import Table from "./components/Common/DataTable";
import AdminRoute from "./routes/AdminRoute";
import SellerRoute from "./routes/SellerRoute";
// import InvoicePage from "./pages/Dashboard/Invoice2/InvoicePage";
// import InvoicePage from "./pages/Dashboard/Invoice/InvoicePage";
const App = () => {
  const { user, loading } = useAuth();
  return (
    <div className="font-lexend relative">
      <BrowserRouter>
        <Routes>
          {/* with nav routes  */}
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/shop"
              element={
                  <ShopPage />
              }
            />
            <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
            <Route path="/checkout" element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
            <Route path="/invoice" element={<PrivateRoute><InvoicePage/></PrivateRoute>}/>
            <Route path="/table" element={<Table/>}/>
            <Route
              path="/category-products/:slug"
              element={<CategoryProductPage />}
            />
            <Route path="/update-profile" element={<PrivateRoute><UpdateProfilePage /></PrivateRoute>} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            >
              {/* user routes */}
              
              <Route path="user-payment-history" element={<PrivateRoute><UserPaymentHistory /></PrivateRoute>}/>
              {/* admin routes  */}
              <Route path="admin-homepage" element={<AdminRoute><AdminHomepage /></AdminRoute>} />
              <Route path="manage-user" element={<AdminRoute><ManageUser /></AdminRoute>} />
              <Route path="manage-category" element={<AdminRoute><ManageCategory/></AdminRoute>} />
              <Route path="sales-report" element={<AdminRoute><SalesReport /></AdminRoute>} />
              <Route path="banner-advertise" element={<AdminRoute><BannerAdvertise /></AdminRoute>} />
              <Route path="payment-management" element={<AdminRoute><PaymentManagement /></AdminRoute>}/>
              {/* seller routes */}
              <Route path="seller-homepage" element={<SellerRoute><SellerHomepage /></SellerRoute>} />
              <Route path="manage-medicines" element={<SellerRoute><ManageMedicines /></SellerRoute>} />
              <Route path="ask-advertisement" element={<SellerRoute><AskForAdvertise /></SellerRoute>} />
              <Route path="seller-payment-history" element={<SellerRoute><SellerPaymentHistory/></SellerRoute>}/>
              
            </Route>
          </Route>

          {/* without nav routes  */}
          <Route>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
