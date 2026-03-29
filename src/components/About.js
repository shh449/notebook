import notecontext from '../context/NoteContext';
import { useContext } from 'react';
import { useEffect } from 'react';
export default function About() {
    const context = useContext(notecontext)
    const { notes, profile } = context


    useEffect(() => {


        profile()

    }, []);

    return (
        <div className='col-md-3'>
            <div className="card my-3 ">
                <div className="card-body my-3">
                    <div className='d-flex align-items-center'>
                        <h5 className="card-title">  User Information</h5>

                    </div>
                    <p className="card-text">Name:{notes.name}</p>
                    <p className="card-text">Email:{notes.email}</p>
                    <p className="card-text">Date of registeration:{notes.date}</p>
                </div>
            </div>
        </div>

    );
}
