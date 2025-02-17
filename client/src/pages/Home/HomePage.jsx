import React, { useContext } from 'react';
import Sidebar from '../../components/Home/Sidebar';
import Banner from '../../components/Home/Banner';
import Service from '../../components/Home/Service';
import Offers from '../../components/Home/Offers';
import DiscountProductsSlider from '../../components/Home/DisCountProducts';
import DiscountProducts from '../../components/Home/DisCountProducts';
import AllProducts from '../../components/Home/AllProducts';
import { AuthContext } from '../../context/AuthContext';
import { Helmet } from 'react-helmet';
import Testimonials from '../../components/Home/Testimonials';
import Newsletter from '../../components/Home/Newsletter';

const HomePage = () => {
    const {user} = useContext(AuthContext)
    
    return (
        <div className=' space-y-6 my-5'>
      <Helmet title="Home | PharmaOn"/>

            <header className='lg:m-10'>
                <Banner/>
            </header>
            <div className='lg:grid col-span-1 md:grid-cols-6 relative'>
            <aside className=' md:col-span-1  space-y-5 lg:ml-9'>
                <Sidebar/>
                <Offers/>
            </aside>
            <div className='md:col-span-5 md:space-y-10 md:mx-10'>
            
            <main className='space-y-16 mt-5 md:mt-0'>
                <Service/>
                <AllProducts/>
                <DiscountProducts/>
                <Testimonials/>
                <Newsletter/>
            </main>
            </div>
            </div>
        </div>
    );
};

export default HomePage;