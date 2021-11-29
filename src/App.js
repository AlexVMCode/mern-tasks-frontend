import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import './App.css';

import { Route, Routes } from 'react-router-dom';

import Singin from './components/Signin';
import Singup from './components/Signup';
import Home from './components/Home';

import { ContextProvider } from './context/GlobalContext'

function App() {
  return (
    <ContextProvider>
      <Routes>
        <Route path="/" element={<Singin />} />
        <Route path="/signin" element={<Singin />} />
        <Route path="/signup" element={<Singup />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Singin />} />
      </Routes>
    </ContextProvider>
  );
}

export default App;
