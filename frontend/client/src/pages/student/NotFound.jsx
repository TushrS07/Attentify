import React from "react";
import svg from "../../../public/404.svg";
import '../../App.css'
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="cont-404">
                <img src={svg} alt="svg" />
                <button onClick={() => navigate('/student')}>Back to Home</button>
            </div>
        </>
    );
};

export default NotFound;