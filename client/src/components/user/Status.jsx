import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import { Button } from 'react-bootstrap';
import ChatWindow from '../common/ChatWindow';
import Collapse from 'react-bootstrap/Collapse';
import '../../App.css'; 
import '../../index.css';

const Status = () => {
  const [toggle, setToggle] = useState({});
  const [statusComplaints, setStatusComplaints] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;

    const { _id } = user;
    axios
      .get(`http://localhost:8000/status/${_id}`)
      .then((res) => {
        setStatusComplaints(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleToggle = (complaintId) => {
    setToggle((prevState) => ({
      ...prevState,
      [complaintId]: !prevState[complaintId],
    }));
  };

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', margin: '20px' }}>
        {statusComplaints.length > 0 ? (
          statusComplaints.map((complaint) => {
            const open = toggle[complaint._id] || false;

            return (
              <Card
                key={complaint._id}
                style={{ width: '18.5rem', margin: '0 15px 15px 0' }}
              >
                <Card.Body>
                  <Card.Title>Name: {complaint.name}</Card.Title>
                  <Card.Text>Address: {complaint.address}</Card.Text>
                  <Card.Text>City: {complaint.city}</Card.Text>
                  <Card.Text>State: {complaint.state}</Card.Text>
                  <Card.Text>Pincode: {complaint.pincode}</Card.Text>
                  <Card.Text>Comment: {complaint.comment}</Card.Text>
                  <Card.Text>Status: {complaint.status}</Card.Text>
                  {/* Optional Date Field (if available in your schema) */}
                  {/* <Card.Text>Date: {new Date(complaint.createdAt).toLocaleDateString()}</Card.Text> */}

                  <Button
                    className="mb-2"
                    style={{ float: 'right' }}
                    onClick={() => handleToggle(complaint._id)}
                    aria-controls={`collapse-${complaint._id}`}
                    aria-expanded={open}
                    variant="primary"
                  >
                    Message
                  </Button>

                  <Collapse in={open}>
                    <div id={`collapse-${complaint._id}`}>
                      <Card body style={{ marginTop: '12px' }}>
                        <ChatWindow
                          key={complaint._id}
                          complaintId={complaint._id}
                          name={complaint.name}
                        />
                      </Card>
                    </div>
                  </Collapse>
                </Card.Body>
              </Card>
            );
          })
        ) : (
          <Alert variant="info" className="w-100 text-center">
            <Alert.Heading>No complaints to show</Alert.Heading>
            <p>You haven’t registered any complaints yet.</p>
          </Alert>
        )}
      </div>
    </>
  );
};

export default Status;
