import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import AddSubject from './components/AddSubject'
import Manager from './components/Manager'
import HomePage from './components/HomePage'

import './App.css'
import Footer from './components/Footer';

function App() {

  return (   
      <div className='app_container'>
        <Navbar />
        <div id='content'>  
          <div id='title'>
            <h1>Ultimate Classroom Manager</h1>
          </div>
          <div>
            <p className="read-the-docs"></p>
          </div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard/:id" element={<Dashboard />} />
            <Route path="/add-subject" element={<AddSubject />} />
            <Route path="/manager/:id" element={<Manager />} />
          </Routes>
        </div>
        <Footer />
      </div>    
  );
};

export default App
