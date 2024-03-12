import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../css/dashboard.css"


const Dashboard = () => {

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

    return (
        <div className="main-container">
            <div>
                <h2>Welcome teacher {teacher ? teacher.name : "loading..."}</h2>
                
            </div>
            <div>
                <h2>Choose your subject or create one</h2>
            </div>
            <div>
                {message && <p>{message}</p>}
            </div>
            <div>
                {subjects.map(subject => (
                    <div className="student-container" key={subject._id}>
                        <div className="student-name" >
                            <div>{subject.subject_name}</div>
                        </div>
                        <button className="remove-button" onClick={() => deleteSubject(subject._id)}>-</button>
                    </div>
                ))}
            </div>
            <div>
                <h2>You did not find your subject? Then... </h2>
                <Link to="/add-subject"><button>Create subject</button></Link>
            </div> <br />
            <div>
                <button className="button-delete">delete subject (HERE ANOTHER INTEGRATION TO DELETE A CLASS)</button>
            </div>
        </div>
    );
};

export default Dashboard;