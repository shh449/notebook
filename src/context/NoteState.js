import notecontext from "./NoteContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const NoteState = (props) => {
    let navigate = useNavigate()
    let host = "http://localhost:5000"
    const noteinitial = []
    const [notes, setnotes] = useState(noteinitial);
    //fetch all notes
    const getnote = async () => {
        const response = await fetch(`${host}/api/not/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
        })
        const json = await response.json()
        if (response.status === 401) {
            localStorage.removeItem("token");
            navigate("/login");
        }


        setnotes(json)
    }
    // fetching user information
    const profile = async () => {
        const response = await fetch(`http://localhost:5000/api/auth/profile`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
        })
        const json = await response.json()

        setnotes(json)
        if (response.status === 401) {
            localStorage.removeItem("token");
            navigate("/login");
        }
    }

    //Adding notes;
    const addnote = async (title, description) => {
        const response = await fetch(`${host}/api/not/sendnotes`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description })
        })
        const json = await response.json()
        if (response.status === 401) {
            localStorage.removeItem("token");
            navigate("/login");
        }




        setnotes(Array.isArray(notes) && notes.concat(json))
    }
    const deletenote = async (id) => {
        await fetch(`${host}/api/not/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "auth-token": localStorage.getItem("token")
            },

        })
        const newnote = notes.filter((note) => { return note._id !== id })
        setnotes(newnote)
        props.showalert("Note deleted successfully", "success")


    }
    const editnote = async (id, title, description) => {
        //calling api
        const response = await fetch(`${host}/api/not/updatedata/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ id, title, description })
        })
        const json = await response.json()
        if (response.status === 401) {
            localStorage.removeItem("token");
            navigate("/login");
        }

        let newnotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newnotes.length; index++) {
            const element = newnotes[index]
            if (element._id === id) {
                newnotes[index].title = title
                newnotes[index].description = description
                break;
            }

        }
        setnotes(newnotes)
        props.showalert("Note edits successfully", "success")
    }


    return (
        <notecontext.Provider value={{ notes, addnote, deletenote, editnote, getnote, profile }}>
            {props.children}
        </notecontext.Provider>
    )
}
export default NoteState