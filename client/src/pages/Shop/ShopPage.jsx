import React, { useState } from "react";
import DataTable from "react-data-table-component";
import useAllProducts from "../../hooks/useAllProducts";
import { Helmet } from "react-helmet";
import { FaEye } from "react-icons/fa";
import useAddToCart from "../../hooks/useAddToCart";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const ShopPage = () => {
  const [products, productLoading, productRefetch] = useAllProducts();
  const [filterText, setFilterText] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]); // Cart state
  const { addToCart, loading } = useAddToCart()
  const {user} = useAuth()

  console.log(selectedProduct);
  
  // Add product to cart
  const handleAddToCart = (product) => {
    // setCart([...cart, product]);
    if(!user){
      return toast.error("Please logged in first")
    }
    addToCart(product)
    // alert(`${product.name} added to the cart!`);
  };

  // View product details in modal
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  // Close modal
  const closeModal = () => {
    setSelectedProduct(null);
  };

  const columns = [
    {
      name: "Index",
      cell: (row, rowIndex) => rowIndex + 1,
      width: "100px",
    },
    {
      name: "Image",
      cell: (row) => (
        <img
          src={row.imgUpload || row.imgUrl}
          alt={row.name}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "8px",
            objectFit: "cover",
          }}
        />
      ),
      width: "200px",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "Medicine Name",
      selector: (row) => row.name,
      sortable: true,
      width: "300px",
    },
    {
      name: "Company Name",
      selector: (row) => row.company,
      sortable: true,
      width: "300px",
    },
    {
      name: "Old Price",
      selector: (row) => `$${row.unitPrice?.toFixed(2)}`,
      sortable: true,
      width: "200px",
    },
    {
      name: "New Price",
      selector: (row) => `$${row.newPrice?.toFixed(2)}`,
      sortable: true,
      width: "200px",
      right: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => handleAddToCart(row)}
            className="btn btn-ghost btn-xs bg-success text-white"
          >
            Select
          </button>
          <button
            onClick={() => handleViewDetails(row)}
            className="btn btn-ghost btn-xs bg-accent"
          >
            <FaEye />
          </button>
        </div>
      ),
      width: "300px",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  

  // Filter data based on search input
  const filteredData = products?.filter(
    (item) =>
      item.name.toLowerCase().includes(filterText.toLowerCase()) ||
      item.genericName?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.company.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="lg:m-10 p-5 lg:p-10 bg-accent rounded-xl">
      <Helmet title="Shop | PharmaOn" />

      {/* Search Input */}
      <div>
        <div className="flex justify-between items-center py-3 px-5 bg-white rounded-xl mb-3">
          <h1 className="font-semibold text-xl">Shop</h1>
          <input
            type="text"
            placeholder="Search by name, generic name, or company..."
            className="input input-bordered lg:w-[50%] hidden lg:flex"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <div className="flex gap-4 mr-5">
            <div className="w-8 cursor-pointer">
              <img
                src="https://img.icons8.com/?size=100&id=o15Kxsr7cBWT&format=png&color=000000"
                alt=""
              />
            </div>
            <div className="w-8 cursor-pointer">
              <img
                src="https://img.icons8.com/?size=100&id=8180&format=png&color=000000"
                alt=""
              />
            </div>
          </div>
        </div>
        <input
          type="text"
          placeholder="Search by name, generic name, or company..."
          className="input input-bordered lg:w-[50%] inline-block w-full mb-3 lg:hidden"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
      />

      {/* Modal for Viewing Product Details */}
      {selectedProduct && (
        <div className="modal modal-open">
          <div className="modal-box">
          <img
              src={selectedProduct.imgUpload || selectedProduct.imgUrl}
              alt={selectedProduct.name}
              className="w-full h-auto rounded-lg mt-3"
            />
            <h3 className="font-bold text-lg">{selectedProduct.name}</h3>
            <p>
              <strong>Company:</strong> {selectedProduct.company}
            </p>
            <p>
              <strong>Generic Name:</strong> {selectedProduct.genericName}
            </p>
            <p>
              <strong>Old Price:</strong> ${selectedProduct.unitPrice}
            </p>
            <p>
              <strong>New Price:</strong> ${selectedProduct.newPrice}
            </p>
            <p>
              <strong>Description:</strong> {selectedProduct.description}
            </p>
            <p>
              <strong>Unit:</strong> {selectedProduct.unit}
            </p>
            <p>
              <strong>Item owner:</strong> {selectedProduct.userEmail}
            </p>
            
            <div className="modal-action">
              <button onClick={closeModal} className="btn btn-primary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
