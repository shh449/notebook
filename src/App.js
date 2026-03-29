
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/Home';
import About from './components/About';

import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import NoteState from './context/NoteState';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import { useState } from 'react';
function App() {
  const [alert, setalert] = useState(null);
  const showalert = (message, type) => {
    setalert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setalert(null)
    }, 1500);
  }

  return (
    <>

      <Router>
        <NoteState showalert={showalert}>
          <Navbar />
          <Alert alert={alert} />
          <Routes>
            <Route path='/' element={
              <Home showalert={showalert} />

            }>
            </Route>
            <Route path='/about' element={
              <About />
            }>
            </Route>
            <Route path='/login' element={
              <Login showalert={showalert} />
            }>
            </Route>
            <Route path='/signup' element={
              <Signup showalert={showalert} />
            }>
            </Route>
          </Routes>
        </NoteState>
      </Router>
    </>

  );
}

export default App;
