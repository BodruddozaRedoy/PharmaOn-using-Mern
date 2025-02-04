import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React from "react";

export default function Invoice() {
  const printRef = React.useRef(null);

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) {
      return;
    }

    const canvas = await html2canvas(element, {
      scale: 2,
    });
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("examplepdf.pdf");
  };
  const payment = JSON.parse(localStorage.getItem('payment'))

  return (
    <div className=" bg-gray-100 p-8 flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <div ref={printRef} className="p-8 bg-white border border-gray-200">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
              <p className="text-sm text-gray-600">Invoice #{payment.transactionId}</p>
            </div>
            <div className="text-right">
                
              <h2 className="font-semibold flex flex-col items-center gap-3 justify-end"> <img src="./pharmaon-icon.png" className="w-10" alt="" />PharmaOn</h2>
              <p className="text-sm text-gray-600">
                Mirpur, Dhaka, Bangladesh
              </p>
            </div>
          </div>

          <div className="mb-3">
            <h3 className="text-lg font-semibold mb-4">Bill To:</h3>
            <p className="text-gray-700">
            Name:{payment.billingDetails.name}
              <br />
              Address:{payment.billingDetails.address}
              <br />
              Phone Number:{payment.billingDetails.phoneNumber}
              <br />
              Country:{payment.billingDetails.country}
            </p>
          </div>

          <table className="w-full mb-3 border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Description</th>
                <th className="border p-2 text-right">Quantity</th>
                <th className="border p-2 text-right">Unit Price</th>
                <th className="border p-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {
                payment?.cartData.map((i) => (
                    <tr>
                <td className="border p-2">{i.name}</td>
                <td className="border p-2 text-right">{i.quantity}</td>
                <td className="border p-2 text-right">${i.price}</td>
                <td className="border p-2 text-right">${i.totalPrice}</td>
              </tr>
                ))
              }
              
            </tbody>
          </table>

          <div className="flex justify-end">
            <div className="w-64">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>${payment.price}</span>
              </div>
              {/* <div className="flex justify-between mb-2">
                <span>Tax (10%):</span>
                <span>$175.00</span>
              </div> */}
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${payment.price}</span>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="mt-6 flex justify-center">
          <button
            onClick={handleDownloadPdf}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Download PDF
          </button>
        </div> */}
      </div>
    </div>
  );
}