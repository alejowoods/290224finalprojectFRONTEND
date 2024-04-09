import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    const goToDashboard = () => {
        navigate('/dashboard/65ddfe1a802f34faa8ea1fb6');
    };

    return (
        <div className="home-container">
            <h1>From teachers to teachers</h1>
            <div className="home-image" style={{backgroundImage: "url('./public/blackboard.png')"}}>
                <div>
                    <p>
                    Ultimate Classroom Manager is a tool for teachers who want to keep track of student behavior in class. 
                    The main idea is that teachers can create their groups based on a subject and a class. 
                    Then they should select a particular student to add a warning and a comment. 
                    When the student has three warnings, the app will display a message to contact the student's parents.
                    </p>
                </div>
            </div> <br />
            <button onClick={goToDashboard}>Go to Dashboard</button>
        </div>
    );
};

export default HomePage;