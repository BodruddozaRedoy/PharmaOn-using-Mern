import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

const navLinks = [
  // User routes
  {
    title: "Payment History",
    link: "/dashboard/user-payment-history",
    role: "user",
  },
  // Admin routes
  {
    title: "Admin Homepage",
    link: "/dashboard/admin-homepage",
    role: "admin",
  },
  {
    title: "Manage User",
    link: "/dashboard/manage-user",
    role: "admin",
  },
  {
    title: "Manage Category",
    link: "/dashboard/manage-category",
    role: "admin",
  },
  {
    title: "Payment Management",
    link: "/dashboard/payment-management",
    role: "admin",
  },
  {
    title: "Sales Report",
    link: "/dashboard/sales-report",
    role: "admin",
  },
  {
    title: "Banner Advertise",
    link: "/dashboard/banner-advertise",
    role: "admin",
  },
  // Seller routes
  {
    title: "Seller Homepage",
    link: "/dashboard/seller-homepage",
    role: "seller",
  },
  {
    title: "Manage Medicines",
    link: "/dashboard/manage-medicines",
    role: "seller",
  },
  {
    title: "Payment History",
    link: "/dashboard/seller-payment-history",
    role: "seller",
  },
  {
    title: "Ask for Advertisement",
    link: "/dashboard/ask-advertisement",
    role: "seller",
  },
];

const DashboardPage = () => {
  const {user} = useAuth()
  const { data: loggedUser } = useQuery({
    queryKey: ["loggedUser"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/user/${user.email}`);
      return res.data;
    },
  });
  // Filter links based on the user's role
  const filteredLinks = navLinks.filter((link) => link.role === loggedUser?.role);

  return (
    <div className="lg:m-10 md:m-5 lg:grid grid-cols-6 lg:gap-10">
      <Helmet title="Dashboard | PharmaOn"/>

      {/* Sidebar */}
      <div className="menu lg:p-10 bg-accent rounded-xl lg:col-span-1 font-semibold space-y-4 mb-5 p-5">
        {filteredLinks.map((link, i) => (
          <NavLink key={i} to={link.link}>
            {link.title}
          </NavLink>
        ))}
      </div>
      <div className="lg:p-10 p-5 bg-accent rounded-xl col-span-5">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardPage;
