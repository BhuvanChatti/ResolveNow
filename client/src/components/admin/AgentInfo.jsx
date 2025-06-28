
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

const AgentInfo = () => {
  const navigate = useNavigate();
  const [agentList, setAgentList] = useState([]);
  const [toggle, setToggle] = useState({});
  const [updateAgent, setUpdateAgent] = useState({ name: '', email: '', phone: '' });

  const handleChange = (e) => {
    setUpdateAgent({ ...updateAgent, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (userId) => {
    if (!updateAgent.name && !updateAgent.email && !updateAgent.phone) {
      alert("Please fill at least one field to update.");
      return;
    }

    const confirmUpdate = window.confirm("Are you sure you want to update this agent?");
    if (confirmUpdate) {
      try {
        await axios.put(`http://localhost:8000/user/${userId}`, updateAgent);
        alert("Agent updated successfully.");
        setUpdateAgent({ name: '', email: '', phone: '' });

        const refreshed = await axios.get('http://localhost:8000/agentUsers');
        setAgentList(refreshed.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const deleteAgent = async (userId) => {
    const confirmed = window.confirm("Are you sure you want to delete this agent?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8000/OrdinaryUsers/${userId}`);
        setAgentList(agentList.filter((user) => user._id !== userId));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleToggle = (agentId) => {
    setToggle((prev) => ({
      ...prev,
      [agentId]: !prev[agentId],
    }));
  };

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get('http://localhost:8000/agentUsers');
        setAgentList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAgents();
  }, [navigate]);

  return (
    <>
      <div className="user-info-body">
        <Container className="user-info-container">
          <h2 className="text-center mb-4">Registered Agents</h2>
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
              {agentList.length > 0 ? (
                agentList.map((agent) => {
                  const open = toggle[agent._id] || false;

                  return (
                    <tr key={agent._id}>
                      <td>{agent.name}</td>
                      <td>{agent.email}</td>
                      <td>{agent.phone}</td>
                      <td className="user-actions-cell">
                        <Button
                          onClick={() => handleToggle(agent._id)}
                          variant="warning"
                          size="sm"
                          className="mx-1"
                        >
                          Update
                        </Button>
                        <Button
                          onClick={() => deleteAgent(agent._id)}
                          variant="danger"
                          size="sm"
                          className="mx-1"
                        >
                          Delete
                        </Button>

                        <Collapse in={open}>
                          <div className="user-update-form mt-2">
                            <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(agent._id); }}>
                              <Form.Group className="mb-2" controlId="formName">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="name"
                                  value={updateAgent.name}
                                  onChange={handleChange}
                                  placeholder="Enter name"
                                />
                              </Form.Group>
                              <Form.Group className="mb-2" controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                  type="email"
                                  name="email"
                                  value={updateAgent.email}
                                  onChange={handleChange}
                                  placeholder="Enter email"
                                />
                              </Form.Group>
                              <Form.Group className="mb-3" controlId="formPhone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                  type="tel"
                                  name="phone"
                                  value={updateAgent.phone}
                                  onChange={handleChange}
                                  placeholder="Enter phone no."
                                />
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
                      No agents to display.
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

export default AgentInfo;
