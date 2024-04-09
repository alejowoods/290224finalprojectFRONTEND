import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/dashboard.css"


const Dashboard = () => {
    const navigate = useNavigate();

const [teacher, setTeacher] = useState(null);
const [subjects, setSubjects] = useState([]);
const [message, setMessage] = useState(null);


const { id: teacherID} = useParams();

useEffect(() => {

    const fetchTeacher = async () => {
        try {
            const response = await fetch(`http://localhost:8000/teachers/info/${teacherID}`);
            const data = await response.json();
            console.log("🚀 WILSOOOOOOOOOOOOOOOOOOOON!:", data)
            setTeacher(data.teacher);
        } catch (error) {
            console.error('WE LOST HIM, DOCTOR! TEACHERS Error:', error);                
        }
    };    
    

    const fetchSubjects = async () => {
        try {
            const response = await fetch(`http://localhost:8000/subjects/get-subjects/${teacherID}`);
            const data = await response.json();
            setSubjects(data.subjects);            
        } catch (error) {
            console.error('wilsoooooooooooooooooon! SUBJECTS Error:', error);            
        }
    };


    fetchTeacher();	
    fetchSubjects();

}, [teacherID]);

const deleteSubject = async (subjectID) => {

    const subjectToDelete = subjects.find(subject => subject._id === subjectID);
    const userConfirmed = window.confirm(`Are you sure you want to delete subject ${subjectToDelete.subject_name}? This action cannot be undone!`);

    if (userConfirmed) {
        setMessage(`Deleting subject: ${subjectToDelete.subject_name}...`);

        try {
            const response = await fetch(`http://localhost:8000/subjects/delete/${subjectID}`, {
                method: 'DELETE'
            });

            const data = await response.json();
            if (data.message === 'Subject deleted') {
                setSubjects(subjects.filter(subject => subject._id !== subjectID));
                setMessage(`Subject ${subjectToDelete.subject_name} deleted successfully`);
            }



        } catch (error) {
            console.error(`Error deleting subject ${subjectToDelete.subject_name}:`, error);
            setMessage('Error deleting subject');
        }
    }
};

useEffect(() => {
    let timer;
    if (message) {
        timer = setTimeout(() => {
            setMessage(null);
        }, 10000); 
    }

    return () => clearTimeout(timer); 
}, [message]);

    return (
        <div className="main-container">
            <div>
                <h2>Welcome teacher {teacher ? teacher.name : "loading..."}</h2>
            </div>
            <div>
                <h2>Choose your subject or create one</h2>
            </div>
            <div>
                {message && <h4 className="successful-request">{message}</h4>}
            </div>
            <div>
                {subjects.map(subject => (
                    <div className="student-container" key={subject._id}>
                        <div className="student-name" >
                            <div>{subject.subject_name}</div>
                        </div>
                        <div className="button-container">
                            <button className="to-manager" onClick={() => navigate(`/manager/${subject._id}`)}>To manager</button>
                            <button className="remove-button" onClick={() => deleteSubject(subject._id)}>-</button>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <h2>You did not find your subject? Then... </h2>
                <button onClick={() => navigate("/add-subject")}>Create subject</button>
            </div>
        </div>
    );
};

export default Dashboard;