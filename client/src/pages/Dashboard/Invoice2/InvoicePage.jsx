import React from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import InvoiceDocument from "./InvoiceDocument";

const InvoicePage = () => {
  const invoice = {
    date: "January 19, 2025",
    client: {
      name: "John Doe",
      address: "123 Main Street",
      city: "City, State, ZIP",
    },
    items: [
      { name: "Product A", quantity: 2, price: 50 },
      { name: "Product B", quantity: 3, price: 30 },
    ],
    total: 190,
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-5">
      <h1 className="text-xl font-bold mb-4">Invoice Viewer</h1>

      {/* Inline PDF Viewer */}
      <PDFViewer style={{ width: "100%", height: "800px" }}>
        <InvoiceDocument invoice={invoice} />
      </PDFViewer>

      {/* Download Link */}
      <PDFDownloadLink
        document={<InvoiceDocument invoice={invoice} />}
        fileName="invoice.pdf"
        className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
      >
        {({ loading }) => (loading ? "Preparing Document..." : "Download PDF")}
      </PDFDownloadLink>
    </div>
  );
};

export default InvoicePage;
