import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const AddSubject = () => {

    const [subject, setSubject] = useState("");
    const [classList, setClassList] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedStudents, setSelectedStudents] = useState([]);

    useEffect(() => {

        const fetchClasses = async () => {
            const response = await fetch(`http://localhost:8000/classes/all`);
            const data = await response.json();
            console.log("🚀 WILSOOOOOOOOOON:where are the classes?", data)
            setClassList(data.classes);
            
        };

        fetchClasses();

    }, []);

    useEffect(() => {

        if(selectedClass.length){
            
        };

    }, [selectedClass]);

    const students = ["Student 1", "Student 2", "Student 3", "Student 4", "Student 5"];
    
    return (
    <>
        <div>
            <h2>Add your subject</h2>
            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Add subject" /> 
            <br /> 
            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                <option>Select a class</option>
                {classList.map((classItem, index) => (
                    <option key={index} value={classItem._id}>
                        {classItem.class_name}
                    </option>
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
        </div> <br />

        <div>
            <a><button>Add Subject</button></a> 
        </div><br />
        <div>
            <Link to="/"> <button>Back to Dashboard</button> </Link>
        </div>
    </>
    );
};

export default AddSubject;