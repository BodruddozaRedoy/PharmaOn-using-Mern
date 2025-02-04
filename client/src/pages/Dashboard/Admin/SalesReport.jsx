import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import useAxiosInstance from "../../../hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { downloadExcel } from "react-export-table-to-excel";
import { Helmet } from "react-helmet";



const SalesReport = () => {
  const axiosSecure = useAxiosInstance();
  const { data: payments = [], refetch } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  console.log(payments);
  

  const [salesData, setSalesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    setSalesData(payments);
    setFilteredData(payments);
  }, [payments]);

  

  const filterByDate = () => {
    // Parse start and end dates to ensure they are valid
    const parsedStartDate = startDate ? new Date(startDate) : null;
    const parsedEndDate = endDate ? new Date(endDate) : null;
  
    const filtered = salesData.filter((item) => {
      const itemDate = new Date(item.date); // Ensure item.date is a valid date string
  
      // Log the item date to check its value
      // console.log("Item Date:", item.date);
  
      // Check if start and end dates are valid and compare them
      const isAfterStartDate = parsedStartDate ? itemDate >= parsedStartDate : true;
      const isBeforeEndDate = parsedEndDate ? itemDate <= parsedEndDate : true;
  
      return isAfterStartDate && isBeforeEndDate;
    });
  
    setFilteredData(filtered);
  };
  
  // Generate PDF Report
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Sales Report", 20, 10);
    doc.autoTable({
      head: [
        [
          "Transaction ID",
          "Medicine Name",
          "Seller Email",
          "Price",
          "Status",
          "Date",
        ],
      ],
      body: filteredData.map((item) => [
        item.transactionId,
        item.cartData.map((cart) => cart.name).join(", "),
        item.email,
        `$${item.price?.toFixed(2)}`,
        item.status,
        new Date(item.date).toLocaleDateString(),
      ]),
    });
    doc.save("sales_report.pdf");
  };

  // Table Columns
  const columns = [
    {
      name: "Transaction ID",
      selector: (row) => row.transactionId,
      sortable: true,
      width:"200px"

    },
    {
      name: "Medicine Name",
      selector: (row) => row.cartData.map((cart) => cart.name).join(", "),
      sortable: true,
      width:"250px"
    },
    {
      name: "Seller Email",
      selector: (row) => row.cartData.map((cart) => cart.itemOwner).join(", "),
      width:"250px"
    },
    {
      name: "Buyer Email",
      selector: (row) => row.email,
      width:"250px"

    },
    {
      name: "Item Quantity",
      selector: (row) => row.cartData.length,
      width:"150px"
    },
    {
      name: "Price",
      selector: (row) => `$${row.price?.toFixed(2)}`,
      sortable: true,
      width:"150px"
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      width:"150px"
    },
    {
      name: "Date",
      selector: (row) => new Date(row.date).toLocaleDateString(),
      sortable: true,
      width:"150px"
    },
  ];

  // const handleDownloadExcel = () => {
  //   if (!salesData || salesData .length === 0) {
  //     console.error("No data available to export.");
  //     return; // Exit if there's no data
  //   }
  //   downloadExcel({
  //     fileName: `sales_report`,
  //     sheet: "sales",
  //     tablePayload: {
  //       // accept two different data structures
  //       body: salesData,
  //     },
  //   });
  // };

  return (
    <div className="lg:p-4">
      <Helmet title="Sales Report | PharmaOn"/>

      <h1 className="text-2xl font-bold mb-4">Sales Report</h1>

      {/* Date Range Filter */}
      <div className="flex gap-4 mb-4">
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded p-2"
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded p-2"
          />
        </div>
        <button
          onClick={filterByDate}
          className="bg-blue-500 text-white px-4 py-2 rounded hidden lg:flex"
        >
          Filter
        </button>
      </div>
      <button
          onClick={filterByDate}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-3"
        >
          Filter
        </button>
      {/* Data Table */}
      <DataTable
        // title="Sales Data"
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        striped
      />


      {/* Export Buttons */}
      <div className="mt-4 flex gap-4">
        <CSVLink
          data={filteredData}
          filename={"sales_report.csv"}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Download CSV
        </CSVLink>
        <button
          onClick={generatePDF}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default SalesReport;
