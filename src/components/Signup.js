import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
export default function Signup(props) {
    const [creadiantials, setcreadiantials] = useState({ name: "", email: "", password: "" });
    let navigate = useNavigate()
    const handlesignup = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",

            },
            body: JSON.stringify({ name: creadiantials.name, email: creadiantials.email, password: creadiantials.password })
        })
        const json = await response.json()

        if (json.success) {
            localStorage.setItem("token", json.token)
            navigate("/")
            props.showalert("sign up successfully", "success")
            setcreadiantials({ name: "", email: "", password: "" });
        }
        else {
            props.showalert("invlaid creadiantials", "danger")
        }
    }
    const onchange = (e) => {
        setcreadiantials({ ...creadiantials, [e.target.name]: e.target.value, })
    }
    return (
        <div className='container' style={{ marginTop: "80px" }}>
            <form onSubmit={handlesignup}>
                <div className="mb-3">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name='name' onChange={onchange} value={creadiantials.name} minLength={3} required />
                    </div>
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' onChange={onchange} value={creadiantials.email} required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onchange} value={creadiantials.password} minLength={4} required />
                </div>
                <strong> Already have  an account<Link style={{ textunderline: "none" }} to="/login" > login</Link></strong><br />
                <button type="submit" className="btn btn-primary mt-2">Sign up</button>
            </form>
        </div>
    );
}
