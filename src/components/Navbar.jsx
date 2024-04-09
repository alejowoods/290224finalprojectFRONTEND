import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <img 
        src="./public/school.png" 
        alt="" 
        onClick={() => navigate('/')} 
      />
    </div>
  );
};

export default Navbar;