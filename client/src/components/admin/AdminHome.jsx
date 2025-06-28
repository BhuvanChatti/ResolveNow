
import '../../index.css';

import '../../App.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import UserInfo from './UserInfo';
import AccordionAdmin from "./AccordionAdmin";
import AgentInfo from './AgentInfo';

const AdminHome = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const getUserData = () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          setUserName(user.name || 'Admin');
        } else {
          navigate('/');
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, [navigate]);

  const handleNavClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      <Navbar bg="dark" expand="lg" className="admin-navbar text-white py-3">
        <Container fluid>
          <Navbar.Brand className="text-white fw-bold">Welcome Admin, {userName}</Navbar.Brand>
          <Navbar.Toggle aria-controls="admin-navbar-nav" />
          <Navbar.Collapse id="admin-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                as="span"
                onClick={() => handleNavClick('dashboard')}
                className={`nav-tab ${activeComponent === 'dashboard' ? 'active-tab' : ''}`}
              >
                Dashboard
              </Nav.Link>
              <Nav.Link
                as="span"
                onClick={() => handleNavClick('UserInfo')}
                className={`nav-tab ${activeComponent === 'UserInfo' ? 'active-tab' : ''}`}
              >
                Users
              </Nav.Link>
              <Nav.Link
                as="span"
                onClick={() => handleNavClick('Agent')}
                className={`nav-tab ${activeComponent === 'Agent' ? 'active-tab' : ''}`}
              >
                Agents
              </Nav.Link>
            </Nav>
            <Button variant="outline-danger" onClick={handleLogout}>
              Log Out
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="admin-content">
        {activeComponent === 'dashboard' && <AccordionAdmin />}
        {activeComponent === 'UserInfo' && <UserInfo />}
        {activeComponent === 'Agent' && <AgentInfo />}
      </div>
    </>
  );
};

export default AdminHome;
