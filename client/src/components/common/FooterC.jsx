import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';
import '../../index.css';
import '../../App.css';


export default function FooterC() {
  return (
    <MDBFooter
      style={{
        height: 'auto',
        marginTop: '80px',
        backgroundColor: '#0B5ED7',
        color: '#fff',
        padding: '20px 0',
      }}
      className='text-center'
    >
      <div className='p-2'>
        <h5 style={{ fontWeight: '600', marginBottom: '8px' }}>ComplaintCare</h5>
        <p style={{ marginBottom: '0' }}>&copy; {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </MDBFooter>
  );
}
