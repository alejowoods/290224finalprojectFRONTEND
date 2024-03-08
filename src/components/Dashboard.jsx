import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <>
            <div>
                <p>Subjects Overview</p>
            </div>
            <div>
                <p>Choose your subject or create one</p>
            </div>
            <div>
                <Link to="/add-subject">Create your own group</Link>
            </div> <br />
            <div>
                <Link to="/add-subject">delete subject</Link>
            </div>
        </>
    );
};

export default Dashboard;