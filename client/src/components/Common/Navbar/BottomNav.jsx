import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const navLinks = [
    {
        id:1,
        title: "Home",
        link: "/"
    },
    {
        id:2,
        title: "Shop",
        link: "/shop"
    },
    {
        id:3,
        title: "About",
        link: "/about"
    },
    // {
    //     id:3,
    //     title: "About",
    //     link: "/shop"
    // },
]

const BottomNav = () => {
    return (
        <div className='py-3 px-10 flex justify-between items-center shadow'>
            {/* Nav links */}
            <div></div>
            <ul className='flex gap-5 items-center'>
            {
                navLinks.map((nav) => (
                    <NavLink className={`font-semibold`} key={nav.id} to={nav.link}>{nav.title}</NavLink>
                ))
            }
            </ul>
            <div></div>
        </div>
    );
};

export default BottomNav;