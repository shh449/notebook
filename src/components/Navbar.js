import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Navbar() {
    let navigate = useNavigate()
    const handlelog = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }
    let location = useLocation()

    useEffect(() => {


    }, [location]);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Notebook</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} aria-current="page" to="/about">About</Link>
                        </li>



                    </ul>
                    {!localStorage.getItem("token") ? <form className="d-flex">

                        <Link className="btn btn-primary" to="/login" role="button">Login</Link>
                        <Link className="btn btn-primary mx-2" to="signup" role="button">Sign up</Link>
                    </form> : <button className='btn btn-primary' onClick={handlelog}>Log out</button>}
                </div>
            </div>
        </nav>
    );
}
