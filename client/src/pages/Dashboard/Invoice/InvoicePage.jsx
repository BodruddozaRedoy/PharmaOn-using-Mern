import React from 'react';
import Invoice from './Invoice';
import Invoice2 from './Invoice2';
import { Helmet } from 'react-helmet';

const InvoicePage = () => {
    return (
        <div>
      <Helmet title="Invoice | PharmaOn"/>

            <Invoice/>
            <br />
            <Invoice2/>
        </div>
    );
};

export default InvoicePage;