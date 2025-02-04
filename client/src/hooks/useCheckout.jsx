import React from 'react';

const useCheckout = () => {
    const getItem = localStorage.getItem('cartTotal')
    const parsedData = JSON.parse(getItem)
    // console.log(parsedData);
    const cartTotal = parsedData.cartTotal
    const subtotal = parsedData.subtotal
    return {cartTotal, subtotal}

};

export default useCheckout;