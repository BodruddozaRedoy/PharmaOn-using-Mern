import React from "react";

const ProductDetailsModal = ({ productDetails }) => {
  // console.log(productDetails);
  const { _id, name, imgUpload, imgUrl, newPrice, unitPrice, description, available, category, company } =
    productDetails || "";
  return (
    <div>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
            <img src={imgUpload || imgUrl} alt="" />
          <h3 className="font-bold text-lg text-primary">{name}</h3>
          <p className="">
            <span className="font-semibold">Price:</span> {" "}
            <span className="text-content line-through">{unitPrice}</span>
             {" "}{newPrice}
          </p>
          <p><span className="font-semibold">Available:</span> {available} Piece</p>
          <p><span className="font-semibold">Category:</span> {category} Piece</p>
          <p><span className="font-semibold">Company:</span> {company}</p>
          <p className="pt-4 font-semibold">Description:</p>
          <p>{description}</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ProductDetailsModal;
