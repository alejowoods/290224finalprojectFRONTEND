import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/addSubject.css';

const AddSubject = () => {
    const Navigate = useNavigate();

    const [subject, setSubject] = useState("");
    const [classList, setClassList] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");
    const [studentsForSubject, setStudentsForSubject] = useState([]);
    const [unaddedStudents, setUnaddedStudents] = useState([]);
    const [teacherID, setTeacherID] = useState('65ddfe1a802f34faa8ea1fb6'); 
    const [messageConfirm, setMessageConfirm] = useState("");

    const [showMessage, setShowMessage] = useState(false);

    const handleAddSubject = async () => {

        if(!subject) {
            alert('Dear teacher, please add a subject');
            return;
        };

        const studentIds = studentsForSubject.map(student => student._id);
        const newSubjectData = { 
            subject_name: subject,  
            teacher_id: teacherID, 
            class_id: selectedClass, 
            student_ids: studentIds
        };
        

        try {

            const subjectList = await fetch(`http://localhost:8000/subjects/get-subjects/${teacherID}`);
            const subjectListData = await subjectList.json();
            console.log("🚀 ~ WHERE AM I AND WHAT AM Iß:", subjectListData)

            const subjectExists = subjectListData.subjects.some(subjectData => subjectData.subject_name === subject);
            if (subjectExists) {
                console.log('Teacher, this subject already exists. Try again!');
                return;
            }

            const response = await fetch('http://localhost:8000/subjects/add', {
                method: 'POST',
                headers:{
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newSubjectData)
            });

            const data = await response.json();
            console.log('ARE YOU ALIVE; MATE?', data);
            if (data.success) {
                setMessageConfirm(`Subject ${subject} created successfully. You can see it on the dashboard.`);
                setShowMessage(true);
            }

        } catch (error) {
            console.error('WE LOST HIM, DOCTOR! Error:', error);            
        }
        
    };

    useEffect(() => {
        if (showMessage) {
            setSubject("");
            setStudentsForSubject([]);
            setSelectedClass("");
        }
    }, [showMessage]);

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

                const newStudents = data.students.students; 
                const filteredStudents = newStudents.filter(newStudent => 
                    !studentsForSubject.some(existingStudent => existingStudent._id === newStudent._id));

                setUnaddedStudents(filteredStudents);	

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

    const handleClearList = () => {
        setStudentsForSubject([]);
        setUnaddedStudents([]);
        setClassList([]);
        setSubject("");
    };
    
    return (

    <div className="main-container">
        
        <div>
            <button onClick={() => Navigate(-1)}>Back to Dashboard</button>
        </div>
        {showMessage && <div>
            <h3>{messageConfirm}</h3>
        </div>}
        <div>
            <h2>Add your subject</h2>
        <div>
            <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Add subject"
            className="subject-input"
            /> 
        </div>
        <div>
            <h2>Select a class</h2>
            <select
                className="dropdown"
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
            
        </div>
        
        {unaddedStudents.length > 0 && (
        <div className="student-list-container">
    
        <h2>List of class</h2>
            {unaddedStudents.map((student) => (
            <div key={student._id} className="student-container">
                <div className="student-name">{student.name}</div>
                <button className="add-button" onClick={() => addStudent(student)}>
                +
                </button>
                </div>
                ))}
        
        </div>
        )}
        </div>
        {studentsForSubject.length > 0 && (
        <>
            <div>
                <h2>Your students for {subject} </h2>
            </div>
            <div className="student-list-container">
            {studentsForSubject.map((student) => (
                <div key={student._id} className="student-container">
                    <div className="student-name">{student.name}</div>
                    <button className="remove-button" onClick={() => removeStudent(student)}>
                        -
                    </button>
                </div>
            ))}
            </div>
            <div><button className="button-delete" onClick={handleClearList}>Reset form</button> </div> <br />
            <div><button onClick={handleAddSubject}>Create subject {subject}</button></div>
        </>
        )}
    </div>

    );    
}
export default AddSubject;