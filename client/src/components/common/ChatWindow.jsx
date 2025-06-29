import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ChatWindow = ({ complaintId, name }) => {
  const [messageInput, setMessageInput] = useState('');
  const [messageList, setMessageList] = useState([]);
  const messageWindowRef = useRef(null);

  // Fetch messages from server
  const fetchMessageList = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/messages/${complaintId}`);
      setMessageList(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Fetch messages when component mounts or complaintId changes
  useEffect(() => {
    fetchMessageList();
    const interval = setInterval(fetchMessageList, 10000);
    return () => clearInterval(interval);
  }, [complaintId]);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const scrollToBottom = () => {
    if (messageWindowRef.current) {
      messageWindowRef.current.scrollTop = messageWindowRef.current.scrollHeight;
    }
  };

  const sendMessage = async () => {
    if (!messageInput.trim()) return;

    try {
      const data = {
        name,
        message: messageInput,
        complaintId,
      };
      const response = await axios.post('http://localhost:8000/messages', data);
      setMessageList((prev) => [...prev, response.data]);
      setMessageInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div
      className="chat-container"
      style={{
        background: '#f9f9f9',
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '15px',
        maxWidth: '100%',
        height: '350px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <h5 className="text-primary mb-2">Message Box</h5>

      <div
        className="message-window mb-2"
        ref={messageWindowRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingRight: '10px',
        }}
      >
        {messageList.slice().reverse().map((msg) => (
          <div
            className="message bg-light p-2 rounded mb-2"
            key={msg._id}
            style={{ color: 'black' }}
          >
            <p className="mb-1">
              <strong>{msg.name}:</strong> {msg.message}
            </p>
            <p className="text-muted small mb-0">
              {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, 
              {' ' + new Date(msg.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      <div className="input-container mt-2">
        <textarea
          className="form-control mb-2"
          placeholder="Type your message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          rows={2}
          required
          style={{ fontSize: '1rem' }}
        />
        <button className="btn btn-success" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
