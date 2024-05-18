import React from "react";
import "./Card.css";
const Card = ({ children }) => {
    return (
        <div className="card-container flex align-middle bg-custom-gradient w-3/5 mx-auto my-5 border border-none rounded-md  ">
            {children}
        </div>
    );
};

export default Card;
