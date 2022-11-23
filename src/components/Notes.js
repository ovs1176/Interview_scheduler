import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import Noteitem from './Noteitem';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        getNotes()
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    
    const [note, setNote] = useState({id: "", etitle: "", edescription: "", einterviewee_email: "", einterviewer_email: "", epresentDate: "", estart_time: "", eend_time: ""})

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, einterviewee_email:currentNote.interviewee_email, einterviewer_email:currentNote.interviewer_email, epresentDate:currentNote.presentDate, estart_time:currentNote.start_time,  eend_time:currentNote.end_time})
    }

    const handleClick = (e)=>{ 
        editNote(note.id, note.etitle, note.edescription, note.einterviewee_email, note.einterviewer_email, note.epresentDate, note.estart_time, note.eend_time)
        refClose.current.click();
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <>
            <AddNote />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title*</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description*</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="interviewee_email" className="form-label">interviewee_email*</label>
                                    <input type="email" className="form-control" id="einterviewee_email" name="einterviewee_email" value={note.einterviewee_email} onChange={onChange} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="interviewer_email" className="form-label">interviewer_email*</label>
                                    <input type="email" className="form-control" id="einterviewer_email" name="einterviewer_email" value={note.einterviewer_email} onChange={onChange} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="presentDate" className="form-label">Interview Date*</label>
                                    <input type="date" className="form-control" id="epresentDate" name="epresentDate" value={note.epresentDate} onChange={onChange} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="start_time" className="form-label">start_time*</label>
                                    <input type="time" className="form-control" id="estart_time" name="estart_time" value={note.estart_time} onChange={onChange} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="end_time" className="form-label">end_time*</label>
                                    <input type="time" className="form-control" id="eend_time" name="eend_time" value={note.eend_time} onChange={onChange} required/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>All Scheduled Interviews</h2>
                <div className="container mx-2"> 
                {notes.length===0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
