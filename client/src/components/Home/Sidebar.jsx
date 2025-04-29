import React, { useState } from 'react';
import Title from '../../shared/Title';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import useCategory from '../../hooks/useCategory';

const Sidebar = () => {
    const [categories] = useCategory()
    return (
        <div className='bg-white p-5 rounded-xl shadow-md border dark:bg-slate-800'>
            <div className='flex mb-3 justify-center text-primary gap-3 items-center'>
                <img className='w-6 h-6 object-cover' src="https://img.icons8.com/?size=100&id=3Dou0BduZf0j&format=png&color=0f7986" alt="" />
                <h1 className='font-bold'>Shop By Category</h1>
            </div>
            <hr />
            {
                categories.map((i, index) => (
                    <div  key={index}>
                        <Link to={`/category-products/${i.slug}`}>
                        <div className='flex items-center gap-3 my-3 font-semibold justify-between'>
                            <div className='flex items-center gap-3'>
                            <img className='w-10 h-10 object-cover' src={i.img} alt="" />
                            <h1>{i.name}</h1>
                            <p>({i.productCount})</p>
                            </div>
                            <IoIosArrowForward />
                        </div>
                        </Link>
                        {index < categories.length - 1 && <hr />} 
                    </div>
                ))
            }
        </div>
    );
};

export default Sidebar;