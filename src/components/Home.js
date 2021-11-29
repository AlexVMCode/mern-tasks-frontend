import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Navigation from './Navigation';
import { GlobalContext } from '../context/GlobalContext';
import { toast, Toaster } from 'react-hot-toast';

function Home() {

    let navigate = useNavigate();

    const { URI } = useContext(GlobalContext);

    const [token, setToken] = useState(
        {
            value: '',
            userId: '',
            userName: '',
        }
    );

    const [task, setTask] = useState({
        id: '',
        title: '',
        description: '',
        priority: '',
        authorId: '',
        dueDate: '',
        editing: false
    });

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
            getTasks(tokenDecoded.id, auth_token);
        } else {
            navigate("/signin");
        }
    }, []);

    const [tasks, setTasks] = useState([]);

    const handleChange = e => {
        setTask({ ...task, [e.target.name]: e.target.value });
    }

    const getTasks = async (userId = null, value = null) => {
        let id = userId != null ? userId : token.userId;
        let tokenEncoded = value != null ? value : token.value;
        try {
            const { data } = await axios.get(URI + '/tasks/myTasks/' + id, {
                headers: {
                    'x-access-token': tokenEncoded
                }
            });
            setTasks(data);
        } catch (error) {
            console.log(error.response);
        }
    }

    const getTaskById = async (e) => {
        let id = e.target.id;
        const res = await axios.get(URI + '/tasks/' + id, {
            headers: {
                'x-access-token': token.value
            }
        });
        setTask({
            id: res.data._id,
            title: res.data.title,
            description: res.data.description,
            priority: res.data.priority,
            authorId: res.data.authorId,
            dueDate: res.data.dueDate,
            editing: true
        });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if (task.editing) {
            // Editar
            const updateTask = {
                title: task.title,
                description: task.description,
                priority: task.priority,
                authorId: task.authorId,
                dueDate: task.dueDate,
            };
            await axios.put(URI + '/tasks/' + task.id, updateTask, {
                headers: {
                    'x-access-token': token.value
                }
            });
        } else {
            // Registrar
            const newTask = {
                title: task.title,
                description: task.description,
                priority: task.priority,
                authorId: token.userId,
                dueDate: task.dueDate,
            };
            await axios.post(URI + '/tasks', newTask, {
                headers: {
                    'x-access-token': token.value
                }
            });
        }
        resetForm();
        getTasks();

    }

    const deleteTask = (e) => {
        if (window.confirm("¿Desea realmente eliminar el registro?")) {
            const id = e.target.id;
            axios.delete( URI + '/tasks/' + id, {
                headers: {
                    'x-access-token': token.value
                }
            }).then(
                res => {
                    toast.success('Registro eliminado');
                    getTasks();
                },
                error => {
                    toast.error("Error al eliminar");
                }
            )
        }
    }

    const resetForm = () => {
        setTask({
            id: '',
            title: '',
            description: '',
            priority: '',
            authorId: '',
            dueDate: '',
            editing: false
        });
    }

    return (
        <div>
            <Navigation />
            <div className="container p-4">
                <div className="row">
                    <div className="col-md-4 mb-5">
                        <div className="card">
                            <div className="card-header">
                                <h3>Gestionar tarea</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="mb-3">
                                            <label htmlFor="title" className="form-label">Título</label>
                                            <input type="text" className="form-control" name="title" onChange={handleChange} value={task.title} placeholder="Ingresa un titulo" required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="description" className="form-label">Descripción</label>
                                            <input type="text" className="form-control" name="description" onChange={handleChange} value={task.description} placeholder="Ingresa una descripción" required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="priority" className="form-label">Prioridad</label>
                                            <select className="form-control" name="priority" onChange={handleChange} value={task.priority} placeholder="Selecciona una prioridad" required>
                                                <option value="">Seleccione</option>
                                                <option value="Baja">Baja</option>
                                                <option value="Media">Media</option>
                                                <option value="Alta">Alta</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="dueDate" className="form-label">Finalización</label>
                                            <input type="date" className="form-control" name="dueDate" onChange={handleChange} value={task.dueDate} placeholder="Selecciona una fecha" required />
                                        </div>
                                        <div className="mb-3 text-center">
                                            <button type="submit" className="btn btn-outline-success">Guardar</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                <h3>Lista de tareas</h3>
                            </div>
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Acciones</th>
                                            <th scope="col">Título</th>
                                            <th scope="col">Descripción</th>
                                            <th scope="col">Prioridad</th>
                                            <th scope="col">Finalización</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            tasks.map(task =>
                                                <tr key={task._id}>
                                                    <th>
                                                        <button type="button" onClick={getTaskById} id={task._id} className="btn btn-sm btn-outline-primary me-1">
                                                            Editar
                                                        </button>
                                                        <button type="button" onClick={deleteTask} id={task._id} className="btn btn-sm btn-outline-danger">
                                                            Eliminar
                                                        </button>
                                                    </th>
                                                    <th>{task.title}</th>
                                                    <td>{task.description}</td>
                                                    <td>{task.priority}</td>
                                                    <td>{task.dueDate}</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster position="top-right" reverseOrder={false} />
        </div>
    )
}

export default Home
