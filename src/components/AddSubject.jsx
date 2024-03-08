import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const AddSubject = () => {

    const [subject, setSubject] = useState("");
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedStudents, setSelectedStudents] = useState([]);

    const classes = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"];
    const students = ["Student 1", "Student 2", "Student 3", "Student 4", "Student 5"];
    
    return (
    <>
        <div>
            <h2>Add your subject</h2>
            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Add subject" /> 
            <br /> 
            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
            
                {classes.map((c, index) => (
                    <option key={index} value={c}>{c}</option>
                ))}
            </select>
            <br />
            <select multiple value={selectedStudents} onChange={(e) => setSelectedStudents([...e.target.options]
                .filter(o => o.selected)
                .map(o => o.value))}>

                {students.map((s, index) => (
                    <option key={index} value={s}>{s}</option>

                ))}
            </select>
        </div>

        <div>
            <button>Add Subject</button> <br />
            <Link to="/"> Back to Dashboard </Link>
        </div>
    </>
    );
};

export default AddSubject;