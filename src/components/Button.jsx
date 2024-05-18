import React from "react";

const Button = ({ children, onClick, type }) => {
    return (
        <button
            type={type}
            className="px-3 py-1 border border-darkBlue rounded m-1 "
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
