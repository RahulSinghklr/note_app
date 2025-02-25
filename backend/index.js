require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // For parsing JSON request body
app.use(cors()); // Enable CORS

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Import Routes
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
