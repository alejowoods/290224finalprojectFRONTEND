import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import AddSubject from './components/AddSubject'

import './App.css'

function App() {

  return (   
      <>
        <Navbar />
        <div id='content'>  
          <div id='title'>
            <h1>YOU CAN DO IT AND NEVER THINK THE OPPOSITE</h1>
          </div>
          <div>
            <p className="read-the-docs">From teachers to teachers</p>
          </div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-subject/:id" element={<AddSubject />} />
          </Routes>
        </div>
      </>    
  );
};

export default App
