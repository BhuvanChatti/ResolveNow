

import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Alert from 'react-bootstrap/Alert';
import Footer from '../common/FooterC';
import axios from 'axios';

const AccordionAdmin = () => {
  const [complaintList, setComplaintList] = useState([]);
  const [agentList, setAgentList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [complaintsRes, agentsRes] = await Promise.all([
          axios.get('http://localhost:8000/status'),
          axios.get('http://localhost:8000/AgentUsers'),
        ]);
        setComplaintList(complaintsRes.data);
        setAgentList(agentsRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleAssign = async (agentId, complaintId, status, agentName) => {
    try {
      await axios.get(`http://localhost:8000/AgentUsers/${agentId}`);
      await axios.post('http://localhost:8000/assignedComplaints', {
        agentId,
        complaintId,
        status,
        agentName,
      });

      setComplaintList(prev => prev.filter(item => item._id !== complaintId));
      alert(`Complaint assigned to Agent ${agentName}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="accordion-admin-container">
      <Accordion defaultActiveKey="0" alwaysOpen className="accordian">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Users Complaints</Accordion.Header>
          <Accordion.Body className="bg-light">
            <div className="card-wrapper">
              {complaintList.length > 0 ? (
                complaintList.map((complaint, index) => (
                  <Card key={index} className="complaint-card">
                    <Card.Body>
                      <Card.Title className="text-center fw-bold text-primary">
                        {complaint.name}
                      </Card.Title>
                      <div className="complaint-details mt-3 small">
                        <Card.Text><strong>Address:</strong> {complaint.address}</Card.Text>
                        <Card.Text><strong>City:</strong> {complaint.city}</Card.Text>
                        <Card.Text><strong>State:</strong> {complaint.state}</Card.Text>
                        <Card.Text><strong>Pincode:</strong> {complaint.pincode}</Card.Text>
                        <Card.Text><strong>Comment:</strong> {complaint.comment}</Card.Text>
                        <Card.Text><strong>Status:</strong> {complaint.status}</Card.Text>
                      </div>

                      {complaint.status !== "completed" && (
                        <Dropdown className="mt-3">
                          <Dropdown.Toggle variant="warning" size="sm">
                            Assign to Agent
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            {agentList.map((agent, i) => (
                              <Dropdown.Item
                                key={i}
                                onClick={() =>
                                  handleAssign(agent._id, complaint._id, complaint.status, agent.name)
                                }
                              >
                                {agent.name}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      )}
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <Alert variant="info">
                  <Alert.Heading>No complaints to show</Alert.Heading>
                </Alert>
              )}
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Available Agents</Accordion.Header>
          <Accordion.Body className="bg-light">
            <div className="card-wrapper">
              {agentList.length > 0 ? (
                agentList.map((agent, i) => (
                  <Card key={i} className="agent-card">
                    <Card.Body>
                      <Card.Title className="fw-semibold">{agent.name}</Card.Title>
                      <Card.Text>Email: {agent.email}</Card.Text>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <Alert variant="info">
                  <Alert.Heading>No Agents available</Alert.Heading>
                </Alert>
              )}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Footer />
    </div>
  );
};

export default AccordionAdmin;
