ResolveNow: Your Platform for Online Complaints

ResolveNow is a full-stack web application designed to streamline the process of raising and resolving complaints online. It provides a digital platform for users to register complaints, track progress, and communicate with agents/admins in real-time.

Features:
User Side:
1.Register & login securely
2.File complaints with categories & descriptions
3.View status updates (Pending, In Progress, Resolved)
4.Real-time notifications/messages from support agents

Admin/Agent Side:
1.Manage and assign complaints to agents
2.Update complaint statuses
3.Real-time chat with users
4.Dashboard overview for complaint statistics

Tech Stack:
Frontend:
1.React.js
2.TailwindCSS

Backend:
1.Node.js
2.Express.js

Database:
MongoDB

Others:
1.JWT Authentication
2.WebSockets or Socket.io (for real-time messaging)
3.RESTful APIs

Getting Started:
Prerequisites:
1.Node.js
2.MongoDB (local or Atlas)
3.npm or yarn

Installation:
git clone https://github.com/your-username/resolvenow.git
cd resolvenow

Server:
cd server
npm install
npm start

Client:
cd client
npm install
npm start

Visit http://localhost:3000 to view the app.

Folder Structure:
resolvenow/
├── client/                     # React frontend
├── server/                     # Express backend
├── readme/                     # Project reports and documentation templates
│   ├── Ideation Phase.pdf
│   ├── Performance Testing.pdf
│   ├── Project Design Phase.pdf
│   ├── Project Planning Phase.pdf
│   ├── Requirement Analysis.pdf
│   └── README.md               # This file (project overview)
├── README.md                   # Main project README


Future Improvements:
Complaint filtering and search functionality
Email notifications
Mobile responsiveness
Complaint escalation system

Contributing:
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
