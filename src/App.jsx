import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import AddSubject from './components/AddSubject'

import './App.css'
import Footer from './components/Footer';

function App() {

  return (   
      <div className='app_container'>
        <Navbar />
        <div id='content'>  
          <div id='title'>
            <h1>YOU CAN DO IT AND NEVER THINK THE OPPOSITE</h1>
          </div>
          <div>
            <p className="read-the-docs">From teachers to teachers</p>
          </div>
          <Routes>
            <Route path="/dashboard/:id" element={<Dashboard />} />
            <Route path="/add-subject" element={<AddSubject />} />
          </Routes>
        </div>
        <Footer />
      </div>    
  );
};

export default App
