import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosPublic } from '../../hooks/useAxiosInstance';
import { FaEye } from 'react-icons/fa';
import ProductDetailsModal from '../../components/Common/ProductDetailsModal';
import useAddToCart from '../../hooks/useAddToCart';
import { Helmet } from 'react-helmet';

const CategoryProductPage = () => {
    const {slug} = useParams()
    const {data:products=[], refetch} = useQuery({
        queryKey: ["category-products"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/categories/${slug}`)
            return res.data
        }
    })

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
        <div className='lg:m-10 bg-accent lg:p-10 rounded-xl dark:bg-gray-600'>
      <Helmet title="Category | PharmaOn"/>
            <h1 className='text-center font-bold text-xl'>{slug.toLocaleUpperCase()}</h1>
            <div className="overflow-x-auto">
      <table className="table bg-white mt-5 dark:bg-gray-800 dark:text-white">
        {/* head */}
        <thead>
          <tr className='dark:text-white'>
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
        </div>
    );
};

export default CategoryProductPage;