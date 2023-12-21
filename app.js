// Import required modules
import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import { getQuestionList } from "./helper.js";

dotenv.config();
const limesurveyURL = process.env.LIMESURVEY_URL;
// Create an Express app
const app = express();
const port = 3010;
app.use(cors());
// Middleware to parse request body as JSON
app.use(express.json());

// POST route
app.post("/api", async (req, res) => {
  try {
    const requestBody = req.body;
    const response = await axios.post(limesurveyURL, requestBody);
    res.status(200).send(response.data.result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred in api" });
  }
});

app.post("/surveyList", async (req, res) => {
  try {
    const requestBody = req.body;
    const response = await axios.post(limesurveyURL, requestBody);
    const surveyList = response.data.result.map((item) => {
      return { surveyId: item.sid, surveyName: item.surveyls_title };
    });
    res.status(200).send(surveyList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred in surveyList" });
  }
});

app.post("/questionList", async (req, res) => {
  try {
    const requestBody = req.body;
    const sessionKey = requestBody.params[0];
    const surveyId = requestBody.params[1];
    const questions = [];
    const questionsProps = [];
    const response = await axios.post(limesurveyURL, requestBody);
    const groupName = response.data.result.map((i) => {
      return {
        id: i.id,
        groupName: i.group_name,
        token: sessionKey,
        surveyId: surveyId,
      };
    });
    for (const object of groupName) {
      const question = await getQuestionList(object);
      questions.push(question);
    }
    const questionsArr = questions.flat();
    for (object of questionsArr) {
      for (const [key, value] of Object.entries(object)) {
        if (key === "parent_qid".equal(null)) {
          const question = await getQuestionProperties(object);
          questionsProps.push(question);
        }
      }
    }

    res.status(200).send(questionsArr);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred in surveyId" });
  }
});

app.post("/addResponse", async (req, res) => {
  a;
  try {
    const requestBody = req.body;
    const response = await axios.post(limesurveyURL, requestBody);
    res.status(200).send(response.data.result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred in addResponse" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
