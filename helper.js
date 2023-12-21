import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const limesurveyURL = process.env.LIMESURVEY_URL;

export async function getQuestionList(object) {
  const { token, surveyId, id, groupName } = object;
  const body = {
    method: "list_questions",
    params: [token, surveyId, id],
    id: 1,
  };

  try {
    const response = await axios.post(limesurveyURL, body);
    const questionArr = response.data.result;
    const questionObj = questionArr.map((item) => {
      return {
        sid: item.sid,
        qid: item.qid,
        parent_qid: item?.parent_qid ? item.parent_qid : null,
        groupName: groupName,
        title: item.title,
        question: item.question,
        type: item.question_theme_name,
        mandatory: item.mandatory,
      };
    });

    const questionProperties = getQuestionProperties(questionOb.qid, token)

    // const result = [];
    // const idMap = {};

    // for (const obj of questionObj) {
    //   const { qid, parent_qid, ...rest } = obj;

    //   if (parent_qid === null) {
    //     result.push({ qid, ...rest, choices: [] });
    //     idMap[qid] = result.length - 1;
    //   } else if (idMap.hasOwnProperty(parent_qid)) {
    //     const parentIndex = idMap[parent_qid];
    //     if (!result[parentIndex].hasOwnProperty("choices")) {
    //       result[parentIndex].choices = [];
    //     }
    //     const childObject = { ...rest };
    //     childObject.answer = childObject.question;
    //     delete childObject.question;
    //     result[parentIndex].choices.push(childObject);
    //   }
    // }

    return questionObj;
  } catch (error) {
    console.error(`Error for key ${id}:`, error.message);
  }
}

export const getQuestionProperties = async (qid, token) => {

  const body = {
    method: "get_question_properties",
    params: [token, qid],
    id: 1,
  };

  try {
    const response = await axios.post(limesurveyURL, body);
    const questionArr = response.data.result;
    const questionObj = questionArr.map((item) => {
      if(item.question_theme_name.contain)
      return {
        sid: item.sid,
        qid: item.qid,
        parent_qid: item?.parent_qid ? item.parent_qid : null,
        groupName: groupName,
        title: item.title,
        question: item.question,
        type: item.question_theme_name,
        mandatory: item.mandatory,
      };
    });
  } catch (error) {
    console.error(`Error for key ${qid}:`, error.message);
  }

};
