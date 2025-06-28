import axios from 'axios';
import React, { useState } from 'react';
import '../../App.css';
import '../../index.css';

const Complaint = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const [userComplaint, setUserComplaint] = useState({
    userId: user?._id || '',
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    status: 'pending', // Default to 'pending'
    comment: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserComplaint(prev => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setUserComplaint({
      userId: user?._id || '',
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
    if (!userComplaint.userId) {
      alert("User not found. Please login again.");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:8000/Complaint/${userComplaint.userId}`,
        userComplaint
      );
      alert('✅ Your complaint has been registered successfully!');
      handleClear();
    } catch (err) {
      console.error(err);
      alert('❌ Something went wrong. Please try again.');
    }
  };

  return (
    <div className="complaint-box bg-light text-dark">
      <form onSubmit={handleSubmit} className="compliant-form row p-4 shadow-lg rounded bg-white">
        <h4 className="text-primary text-center mb-4">Register a Complaint</h4>

        <div className="col-md-6 mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input name="name" onChange={handleChange} value={userComplaint.name} type="text" className="form-control" id="name" required />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input name="address" onChange={handleChange} value={userComplaint.address} type="text" className="form-control" id="address" required />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="city" className="form-label">City</label>
          <input name="city" onChange={handleChange} value={userComplaint.city} type="text" className="form-control" id="city" required />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="state" className="form-label">State</label>
          <input name="state" onChange={handleChange} value={userComplaint.state} type="text" className="form-control" id="state" required />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="pincode" className="form-label">Pincode</label>
          <input name="pincode" onChange={handleChange} value={userComplaint.pincode} type="text" className="form-control" id="pincode" required />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <input
            name="status"
            onChange={handleChange}
            value={userComplaint.status}
            type="text"
            className="form-control"
            id="status"
            placeholder="e.g., pending"
            required
          />
        </div>

        <div className="col-12 mb-3">
          <label htmlFor="comment" className="form-label">Description</label>
          <textarea
            name="comment"
            onChange={handleChange}
            value={userComplaint.comment}
            className="form-control"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="col-12 text-center">
          <button type="submit" className="btn btn-success px-5">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Complaint;
