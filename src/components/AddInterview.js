import React, {useContext, useState} from 'react'
import interviewContext from "../context/interviews/interviewContext"

const AddInterview = () => {
    const context = useContext(interviewContext);
    const {addinterview} = context;

    const [interview, setInterview] = useState({title: "", description: "", interviewee_email: "", interviewer_email: "", presentDate: "", start_time: "", end_time: ""})

    const handleClick = async (e)=>{
        e.preventDefault();
        console.log(interview , addinterview)
         addinterview(interview.title, interview.description, interview.interviewee_email, interview.interviewer_email, interview.presentDate, interview.start_time, interview.end_time);
        setInterview({title: "", description: "", interviewee_email: "", interviewer_email: "", presentDate: "", start_time: "", end_time: ""})
    }

    const onChange = (e)=>{
        setInterview({...interview, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <h2>Schedule an Interview</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title*</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={interview.title} onChange={onChange} required /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description*</label>
                    <input type="text" className="form-control" id="description" name="description" value={interview.description} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="interviewee_email" className="form-label">interviewee_email*</label>
                    <input type="email" className="form-control" id="interviewee_email" name="interviewee_email" value={interview.interviewee_email} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="interviewer_email" className="form-label">interviewer_email*</label>
                    <input type="email" className="form-control" id="interviewer_email" name="interviewer_email" value={interview.interviewer_email} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="presentDate" className="form-label">Interview Date*</label>
                    <input type="date" className="form-control" id="presentDate" name="presentDate" value={interview.presentDate} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="start_time" className="form-label">start_time*</label>
                    <input type="time" className="form-control" id="start_time" name="start_time" value={interview.start_time} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="end_time" className="form-label">end_time*</label>
                    <input type="time" className="form-control" id="end_time" name="end_time" value={interview.end_time} onChange={onChange} required />
                </div>
               
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </div>
    )
}

export default AddInterview
