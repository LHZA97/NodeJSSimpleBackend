// Import required modules
import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const limesurveyURL = process.env.LIMESURVEY_URL;
console.log(limesurveyURL);
// Create an Express app
const app = express();
const port = 5000;
app.use(cors());
// Middleware to parse request body as JSON
app.use(express.json());

// POST route
app.post("/api", async (req, res) => {
  try {
    const requestBody = req.body;
    const response = await axios.post(limesurveyURL, requestBody);

    res.json(response.data); // Respond with the API response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
