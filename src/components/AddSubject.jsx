import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import '../css/addSubject.css';

const AddSubject = () => {

    const [subject, setSubject] = useState("");
    const [classList, setClassList] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");
    const [studentsForSubject, setStudentsForSubject] = useState([]);
    const [unaddedStudents, setUnaddedStudents] = useState([]);
    const [teacherID, setTeacherID] = useState('65ddfe1a802f34faa8ea1fb6'); 


    const handleAddSubject = async () => {
        const studentIds = studentsForSubject.map(student => student._id);
        const newSubjectData = { 
            subject_name: subject,  
            teacher_id: teacherID, 
            class_id: selectedClass, 
            student_ids: studentIds
        };
        
        try {
            const response = await fetch('http://localhost:8000/subjects/add', {
                method: 'POST',
                headers:{
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newSubjectData)
            });
            const data = await response.json();
            console.log('ARE YOU ALIVE; MATE?', data);
        } catch (error) {
            console.error('WE LOST HIM, DOCTOR! Error:', error);            
        }
        
    };
    useEffect(() => {

        try {
            const fetchClasses = async () => {
                const response = await fetch(`http://localhost:8000/classes/all`);
                const data = await response.json();
                console.log("🚀 DO WE HAVE CLASS TODAY", data)
                setClassList(data.classes);
            };
            fetchClasses();
        } catch (error) {
            console.error("🚀 WILSOOOOOOOOOOOON!:", error)
        }
    }, []);

    useEffect(() => {

        if(selectedClass.length){
            const fetchStudents = async () => {
                const response = await fetch(`http://localhost:8000/classes/students/${selectedClass}`);
                const data = await response.json();
                setUnaddedStudents(data.students.students);
                setStudentsForSubject([]);
            };
            fetchStudents();
        };

    }, [selectedClass]);  

    const addStudent = (student) => {
        setStudentsForSubject([...studentsForSubject, student]);
        setUnaddedStudents(unaddedStudents.filter((unaddedStudent) => unaddedStudent._id !== student._id)); 
    };

    const removeStudent = (student) => {
        setUnaddedStudents([...unaddedStudents, student])
        setStudentsForSubject(studentsForSubject.filter((addedStudent) => addedStudent._id !== student._id))
    }
    
    return (
    <>
        <div>
            <h2>Add your subject</h2>
            <div>    
                <input type="text" 
                        value={subject} 
                        onChange={(e) => setSubject(e.target.value)} 
                        placeholder="Add subject"
                        className="subject-input" 
                /> 
            </div> 
            <br />
            <select
                className="class-dropdown" 
                value={selectedClass} 
                onChange={(e) => setSelectedClass(e.target.value)}
            >
                <option>Select a class</option>

                {classList.map((classItem, index) => ( 
                    <option key={index} value={classItem._id}>
                        {classItem.class_name}
                    </option>
                ))}

            </select>
            <div>
                {unaddedStudents.map((student) => (
                    <div key={student._id} className="student-container">
                        <div className="student-name">{student.name}</div>
                        <button className="add-button" onClick={() => addStudent(student)} >+</button>
                    </div>
                ))}
            </div> <br />
        </div>

        <div>
            <button onClick={handleAddSubject}>Add Subject</button> 
        </div> <br />
        <div>

        {studentsForSubject.map((student) => (
            <div key={student._id} className="student-container">
                <div className="student-name" >{student.name}</div> 
                <button className="remove-button" onClick={() => removeStudent(student)}>-</button>
            </div>
        ))}
        </div>

        <div>
            <Link to="/"> <button>Back to Dashboard</button> </Link>
        </div>
    </>
    );
};

export default AddSubject;