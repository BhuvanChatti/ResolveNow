import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Footer from './FooterC'

const SignUp = () => {
   const [title, setTitle] = useState("Select User")
   const [user, setUser] = useState({
      name: "",
      email: "",
      password: "",
      phone: "",
      userType: ""
   })

   const handleChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value })
   }

   const handleTitle = (selectedRole) => {
      setTitle(selectedRole)
      setUser({ ...user, userType: selectedRole })
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      try {
         const res = await axios.post("http://localhost:8000/SignUp", user)
         alert("Registration successful!")
         setUser({
            name: "",
            email: "",
            password: "",
            phone: "",
            userType: ""
         })
         setTitle("Select User")
      } catch (err) {
         console.error("Error submitting the form:", err)
         alert("Something went wrong. Please try again.")
      }
   }

   return (
      <>
         <Navbar style={{ backgroundColor: '#2e0854' }} variant="dark" expand="lg">
            <Container>
               <Navbar.Brand>ResolveNow</Navbar.Brand>
               <Navbar.Toggle />
               <Navbar.Collapse>
                  <Nav className="ms-auto">
                     <Nav.Link as={Link} to="/">Home</Nav.Link>
                     <Nav.Link as={Link} to="/signup">SignUp</Nav.Link>
                     <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>

         <section className="gradient-custom log-reg-section">
            <div className="container">
               <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                     <div className="card">
                        <div className="card-body p-5 text-center">
                           <div className="mb-md-5 mt-md-4 pb-5">
                              <h2 className="fw-bold mb-4">Sign Up to Register a Complaint</h2>
                              <p className="text-white-50 mb-4">Enter your details below</p>
                              <form onSubmit={handleSubmit}>
                                 <div className="form-outline form-white mb-4 text-start">
                                    <label className="form-label" htmlFor="name">Full Name</label>
                                    <input type="text" id="name" name="name" value={user.name} onChange={handleChange} className="form-control form-control-lg" required />
                                 </div>

                                 <div className="form-outline form-white mb-4 text-start">
                                    <label className="form-label" htmlFor="email">Email</label>
                                    <input type="email" id="email" name="email" value={user.email} onChange={handleChange} className="form-control form-control-lg" required />
                                 </div>

                                 <div className="form-outline form-white mb-4 text-start">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <input type="password" id="password" name="password" value={user.password} onChange={handleChange} className="form-control form-control-lg" required />
                                 </div>

                                 <div className="form-outline form-white mb-4 text-start">
                                    <label className="form-label" htmlFor="phone">Mobile No.</label>
                                    <input type="tel" id="phone" name="phone" value={user.phone} onChange={handleChange} className="form-control form-control-lg" required />
                                 </div>

                                 <div className="form-outline form-white mb-4 text-start">
                                    <label className="form-label d-block mb-2">Select User Type</label>
                                    <Dropdown onSelect={handleTitle}>
                                       <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                          {title}
                                       </Dropdown.Toggle>
                                       <Dropdown.Menu>
                                          <Dropdown.Item eventKey="Ordinary">Ordinary</Dropdown.Item>
                                          <Dropdown.Item eventKey="Admin">Admin</Dropdown.Item>
                                          <Dropdown.Item eventKey="Agent">Agent</Dropdown.Item>
                                       </Dropdown.Menu>
                                    </Dropdown>
                                 </div>

                                 <button className="btn btn-outline-light btn-lg px-5 mt-3" type="submit">
                                    Register
                                 </button>
                              </form>
                           </div>
                           <div>
                              <p className="mb-0">Already have an account? <Link to="/login" className="text-info">Login</Link></p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <Footer />
      </>
   )
}

export default SignUp
