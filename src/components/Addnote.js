import React, { useState } from 'react';
import { useContext } from 'react';
import notecontext from '../context/NoteContext';
function Addnote(props) {
    const context = useContext(notecontext)
    const { addnote } = context
    const [note, setnote] = useState({ title: "", description: "" });
    const handleclick = (e) => {
        e.preventDefault()
        addnote(note.title, note.description)
        setnote({ title: "", description: "" })
        props.showalert("Note added successfully", "success")

    }
    const onchange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className='container my-3'>
            <h3>Add notes</h3>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" name="title" id="title" aria-describedby="emailHelp" value={note.title} onChange={onchange} required minLength={5} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" value={note.description} name="description" id="description" onChange={onchange} required minLength={5} />
                </div>

                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleclick}>Add note</button>
            </form>
        </div>
    );
}

export default Addnote;
