import React from "react";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
    const navigate = useNavigate()
    return (
        <div className="w-full flex justify-center p-5">
            <img src="https://gamdom.com/build/gamdom_logo_white.df7a8711ee5d020ca0dd.svg" alt="gamdom logo" className="cursor-pointer" onClick={() => navigate("/homepage")}/>
        </div>
    );
};

export default Topbar;
