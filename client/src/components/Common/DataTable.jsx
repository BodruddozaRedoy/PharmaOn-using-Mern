import React, { useState } from "react";
import DataTable from "react-data-table-component";
import useAllProducts from "../../hooks/useAllProducts";



const MedicineTable = () => {
  const [ products, productLoading, productRefetch ] = useAllProducts()
// console.log(products);

  const columns = [
    {
      name: "Index",
      cell: (row, rowIndex) => rowIndex + 1, // Start index at 1
      width: "80px",
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
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "Medicine Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Company Name",
      selector: (row) => row.company,
      sortable: true,
    },
    {
      name: "Old Price",
      selector: (row) => `$${row.unitPrice}`,
      sortable: true,
    },
    {
      name: "New Price",
      selector: (row) => `$${row.newPrice}`,
      sortable: true,
      right: true,
    },
  ];

  const [filterText, setFilterText] = useState(""); // State for search input

  // Filter the data based on the search input
  const filteredData = products?.filter(
    (item) =>
      item.name.toLowerCase().includes(filterText.toLowerCase()) ||
      item.genericName.toLowerCase().includes(filterText.toLowerCase()) ||
      item.company.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="m-10 p-10 bg-accent rounded-xl">
      {/* Search Input */}
      <div className="flex justify-between items-center py-3 px-5 bg-white rounded-xl mb-3">
        <h1 className="font-semibold text-xl">Shop</h1>
        <input
        type="text"
        placeholder="Search by name, generic name, or company..."
        className="input input-bordered md:w-[50%]"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <div className="flex gap-4 mr-5">
            <div className="w-8 cursor-pointer"><img src="https://img.icons8.com/?size=100&id=o15Kxsr7cBWT&format=png&color=000000" alt="" /></div>
            <div className="w-8 cursor-pointer"><img src="https://img.icons8.com/?size=100&id=8180&format=png&color=000000" alt="" /></div>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        // title="Medicine List"
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
      />
    </div>
  );
};

export default MedicineTable;
