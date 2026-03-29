import React from 'react';
import notecontext from '../context/NoteContext';
import { useContext } from 'react';
export default function Notesitem(props) {
    const context = useContext(notecontext)
    const { deletenote } = context
    const { note, update } = props


    return (


        <div className='col-md-3'>
            <div className="card my-3 ">
                <div className="card-body my-3">
                    <div className='d-flex align-items-center'>
                        <h5 className="card-title"> {note.title}</h5>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { update(note) }} ></i>
                        <i className="fa-solid fa-trash-can mx-2" onClick={() => deletenote(note._id)}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>

    );
}
