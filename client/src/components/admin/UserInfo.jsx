

import '../../index.css';

import '../../App.css';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { Container } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import Footer from '../common/FooterC';
import axios from 'axios';

const UserInfo = () => {
    const navigate = useNavigate();
    const [ordinaryList, setOrdinaryList] = useState([]);
    const [toggle, setToggle] = useState({});
    const [updateUser, setUpdateUser] = useState({ name: '', email: '', phone: '' });

    const handleChange = (e) => {
        setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (user_id) => {
        if (!updateUser.name && !updateUser.email && !updateUser.phone) {
            alert("Please fill at least one field to update.");
            return;
        }
        const confirmUpdate = window.confirm("Are you sure you want to update the user?");
        if (confirmUpdate) {
            try {
                const res = await axios.put(`http://localhost:8000/user/${user_id}`, updateUser);
                alert("User updated successfully.");
                setUpdateUser({ name: '', email: '', phone: '' });
                // Optional: Refresh data
                const refreshed = await axios.get('http://localhost:8000/OrdinaryUsers');
                setOrdinaryList(refreshed.data);
            } catch (err) {
                console.log(err);
            }
        }
    };

    const deleteUser = async (userId) => {
        const confirmed = window.confirm("Are you sure you want to delete the user?");
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:8000/OrdinaryUsers/${userId}`);
                setOrdinaryList(ordinaryList.filter((user) => user._id !== userId));
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleToggle = (userId) => {
        setToggle((prev) => ({
            ...prev,
            [userId]: !prev[userId],
        }));
    };

    useEffect(() => {
        const getOrdinaryRecords = async () => {
            try {
                const response = await axios.get('http://localhost:8000/OrdinaryUsers');
                setOrdinaryList(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getOrdinaryRecords();
    }, []);

    return (
        <>
            <div className="user-info-body">
                <Container className="user-info-container">
                    <h2 className="text-center mb-4">Registered Users</h2>
                    <Table responsive bordered hover className="user-info-table">
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordinaryList.length > 0 ? (
                                ordinaryList.map((user) => {
                                    const open = toggle[user._id] || false;
                                    return (
                                        <tr key={user._id}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phone}</td>
                                            <td className="user-actions-cell">
                                                <Button onClick={() => handleToggle(user._id)} variant="warning" size="sm" className="mx-1">
                                                    Update
                                                </Button>
                                                <Button onClick={() => deleteUser(user._id)} variant="danger" size="sm" className="mx-1">
                                                    Delete
                                                </Button>
                                                <Collapse in={open}>
                                                    <div className="user-update-form">
                                                        <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(user._id); }}>
                                                            <Form.Group className="mb-2" controlId="formName">
                                                                <Form.Label>Full Name</Form.Label>
                                                                <Form.Control name='name' value={updateUser.name} onChange={handleChange} type="text" placeholder="Enter name" />
                                                            </Form.Group>
                                                            <Form.Group className="mb-2" controlId="formEmail">
                                                                <Form.Label>Email address</Form.Label>
                                                                <Form.Control name='email' value={updateUser.email} onChange={handleChange} type="email" placeholder="Enter email" />
                                                            </Form.Group>
                                                            <Form.Group className="mb-3" controlId="formPhone">
                                                                <Form.Label>Phone</Form.Label>
                                                                <Form.Control name='phone' value={updateUser.phone} onChange={handleChange} type="tel" placeholder="Enter phone no." />
                                                            </Form.Group>
                                                            <Button size="sm" type="submit" variant="success">
                                                                Submit
                                                            </Button>
                                                        </Form>
                                                    </div>
                                                </Collapse>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="4">
                                        <Alert variant="info" className="text-center">
                                            No users to display.
                                        </Alert>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default UserInfo;
