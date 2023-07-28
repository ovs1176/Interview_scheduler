import React, { useContext, useEffect, useRef, useState } from 'react'
import interviewContext from "../context/interviews/interviewContext"
import Interviewitem from './Interviewitem';
import AddInterview from './AddInterview';

const Interviews = () => {
    const context = useContext(interviewContext);
    const { interviews, getInterviews, editInterview } = context;
    useEffect(() => {
        getInterviews()
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    
    const [interview, setInterview] = useState({id: "", etitle: "", edescription: "", einterviewee_email: "", einterviewer_email: "", epresentDate: "", estart_time: "", eend_time: ""})

    const updateInterview = (currentInterview) => {
        ref.current.click();
        setInterview({id: currentInterview._id, etitle: currentInterview.title, edescription: currentInterview.description, einterviewee_email:currentInterview.interviewee_email, einterviewer_email:currentInterview.interviewer_email, epresentDate:currentInterview.presentDate, estart_time:currentInterview.start_time,  eend_time:currentInterview.end_time})
    }

    const handleClick = (e)=>{ 
        editInterview(interview.id, interview.etitle, interview.edescription, interview.einterviewee_email, interview.einterviewer_email, interview.epresentDate, interview.estart_time, interview.eend_time)
        refClose.current.click();
    }

    const onChange = (e)=>{
        setInterview({...interview, [e.target.name]: e.target.value})
    }

    return (
        <>
            <AddInterview />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Interview</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title*</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={interview.etitle} aria-describedby="emailHelp" onChange={onChange} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description*</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={interview.edescription} onChange={onChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="interviewee_email" className="form-label">interviewee_email*</label>
                                    <input type="email" className="form-control" id="einterviewee_email" name="einterviewee_email" value={interview.einterviewee_email} onChange={onChange} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="interviewer_email" className="form-label">interviewer_email*</label>
                                    <input type="email" className="form-control" id="einterviewer_email" name="einterviewer_email" value={interview.einterviewer_email} onChange={onChange} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="presentDate" className="form-label">Interview Date*</label>
                                    <input type="date" className="form-control" id="epresentDate" name="epresentDate" value={interview.epresentDate} onChange={onChange} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="start_time" className="form-label">start_time*</label>
                                    <input type="time" className="form-control" id="estart_time" name="estart_time" value={interview.estart_time} onChange={onChange} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="end_time" className="form-label">end_time*</label>
                                    <input type="time" className="form-control" id="eend_time" name="eend_time" value={interview.eend_time} onChange={onChange} required/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" className="btn btn-primary">Update Interview</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>All Scheduled Interviews</h2>
                <div className="container mx-2"> 
                {interviews.length===0 && 'No interviews to display'}
                </div>
                {interviews.map((interview) => {
                    return <Interviewitem key={interview._id} updateInterview={updateInterview} interview={interview} />
                })}
            </div>
        </>
    )
}

export default Interviews
