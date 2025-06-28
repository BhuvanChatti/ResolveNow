
import '../../index.css';

import '../../App.css';
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
            setAgentComplaintList((prev) =>
                prev.map((complaint) =>
                    complaint._doc.complaintId === complaintId
                        ? { ...complaint, _doc: { ...complaint._doc, status: 'completed' } }
                        : complaint
                )
            );
        } catch (error) {
            console.log(error);
        }
    };

    const handleToggle = (complaintId) => {
        setToggle((prev) => ({
            ...prev,
            [complaintId]: !prev[complaintId],
        }));
    };

    const LogOut = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <>
            <div className="agent-home-body">
                <Navbar bg="dark" expand="lg" className="agent-navbar">
                    <Container fluid>
                        <Navbar.Brand className="text-white">
                            Hi Agent {userName}
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                                <NavLink className="nav-link-custom text-white">
                                    View Complaints
                                </NavLink>
                            </Nav>
                            <Button onClick={LogOut} variant="outline-danger">
                                Log out
                            </Button>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <div className="agent-complaints-container">
                    {agentComplaintList.length > 0 ? (
                        agentComplaintList.map((complaint, index) => {
                            const open = toggle[complaint._doc.complaintId] || false;
                            return (
                                <Card key={index} className="complaint-card">
                                    <Card.Body>
                                        <Card.Title><b>Name:</b> {complaint.name}</Card.Title>
                                        <Card.Text><b>Address:</b> {complaint.address}</Card.Text>
                                        <Card.Text><b>City:</b> {complaint.city}</Card.Text>
                                        <Card.Text><b>State:</b> {complaint.state}</Card.Text>
                                        <Card.Text><b>Pincode:</b> {complaint.pincode}</Card.Text>
                                        <Card.Text><b>Comment:</b> {complaint.comment}</Card.Text>
                                        <Card.Text><b>Status:</b> {complaint._doc.status}</Card.Text>

                                        {complaint._doc.status !== 'completed' && (
                                            <Button onClick={() => handleStatusChange(complaint._doc.complaintId)} variant="primary">
                                                Mark as Completed
                                            </Button>
                                        )}
                                        <Button onClick={() => handleToggle(complaint._doc.complaintId)}
                                            aria-controls={`collapse-${complaint._doc.complaintId}`}
                                            aria-expanded={!open}
                                            className="mx-3"
                                            variant="info">
                                            Message
                                        </Button>

                                        <Collapse in={!open} dimension="width">
                                            <div id={`collapse-${complaint._doc.complaintId}`}>
                                                <Card body className="chat-card">
                                                    <ChatWindow key={complaint._doc.complaintId} complaintId={complaint._doc.complaintId} name={userName} />
                                                </Card>
                                            </div>
                                        </Collapse>
                                    </Card.Body>
                                </Card>
                            );
                        })
                    ) : (
                        <Alert variant="info">
                            <Alert.Heading>No complaints to show</Alert.Heading>
                        </Alert>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AgentHome;
