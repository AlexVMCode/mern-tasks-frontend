import React,{ useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import jwt from 'jsonwebtoken';

function Navigation() {

    let navigate = useNavigate();

    const [token, setToken] = useState(
        {
            value: '',
            userId: '',
            userName: '',
        }
    );

    useEffect(() => {
        if (localStorage.auth_token) {
            let auth_token = localStorage.getItem('auth_token');
            let tokenDecoded = jwt.decode(auth_token, { json: true });
            setToken({
                ...token,
                value: auth_token,
                userId: tokenDecoded.id,
                userName: tokenDecoded.name,
            });
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("auth_token");
        navigate('/');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/home">App Tareas</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <span className="nav-link logout" onClick={logout}>Logout</span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link">{token.userName}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navigation
