import React from 'react';

const services = [
    {
        img: "https://img.icons8.com/?size=100&id=13311&format=png&color=000000",
        title: "Fast Delivery",
        desc: "We ensure delivery within 12h"
    },
    {
        img: "https://img.icons8.com/?size=100&id=63761&format=png&color=000000",
        title: "Great Discount",
        desc: "Grab our great deals from offer section"
    },
    {
        img: "https://img.icons8.com/?size=100&id=13007&format=png&color=000000",
        title: "Secure Payment",
        desc: "We accept stripe secure payment"
    },
    {
        img: "https://img.icons8.com/?size=100&id=l342AIc0m0qQ&format=png&color=000000",
        title: "24/7 Support",
        desc: "Call our customer support"
    },
]

const Service = () => {
    return (
        <div className='flex flex-wrap lg:flex-nowrap items-center justify-between gap-5 mt-5 lg:mt-0'>
            {
                services.map((i, index) => (
                    <div className='flex items-center gap-3 border rounded-xl p-3 w-full' key={index}>
                        <img src={i.img} alt="" />
                        <div>
                            <h1 className='text-xl font-semibold'>{i.title}</h1>
                            <p className='text-content'>{i.desc}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Service;