import React, { useState } from "react";
import useAllProducts from "../../hooks/useAllProducts";
import { FaEye } from "react-icons/fa";
import ProductDetailsModal from "./ProductDetailsModal";
import useAddToCart from "../../hooks/useAddToCart";

const ProductTable = () => {
  const [products] = useAllProducts();
  const [detailsModal, setDetailsModal] = useState()
  const {addToCart} = useAddToCart()

  const handleView = (item) => {
    // console.log(item);
    document.getElementById("my_modal_5").showModal()
    setDetailsModal(item)
  } 
  const handleSelect = async (item) => {
    
    await addToCart(item)
  }
  return (
    <div className="overflow-x-auto">
      <table className="table bg-white mt-5">
        {/* head */}
        <thead>
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th>Old Price</th>
            <th>New Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="">
          {/* row 1 */}
          {products?.map((i, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={i.imgUpload || i.imgUrl} alt="Product image" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{i.name}</div>
                    <div className="text-sm opacity-50">{i.category}</div>
                  </div>
                </div>
              </td>
              <td>{i.unitPrice}</td>
              <td>{i.newPrice}</td>
              <td className="flex gap-3 justify-start">
                <button onClick={() => handleView(i)} className="btn btn-ghost btn-xs bg-accent">
                  <FaEye />
                </button>
                <button onClick={() => {handleSelect(i)}} className="btn btn-ghost btn-xs bg-success text-white">
                  Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <ProductDetailsModal productDetails={detailsModal}/>
    </div>
  );
};

export default ProductTable;
