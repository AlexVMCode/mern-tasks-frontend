import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { GlobalContext } from '../context/GlobalContext'

const Signin = () => {

    const { URI } = useContext(GlobalContext);

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const [showError, setShowError] = useState({
        state: false,
        message: ''
    });

    let navigate = useNavigate();
    
    useEffect(() => {
        if (localStorage.auth_token) {
            navigate("/home");
        }
    }, []);

    const handleChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const res = await axios.post(URI + '/auth/signin', user);
        if (res.data.token) {
            localStorage.setItem('auth_token', res.data.token);
            navigate('/home');
        } else {
            // Mostrar mensaje de error;
            setShowError({
                ...showError, state: true, message: res.data.message
            });
        }
    }

    return (
        <div className="form-auth">
            <div className="grid align__item">
                <div className="register">
                    <svg xmlns="http://www.w3.org/2000/svg" className="site__logo" width="56" height="84" viewBox="77.7 214.9 274.7 412"><defs><linearGradient id="a" x1="0%" y1="0%" y2="0%"><stop offset="0%" stopColor="#8ceabb" /><stop offset="100%" stopColor="#378f7b" /></linearGradient></defs><path fill="url(#a)" d="M215 214.9c-83.6 123.5-137.3 200.8-137.3 275.9 0 75.2 61.4 136.1 137.3 136.1s137.3-60.9 137.3-136.1c0-75.1-53.7-152.4-137.3-275.9z" /></svg>

                    <h2>App tareas</h2>

                    <form className="form" onSubmit={handleSubmit}>

                        <div className="form__field">
                            <input type="email" name="email" placeholder="alguien@dominio.com" onChange={handleChange} required />
                        </div>

                        <div className="form__field">
                            <input type="password" name="password" placeholder="••••••••••••" onChange={handleChange} required />
                        </div>

                        <div className="form__field">
                            <input type="submit" value="Iniciar sesión" />
                        </div>
                    </form>
                    {showError.state ? <p>{showError.message}</p> : <p></p>}
                    <p> No tienes una cuenta?<Link to="/signup" className="mx-1">Registrarme</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Signin


// export default class Signin extends Component {
//     render() {
//         return (
//             <div className="body">
//                 <div className="form-auth">
//                     <div className="grid align__item">
//                         <div className="register">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="site__logo" width="56" height="84" viewBox="77.7 214.9 274.7 412"><defs><linearGradient id="a" x1="0%" y1="0%" y2="0%"><stop offset="0%" stopColor="#8ceabb" /><stop offset="100%" stopColor="#378f7b" /></linearGradient></defs><path fill="url(#a)" d="M215 214.9c-83.6 123.5-137.3 200.8-137.3 275.9 0 75.2 61.4 136.1 137.3 136.1s137.3-60.9 137.3-136.1c0-75.1-53.7-152.4-137.3-275.9z" /></svg>

//                             <h2>App tareas</h2>

//                             <form className="form">

//                                 <div className="form__field">
//                                     <input type="email" name="email" placeholder="alguien@dominio.com" />
//                                 </div>

//                                 <div className="form__field">
//                                     <input type="password" name="password" placeholder="••••••••••••" />
//                                 </div>

//                                 <div className="form__field">
//                                     <input type="button" value="Iniciar sesión" />
//                                 </div>
//                             </form>
//                             <p> No tienes una cuenta?<Link to="/signup" className="mx-1">Registrarme</Link></p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }
