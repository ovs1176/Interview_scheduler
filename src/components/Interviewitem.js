import React, {useContext} from 'react'
import interviewContext from "../context/interviews/interviewContext"


const InterviewItem = (props) => {
    const context = useContext(interviewContext);
    const { deleteInterview } = context;
    const { interview, updateInterview } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{interview.title}</h5>
                        <i className="far fa-trash-alt mx-2" onClick={()=>{deleteInterview(interview._id)}}></i>
                        <i className="far fa-edit mx-2" onClick={()=>{updateInterview(interview)}}></i>
                    </div>
                    <p className="card-text">{interview.description}</p>
                    <p className="card-text">{interview.presentDate}</p>
                    <p className="card-text">Interviewer : {interview.interviewer_email}</p>
                    <p className="card-text">Interviewee : {interview.interviewee_email}</p>
                    <p className="card-text">{interview.start_time} to {interview.end_time}</p>
                </div>
            </div>
        </div>
    )
}

export default InterviewItem
