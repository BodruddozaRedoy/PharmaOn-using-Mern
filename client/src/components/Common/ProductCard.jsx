import React from "react";
import label from "../../assets/icons/label.png";
import useAddToCart from "../../hooks/useAddToCart";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const {user} = useAuth()
  const {addToCart} = useAddToCart()
  const handleAddToCart = async (product) => {
    if(!user){
      return toast.error("Please login first")
    }
    await addToCart(product)
  }
  return (
    <div>
      <div className="product-card border rounded-lg shadow-lg hover:shadow-xl transition-transform transform relative dark:bg-gray-600">
        <div className="w-full h-80 object-center shadow object-cover overflow-hidden p-3">
          <img
            src={product.imgUpload || product.imgUrl}
            alt={product.name}
            className="w-full h-80 object-center object-cover rounded mb-4"
          />
        </div>
        <div className="p-3">
          <h3 className="text-lg font-semibold truncate">{product.name}</h3>
          <div className="flex justify-between items-center mb-3">
            <p className="text-gray-500">
              {product.unitPrice > 0 &&(
                <>
                  <span className="line-through">${product?.unitPrice}</span>{" "}
                </>
              )}
              <span className="text-primary">${product?.newPrice}</span>
            </p>
            <button onClick={() => handleAddToCart(product)} className="btn btn-sm bg-primary text-white">
              Buy Now
            </button>
          </div>
          <hr />
          <p className="flex justify-center mt-3">
            Available: {product.available}
          </p>
        </div>
        {product.unitPrice > product?.newPrice && (
          <div className="absolute top-[-1px] right-[20px] w-10 z-40 object-cover font-playfair font-semibold">
            <img className="" src={label} alt="" />
            <div className="absolute top-1 right-[6px] text-xs text-white">
              <p className="w-full text-white flex justify-center">
                {(
                  product?.discountPercentage
                )?.toFixed(1)}
                %
              </p>
              <p className="text-center">Off</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
