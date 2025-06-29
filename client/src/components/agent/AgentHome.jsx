import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Collapse from 'react-bootstrap/Collapse';
import ChatWindow from '../common/ChatWindow';
import Footer from '../common/FooterC';

const AgentHome = () => {
   const navigate = useNavigate();
   const [userName, setUserName] = useState('');
   const [toggle, setToggle] = useState({});
   const [agentComplaintList, setAgentComplaintList] = useState([]);

   useEffect(() => {
      const getData = async () => {
         try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
               const { _id, name } = user;
               setUserName(name);
               const response = await axios.get(`http://localhost:8000/allcomplaints/${_id}`);
               setAgentComplaintList(response.data);
            } else {
               navigate('/');
            }
         } catch (error) {
            console.log(error);
         }
      };

      getData();
   }, [navigate]);

   const handleStatusChange = async (complaintId) => {
      try {
         await axios.put(`http://localhost:8000/complaint/${complaintId}`, { status: 'completed' });
         setAgentComplaintList((prevComplaints) =>
            prevComplaints.map((complaint) =>
               complaint.complaintId === complaintId
                  ? { ...complaint, status: 'completed' }
                  : complaint
            )
         );
      } catch (error) {
         console.log(error);
      }
   };

   const handleToggle = (complaintId) => {
      setToggle((prevState) => ({
         ...prevState,
         [complaintId]: !prevState[complaintId],
      }));
   };

   const LogOut = () => {
      localStorage.removeItem('user');
      navigate('/');
   };

   return (
      <>
         <div className="bg-light min-vh-100">
            <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
               <Container fluid>
                  <Navbar.Brand>Hi Agent {userName}</Navbar.Brand>
                  <Navbar.Toggle aria-controls="navbarScroll" />
                  <Navbar.Collapse id="navbarScroll">
                     <Nav className="me-auto">
                        <NavLink className="nav-link text-light" to="#">
                           View Complaints
                        </NavLink>
                     </Nav>
                     <Button onClick={LogOut} variant="outline-danger">
                        Log out
                     </Button>
                  </Navbar.Collapse>
               </Container>
            </Navbar>

            <Container style={{ paddingTop: '90px', paddingBottom: '40px' }}>
               <div className="row">
                  {agentComplaintList && agentComplaintList.length > 0 ? (
                     agentComplaintList.map((complaint, index) => {
                        const open = toggle[complaint.complaintId] || false;
                        return (
                           <div key={index}>
                              <Card className="h-100 shadow border-0" style={{ backgroundColor: '#f4f7ff' }}>
                                 <Card.Body>
                                    <Card.Title className="fw-bold text-primary">{complaint.name}</Card.Title>
                                    <Card.Text><strong>Address:</strong> {complaint.address}</Card.Text>
                                    <Card.Text><strong>City:</strong> {complaint.city}</Card.Text>
                                    <Card.Text><strong>State:</strong> {complaint.state}</Card.Text>
                                    <Card.Text><strong>Pincode:</strong> {complaint.pincode}</Card.Text>
                                    <Card.Text><strong>Comment:</strong> {complaint.comment}</Card.Text>
                                    <Card.Text>
                                       <strong>Status:</strong>{' '}
                                       <span className={complaint.status === 'completed' ? 'text-success' : 'text-warning'}>
                                          {complaint.status}
                                       </span>
                                    </Card.Text>

                                    {complaint.status !== 'completed' && (
                                       <Button
                                          onClick={() => handleStatusChange(complaint.complaintId)}
                                          variant="success"
                                          className="w-100 mb-2"
                                       >
                                          Mark as Completed
                                       </Button>
                                    )}

                                    <Button
                                       onClick={() => handleToggle(complaint.complaintId)}
                                       aria-controls={`collapse-${complaint.complaintId}`}
                                       aria-expanded={!open}
                                       variant="primary"
                                       className="w-100"
                                    >
                                       {open ? 'Hide' : 'Message'}
                                    </Button>

                                    <Collapse in={!open}>
                                       <div className="mt-3" id={`collapse-${complaint.complaintId}`}>
                                          <Card className="bg-white border">
                                             <Card.Body style={{ padding: '10px' }}>
                                                <ChatWindow
                                                   key={complaint.complaintId}
                                                   complaintId={complaint.complaintId}
                                                   name={userName}
                                                />
                                             </Card.Body>
                                          </Card>
                                       </div>
                                    </Collapse>
                                 </Card.Body>
                              </Card>
                           </div>
                        );
                     })
                  ) : (
                     <Alert variant="info" className="text-center mt-5">
                        <Alert.Heading>No complaints to show</Alert.Heading>
                     </Alert>
                  )}
               </div>
            </Container>

            <Footer style={{ marginTop: '60px' }} />
         </div>
      </>
   );
};

export default AgentHome;
