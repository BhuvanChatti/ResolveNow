import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Image1 from "../../images/image1.png";
import { Link } from 'react-router-dom';
import Footer from './FooterC'

const Home = () => {
   return (
      <>
         <Navbar style={{ backgroundColor: '#2e0854' }} variant="dark">
            <Container>
               <Navbar.Brand>ResolveNow </Navbar.Brand>
               <ul className="navbar-nav">
                  <li className="nav-item mb-2">
                     <Link to={'/'}
                        className={`nav-link text-light `}
                     >
                        Home
                     </Link>
                  </li>
                  <li className="nav-item mb-2">
                     <Link
                        to={'/signup'}
                        className={`nav-link text-light `}
                     >
                        SignUp
                     </Link>
                  </li>
                  <li className="nav-item mb-2">
                     <Link
                        to={'/login'}
                        className={`nav-link text-light `}
                     >
                        Login
                     </Link>
                  </li>
               </ul>
            </Container>
         </Navbar>
         <Container fluid className='home-container'>
            <div className="home-content">
               <div className="left-side">
                  <img src={Image1} alt="ResolveNow Visual" />
               </div>
               <div className="right-side">
                  <p>
                     <span className='f-letter'>Empower Your Team,</span><br />
                     <span className='s-letter'>Exceed Customer Expectations: Discover our</span> <br />
                     <span className='t-letter'>Complaint Management Solution</span><br />
                     <Link to={'/Login'}>
                        <button className='mt-3 register' variant="none">Register your Complaint</button>
                     </Link>
                  </p>
               </div>
            </div>
         </Container>
         <Footer />
      </>
   )
}

export default Home