import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function Login(props) {
    const [creadiantials, setcreadiantials] = useState({ email: "", password: "" });
    let navigate = useNavigate()
    const handlesubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",

            },
            body: JSON.stringify({ email: creadiantials.email, password: creadiantials.password })

        })
        const json = await response.json()

        if (json.success) {
            localStorage.setItem("token", json.token)
            navigate("/")
            setcreadiantials({ email: "", password: "" });
            props.showalert("logged in successfully", "success")
        } else {
            props.showalert("invlaid creadiantials", "danger")
        }
    }
    const onchange = (e) => {
        setcreadiantials({ ...creadiantials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container' style={{ marginTop: "80px" }}>

            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" id="email" className="form-control" value={creadiantials.email} onChange={onchange} name="email" aria-describedby="emailHelp" required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input required type="password" name="password" className="form-control" value={creadiantials.password} onChange={onchange} id="password" />
                </div>
                <strong> Dont have  an account<Link to="/signup" > sign up first</Link></strong><br />
                <button type="submit" className="btn btn-primary mt-2">Login</button>

            </form>
        </div>
    );
}
