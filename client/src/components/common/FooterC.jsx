import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

export default function FooterC() {
  return (
    <MDBFooter style={{backgroundColor: '#2e0854'}} className='text-center text-lg-left'>
      <div className='text-center p-3'>
        <p className='text-light'>ComplaintCare</p>
        <p className='text-light'>&copy; {new Date().getFullYear()}</p>
      </div>
    </MDBFooter>
  );
}