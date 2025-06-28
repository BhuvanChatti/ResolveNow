import express, { json } from "express";
import cors from "cors";
import "./config.js";
import {
  ComplaintSchema,
  UserSchema,
  AssignedComplaint,
  MessageSchema,
} from "./Schema.js";

const app = express();
const PORT = 8000;

// Middleware
app.use(json());
app.use(cors());

// ✅ Messages
app.post("/messages", async (req, res) => {
  try {
    const { name, message, complaintId } = req.body;
    const messageData = new MessageSchema({ name, message, complaintId });
    const savedMessage = await messageData.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ error: "Failed to send message" });
  }
});

app.get("/messages/:complaintId", async (req, res) => {
  try {
    const { complaintId } = req.params;
    const messages = await MessageSchema.find({ complaintId }).sort("-createdAt");
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
});

// ✅ User SignUp
app.post("/SignUp", async (req, res) => {
  try {
    const user = new UserSchema(req.body);
    const resultUser = await user.save();
    res.status(201).json(resultUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
});

// ✅ User Login
app.post("/Login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserSchema.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "User doesn't exist" });
  }
  if (user.password === password) {
    res.status(200).json(user);
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// ✅ Get Agents
app.get("/AgentUsers", async (req, res) => {
  try {
    const agentUsers = await UserSchema.find({ userType: "Agent" });
    res.status(200).json(agentUsers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Get Ordinary Users
app.get("/OrdinaryUsers", async (req, res) => {
  try {
    const users = await UserSchema.find({ userType: "Ordinary" });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Get Agent by ID
app.get("/AgentUsers/:agentId", async (req, res) => {
  try {
    const { agentId } = req.params;
    const user = await UserSchema.findById(agentId);
    if (user?.userType === "Agent") {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "Agent not found" });
    }
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Delete User and their Complaints
app.delete("/OrdinaryUsers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserSchema.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await UserSchema.deleteOne({ _id: id });
    await ComplaintSchema.deleteMany({ userId: id });
    res.status(200).json({ message: "User and complaints deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Submit Complaint
app.post("/Complaint/:id", async (req, res) => {
  try {
    const user = await UserSchema.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const complaint = new ComplaintSchema(req.body);
    const savedComplaint = await complaint.save();
    res.status(201).json(savedComplaint);
  } catch (error) {
    res.status(500).json({ error: "Failed to register complaint" });
  }
});

// ✅ Get Complaints of Single User
app.get("/status/:id", async (req, res) => {
  try {
    const complaints = await ComplaintSchema.find({ userId: req.params.id });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve complaints" });
  }
});

// ✅ Get All Complaints (Admin)
app.get("/status", async (req, res) => {
  try {
    const complaints = await ComplaintSchema.find();
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve all complaints" });
  }
});

// ✅ Assign Complaint
app.post("/assignedComplaints", async (req, res) => {
  try {
    const assignment = await AssignedComplaint.create(req.body);
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ error: "Failed to assign complaint" });
  }
});

// ✅ Get Complaints Assigned to Agent
app.get("/allcomplaints/:agentId", async (req, res) => {
  try {
    const agentId = req.params.agentId;
    const assignments = await AssignedComplaint.find({ agentId });
    const complaintIds = assignments.map((a) => a.complaintId);
    const details = await ComplaintSchema.find({ _id: { $in: complaintIds } });

    const merged = assignments.map((a) => {
      const d = details.find((x) => x._id.toString() === a.complaintId.toString());
      return {
        ...a._doc,
        name: d?.name,
        city: d?.city,
        state: d?.state,
        address: d?.address,
        pincode: d?.pincode,
        comment: d?.comment,
      };
    });

    res.status(200).json(merged);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve agent's complaints" });
  }
});

// ✅ Admin Updates User Profile
app.put("/user/:_id", async (req, res) => {
  try {
    const user = await UserSchema.findByIdAndUpdate(
      req.params._id,
      req.body,
      { new: true }
    );
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

// ✅ Agent Updates Complaint Status
app.put("/complaint/:complaintId", async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { status } = req.body;

    const updatedComplaint = await ComplaintSchema.findByIdAndUpdate(
      complaintId,
      { status },
      { new: true }
    );

    const updatedAssignment = await AssignedComplaint.findOneAndUpdate(
      { complaintId },
      { status },
      { new: true }
    );

    if (!updatedComplaint && !updatedAssignment) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    res.status(200).json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ error: "Failed to update complaint" });
  }
});

// ✅ Server Start
app.listen(PORT, () => console.log(`🚀 Server started at http://localhost:${PORT}`));
