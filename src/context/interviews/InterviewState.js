import InterviewContext from "./interviewContext";
import { useState } from "react";

const InterviewState = (props) => {
  const host = "http://localhost:5000"
  const interviewsInitial = []
  const [interviews, setInterview] = useState(interviewsInitial)

  // Get all Interviews
  const getInterviews = async () => {
    // API Call 
    const response = await fetch(`${host}/api/interviews/fetchallinterviews`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json() 
    setInterview(json)
  }

  // Add a Interview
  const addinterview = async (title, description, interviewee_email, interviewer_email, presentDate, start_time, end_time) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/interviews/addinterview`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title, description, interviewee_email, interviewer_email, presentDate, start_time, end_time})
    });

    const interview = await response.json();
    setInterview(interviews.concat(interview))
  }

  // Delete a Interview
  const deleteInterview = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/interviews/deleteinterview/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // const json = response.json(); 
    const newInterviews = interviews.filter((interview) => { return interview._id !== id })
    setInterview(newInterviews)
  }

  // Edit a Interview
  const editInterview = async (id, title, description, interviewee_email, interviewer_email, presentDate, start_time, end_time) => {
    // API Call 
    const response = await fetch(`${host}/api/interviews/updateinterview/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title, description, interviewee_email, interviewer_email, presentDate, start_time, end_time})
    });
    // const json = await response.json(); 

     let newInterviews = JSON.parse(JSON.stringify(interviews))
    // Logic to edit in client
    for (let index = 0; index < newInterviews.length; index++) {
      const element = newInterviews[index];
      if (element._id === id) {
        newInterviews[index].title = title;
        newInterviews[index].description = description;
        newInterviews[index].interviewee_email = interviewee_email; 
        newInterviews[index].interviewer_email = interviewer_email; 
        newInterviews[index].presentDate = presentDate; 
        newInterviews[index].start_time = start_time; 
        newInterviews[index].end_time = end_time; 
        break; 
      }
    }  
    setInterview(newInterviews);
  }

  return (
    <InterviewContext.Provider value={{ interviews, addinterview, deleteInterview, editInterview, getInterviews }}>
      {props.children}
    </InterviewContext.Provider>
  )

}
export default InterviewState;