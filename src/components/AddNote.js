import React, {useContext, useState} from 'react'
import noteContext from "../context/notes/noteContext"

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", interviewee_email: "", interviewer_email: "", presentDate: "", start_time: "", end_time: ""})

    const handleClick = async (e)=>{
        e.preventDefault();
        
        addNote(note.title, note.description, note.interviewee_email, note.interviewer_email, note.presentDate, note.start_time, note.end_time);
        setNote({title: "", description: "", interviewee_email: "", interviewer_email: "", presentDate: "", start_time: "", end_time: ""})
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <h2>Schedule an Interview</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title*</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} required /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description*</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="interviewee_email" className="form-label">interviewee_email*</label>
                    <input type="email" className="form-control" id="interviewee_email" name="interviewee_email" value={note.interviewee_email} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="interviewer_email" className="form-label">interviewer_email*</label>
                    <input type="email" className="form-control" id="interviewer_email" name="interviewer_email" value={note.interviewer_email} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="presentDate" className="form-label">Interview Date*</label>
                    <input type="date" className="form-control" id="presentDate" name="presentDate" value={note.presentDate} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="start_time" className="form-label">start_time*</label>
                    <input type="time" className="form-control" id="start_time" name="start_time" value={note.start_time} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="end_time" className="form-label">end_time*</label>
                    <input type="time" className="form-control" id="end_time" name="end_time" value={note.end_time} onChange={onChange} required />
                </div>
               
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </div>
    )
}

export default AddNote
