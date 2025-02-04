import React from 'react';

const MainBtn = ({text}) => {
    return (
        <div className='bg-primary text-white btn hover:bg-secondary w-full'>
            {text}
        </div>
    );
};

export default MainBtn;