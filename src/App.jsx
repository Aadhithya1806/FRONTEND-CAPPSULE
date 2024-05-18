import Card from "./components/Card";
import DisplayInfoCard from "./components/DisplayInfoCard";
import { useState, useEffect } from "react";
import SearchBox from "./components/SearchBox";
function App() {
    const [searchValue, setSearchValue] = useState("");
    const [saltSuggestions, setSaltSuggestions] = useState([]);
    const [filterData, setFilterData] = useState([]);
    useEffect(() => {
        fetch(
            "https://backend.cappsule.co.in/api/v1/new_search?q=paracetamol&pharmacyIds=1,2,3"
        )
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                // console.log(data);
                setSaltSuggestions(data.data.saltSuggestions);
            });
    }, []);

    const handleFilter = (value) => {
        const res = saltSuggestions.filter((item) =>
            item.salt.split("+")[0].toLowerCase().includes(value)
        );

        setFilterData(res);
        setSearchValue(value);
        if (value === "") {
            setFilterData([]);
        }
    };
    console.log(searchValue, "SEARXH");
    console.log("ACTUAL ", saltSuggestions);
    console.log("FILTERED", filterData);
    // console.log(medicineSuggestions);
    return (
        <div className="bg-white">
            <SearchBox onClick={handleFilter}></SearchBox>
            <hr />

            {filterData.length === 0 && searchValue === "" && (
                <p className="main-para">
                    "Find The Best Medicines With Discount"
                </p>
            )}

            {filterData.length === 0 && searchValue != "" ? (
                <p className="main-para">"No matches Found"</p>
            ) : (
                filterData.map((salt, index) => {
                    // console.log(salt);
                    return (
                        <DisplayInfoCard
                            key={index}
                            salt={salt}
                        ></DisplayInfoCard>
                    );
                })
            )}
        </div>
    );
}

export default App;
