import React from 'react';

const Title = ({children}) => {
    return (
        <div className='font-semibold text-2xl'>
            {children}
        </div>
    );
};

export default Title;