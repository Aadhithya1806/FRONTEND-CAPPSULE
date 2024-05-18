import React from "react";
import { useState } from "react";
// import SearchIcon from "@mui/icons-material/Search";
const SearchBox = ({ handleFilter, onClick, isSearching }) => {
    const [searchValue, setSearchValue] = useState("");

    return (
        <div className="search-box w-3/5 mx-auto my-2 flex border rounded-full ">
            <input
                onChange={(e) => setSearchValue(e.target.value)}
                type="text"
                className="w-full text-darkBlue font-semibold px-4 py-3 border-none outline-none rounded-l-full"
                placeholder="Type Your Medicine Name Here..."
            />
            <p
                onClick={() => onClick(searchValue)}
                className="search text-center font-bold"
            >
                Search
            </p>
        </div>
    );
};

export default SearchBox;
