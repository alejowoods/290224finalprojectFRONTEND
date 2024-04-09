import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Manager = () => {
    const Navigate = useNavigate();
    
    const { id } = useParams();
    const [subject, setSubject] = useState(null); 
    const [newWarningComment, setNewWarningComment] = useState('');
    const [selectedStudent, setSelectedStudent] = useState('');   
    const [warnings, setWarnings] = useState([]);   
    const [deletingWarningId, setDeletingWarningId] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');


    useEffect(() => {

        const fetchStudentList = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/subjects/get-students/${id}`);
                setSubject(response.data.subject);
            } catch (error) {
                console.error("🚀 WILSOOOOOOOOOOOON!:", error);
            }
        };

        fetchStudentList();

    }, [id]);

    useEffect(() => {
        const fetchStudentList = async () => { 
            if (selectedStudent.length) {
            try {
                const response = await axios.get(`http://localhost:8000/warnings/get-warning/${selectedStudent}`);
                setWarnings(response.data.warnings);
                console.log(response.data.warnings);
            } catch (error) {
                console.error("🚀 WILSOOOOOOOOOOOON!:", error);
            }
        }
    };

        fetchStudentList();

    }, [selectedStudent]);

    console.log(warnings);

    const addWarning = async () => {
        try {
            const response = await axios.post('http://localhost:8000/warnings/add', {
                student_id: selectedStudent,
                teacher_id: '65ddfe1a802f34faa8ea1fb6',
                subject_id: subject._id,
                warning_comments: newWarningComment
            })
            setNewWarningComment('');
            setSuccessMessage('Warning added successfully');
            setTimeout(() => setSuccessMessage(''), 3000);
            const response2 = await axios.get(`http://localhost:8000/warnings/get-warning/${selectedStudent}`);
            setWarnings(response2.data.warnings);
            console.log(response2.data); 
        } catch (error) {
            console.error("Error", error);
        }
    };

    if(!subject) {
        return <div>Loading...</div>
    };

    const deleteWarning = async (warningId) => {
        try {
            const response = await axios.delete(`http://localhost:8000/warnings/delete/${warningId}`);
            console.log(response);
            const updatedWarnings = warnings.filter(warning => warning._id !== warningId); 
            setWarnings(updatedWarnings);
            setSuccessMessage('Warning deleted successfully');
            setNewWarningComment('');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error("Error", error);
        }
    };

    return (
        <div className="manager-container">
            <div>
                <button onClick={() => Navigate(-1)}>Back to Dashboard</button>
            </div>
            <div>Class Manager</div>
            <div>Subject: {subject.subject_name}</div>
            <h2>Students:</h2>
                <select className="dropdown" value={selectedStudent} onChange={event => setSelectedStudent(event.target.value)}>
                <option value="">Choose a student</option>
                    {subject.student_ids.map(student => (
                        <option key={student._id} value={student._id}>{student.name}</option>
                    ))}
                </select>

                {warnings.length >= 3 && warnings.length < 4 && (
                        <div className="contact-parents">Contact parents</div>
                    )}
                    {warnings.length >= 4 && (
                        <div className="parents-meeting">Parents meeting</div>
                    )}

                <div>
                    <div><input placeholder="Write warning comment" className="warning-input" type="text" value={newWarningComment} onChange={event => setNewWarningComment(event.target.value)}/>
                
                        <button onClick={addWarning}>Add Warning Comment</button>    
                    </div>

                </div>
            <div >
            { !selectedStudent ? null : warnings.length ? warnings.map(warning => (
                <div className="warning-container" key={warning._id} >
                    <div className="warning-comment">
                        <div>{warning.warning_comments}</div>
                    </div>
                    <div className="button-container-comment">
                            <button className="remove-button-comment" onClick={() => setDeletingWarningId(warning._id)}>-</button>
                        {deletingWarningId === warning._id ? (
                            <button className="confirm-button-comment" onClick={() => { deleteWarning(warning._id); setDeletingWarningId(null); }}>Confirmar</button>
                        ) : null}
                    </div>
                </div>

                )) : <div><h4 className="successful-request">No warnings</h4></div>}



                <div>
                    {successMessage && <div className="successful-request">{successMessage}</div>}
                </div>
            </div>
                
        </div>
    );

};

export default Manager;