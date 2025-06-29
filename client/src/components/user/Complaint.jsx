import axios from 'axios';
import React, { useState } from 'react';

const Complaint = () => {
   const user = JSON.parse(localStorage.getItem('user'));
   const [userComplaint, setUserComplaint] = useState({
      userId: user._id,
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      status: 'pending',
      comment: ''
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setUserComplaint({ ...userComplaint, [name]: value });
   };

   const handleClear = () => {
      setUserComplaint({
         userId: user._id,
         name: '',
         address: '',
         city: '',
         state: '',
         pincode: '',
         status: 'pending',
         comment: ''
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await axios.post(`http://localhost:8000/Complaint/${user._id}`, userComplaint);
         alert("Your complaint has been submitted!");
         handleClear();
      } catch (err) {
         console.error(err);
         alert("Something went wrong!");
      }
   };

   return (
      <div className="complaint-box">
         <form onSubmit={handleSubmit} className="compliant-form row bg-white text-dark">
            <div className="col-12">
               <h2 className="fw-bold text-center mb-4 text-primary">Register Your Complaint</h2>
            </div>

            <div className="col-md-6 p-3">
               <label htmlFor="name" className="form-label">Name</label>
               <input name="name" onChange={handleChange} value={userComplaint.name} type="text" className="form-control" id="name" required />
            </div>

            <div className="col-md-6 p-3">
               <label htmlFor="address" className="form-label">Address</label>
               <input name="address" onChange={handleChange} value={userComplaint.address} type="text" className="form-control" id="address" required />
            </div>

            <div className="col-md-6 p-3">
               <label htmlFor="city" className="form-label">City</label>
               <input name="city" onChange={handleChange} value={userComplaint.city} type="text" className="form-control" id="city" required />
            </div>

            <div className="col-md-6 p-3">
               <label htmlFor="state" className="form-label">State</label>
               <input name="state" onChange={handleChange} value={userComplaint.state} type="text" className="form-control" id="state" required />
            </div>

            <div className="col-md-6 p-3">
               <label htmlFor="pincode" className="form-label">Pincode</label>
               <input name="pincode" onChange={handleChange} value={userComplaint.pincode} type="number" className="form-control" id="pincode" required />
            </div>

            {/* Hidden Status Field */}
            <input type="hidden" name="status" value={userComplaint.status} />

            <div className="col-12 p-3">
               <label htmlFor="comment" className="form-label">Description</label>
               <textarea name="comment" onChange={handleChange} value={userComplaint.comment} className="form-control" id="comment" rows="4" required></textarea>
            </div>

            <div className="text-center p-3 col-12">
               <button type="submit" className="btn btn-success px-5">Register</button>
            </div>
         </form>
      </div>
   );
};

export default Complaint;
