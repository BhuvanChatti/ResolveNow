import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Footer from '../common/FooterC';
import Complaint from '../user/Complaint';
import Status from '../user/Status';

const HomePage = () => {
   const navigate = useNavigate();
   const [activeComponent, setActiveComponent] = useState('Complaint');
   const [userName, setUserName] = useState('');

   useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
         setUserName(user.name);
      } else {
         navigate('/');
      }
   }, [navigate]);

   const handleNavLinkClick = (componentName) => {
      setActiveComponent(componentName);
   };

   const Logout = () => {
      localStorage.removeItem('user');
      navigate('/');
   };

   return (
      <div className="d-flex flex-column min-vh-100 bg-light">
         {/* Navbar */}
         <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#2e0854' }}>
            <div className="container-fluid">
               <span className="navbar-brand fw-bold">Hi, {userName}</span>
               <div className="collapse navbar-collapse">
                  <ul className="navbar-nav me-auto">
                     <li className="nav-item">
                        <NavLink
                           className={`nav-link ${activeComponent === 'Complaint' ? 'active' : ''}`}
                           onClick={() => handleNavLinkClick('Complaint')}
                        >
                           Register Complaint
                        </NavLink>
                     </li>
                     <li className="nav-item">
                        <NavLink
                           className={`nav-link ${activeComponent === 'Status' ? 'active' : ''}`}
                           onClick={() => handleNavLinkClick('Status')}
                        >
                           Status
                        </NavLink>
                     </li>
                  </ul>
               </div>
               <button className="btn btn-outline-light" onClick={Logout}>Log Out</button>
            </div>
         </nav>

         {/* Content */}
         <main className="flex-grow-1 py-5">
            <div className="container">
               {activeComponent === 'Complaint' && <Complaint />}
               {activeComponent === 'Status' && <Status />}
            </div>
         </main>

         {/* Footer */}
         <Footer />
      </div>
   );
};

export default HomePage;
