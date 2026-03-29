import React, { useEffect, useRef, useState } from 'react';
import notecontext from '../context/NoteContext';
import { useContext } from 'react';
import Notesitem from './Notesitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';
export default function Notes(props) {
    const { showalert } = props
    const context = useContext(notecontext)
    let navigate = useNavigate()
    const { notes, getnote, editnote, } = context
    const [note, setnote] = useState({ id: "", etitle: "", edescription: "" });
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getnote()

        }
        else {
            navigate("/login")
        }
    }, []);
    const update = (currentnote) => {
        ref.current.click()
        setnote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description })
    }
    const ref = useRef(null);
    const refclose = useRef(null);
    const handleclick = async () => {

        refclose.current.click()
        editnote(note.id, note.etitle, note.edescription)




    }
    const onchange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className='container '>

                <Addnote showalert={showalert} />

                <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>


                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Notes</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className='container my-3'>
                                    <h3>Add notes</h3>
                                    <form className='my-3'>
                                        <div className="mb-3">
                                            <label htmlFor="title" className="form-label">Title</label>
                                            <input type="text" className="form-control" name="etitle" id="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onchange} required minLength={5} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="description" className="form-label">Description</label>
                                            <input type="text" className="form-control" value={note.edescription} name="edescription" id="edescription" onChange={onchange} required minLength={5} />
                                        </div>


                                    </form>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleclick}>Add Notes</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container d-flex flex-wrap gap-3'>
                    {notes.length === 0 && "No notes are available"}
                    {Array.isArray(notes) && notes.map((note) => {
                        return <Notesitem key={note._id} note={note} update={update} />
                    })}
                </div>
            </div>
        </>
    );
}
