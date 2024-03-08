import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


const Dashboard = () => {

const [teacher, setTeacher] = useState(null);
const { id: teacherID} = useParams();

useEffect(() => {

    const fetchTeacher = async () => {
        const response = await fetch(`http://localhost:8000/teachers/info/${teacherID}`);
        const data = await response.json();
        console.log("🚀 WILSOOOOOOOOOOOOOOOOOOOON!:", data)
        setTeacher(data.teacher);
    };

    fetchTeacher();	

}, []);

    return (
        <>
            <div>
                <p>Welcome teacher {teacher ? teacher.name : "loading..."}</p>
                {teacher && teacher.subject_ids.map(((subject, index) => (
                    <p key={index}>{subject}</p>
                )))}
            </div>
            <div>
                <p>Choose your subject or create one</p>
            </div>
            <div>
                <Link to="/add-subject"><button>Create your own group (HERE ANOTHER INEGRATION TO GET TEACHER'S CLASSES)</button></Link>
            </div> <br />
            <div>
                <button className="button-delete">delete subject HERE ANOTHER INTEGRATION TO DELETE A CLASS</button>
            </div>
        </>
    );
};

export default Dashboard;