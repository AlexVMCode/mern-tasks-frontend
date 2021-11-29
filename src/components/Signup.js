import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from '../context/GlobalContext';

const Signup = () => {

    const { URI } = useContext(GlobalContext);

    const [user, setUser] = useState({
        name: '',
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
        const res = await axios.post(URI + '/auth/signup', user);
        if (res.data.statusCode === 200) {
            navigate('/signin', { replace: true });
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
                            <input type="text" name="name" placeholder="Nombre" onChange={handleChange} />
                        </div>

                        <div className="form__field">
                            <input type="email" name="email" placeholder="Correo" onChange={handleChange} />
                        </div>

                        <div className="form__field">
                            <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} />
                        </div>

                        <div className="form__field">
                            <input type="submit" value="Registrarse" />
                        </div>
                    </form>
                    {showError.state ? <p>{showError.message}</p> : <p></p>}
                    <p> Ya tienes una cuenta? <Link to="/signin" className="mx-1">Iniciar sesión</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Signup


// export default class Signup extends Component {

//     URI = 'http://localhost:4000/api/v1.0/auth/signup';
//     state = {
//         name: '',
//         email: '',
//         password: '',
//     }

//     onInputChange = (e) => {
//         this.setState({
//             [e.target.name]: e.target.value
//         });
//     }

//     onSubmit = (e) => {
//         e.preventDefault();
//         const newUser = {
//             name: this.state.name,
//             email: this.state.email,
//             password: this.state.email
//         };
//         axios.post(this.URI, newUser)
//             .then((res) => {
//                 localStorage.setItem('token', res.data.token);
//                 this.resetForm();

//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     }

//     resetForm() {
//         this.setState({
//             name: '',
//             email: '',
//             password: ''
//         });
//     }

//     render() {
//         return (
//             <div className="body">
//                 <div className="align">
//                     <div className="grid align__item">
//                         <div className="register">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="site__logo" width="56" height="84" viewBox="77.7 214.9 274.7 412"><defs><linearGradient id="a" x1="0%" y1="0%" y2="0%"><stop offset="0%" stopColor="#8ceabb" /><stop offset="100%" stopColor="#378f7b" /></linearGradient></defs><path fill="url(#a)" d="M215 214.9c-83.6 123.5-137.3 200.8-137.3 275.9 0 75.2 61.4 136.1 137.3 136.1s137.3-60.9 137.3-136.1c0-75.1-53.7-152.4-137.3-275.9z" /></svg>

//                             <h2>App tareas</h2>

//                             <form className="form">

//                                 <div className="form__field">
//                                     <input type="text" name="name" onChange={this.onInputChange} value={this.state.name} placeholder="Nombre" />
//                                 </div>

//                                 <div className="form__field">
//                                     <input type="email" name="email" onChange={this.onInputChange} value={this.state.email} placeholder="Correo" />
//                                 </div>

//                                 <div className="form__field">
//                                     <input type="password" name="password" onChange={this.onInputChange} value={this.state.password} placeholder="Contraseña" />
//                                 </div>

//                                 <div className="form__field">
//                                     <input type="button" value="Registrarse" onClick={this.onSubmit} />
//                                 </div>
//                             </form>
//                             <p> Ya tienes una cuenta? <Link to="/signin" className="mx-1">Iniciar sesión</Link></p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }
