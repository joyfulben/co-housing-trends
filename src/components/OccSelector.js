import React, { useEffect, useState } from "react";
import ChartDisplay from "./ChartDisplay";
import USMap from "./USMap";
import SideChart from "./SideChart";
import OccupationDropdown from "./MUI/OccupationDropdown";
import FilterDropdown from "./MUI/FilterDropdown";

export const OccSelector = () => {
    const [occTitle, setOccTitle] = useState("Computer systems analysts");
    const [occId, setOccId] = useState(151211);
    const [selectedState, setSelectedState] = useState("Nevada");
    const [specificOcc, setSpecificOcc] = useState([]);
    const [filter, setFilter] = useState("alpha");
    const [occList, setOccList] = useState([]);
    const [stateWages, setStateWages] = useState({});
    const baseAPI = "https://occ-server.vercel.app";

    // Fetch occupation list once when the component mounts
    useEffect(() => {
        fetch(`${baseAPI}/fetch-occupations`)
            .then((response) => response.json())
            .then((data) => {
                if (JSON.stringify(data) !== JSON.stringify(occList)) {
                    setOccList(data);
                }
            })
            .catch((error) => console.error("Error fetching occupations:", error));
    }, []);

    // Fetch specific occupation data when occId or filter changes
    useEffect(() => {
        fetch(`${baseAPI}/occupations?id=${occId}&sort=${filter}`)
            .then((response) => response.json())
            .then((data) => {
                if (JSON.stringify(data) !== JSON.stringify(specificOcc)) {
                    setSpecificOcc(data);
                }
            })
            .catch((error) => console.error("Error fetching occupations:", error));
    }, [occId, filter]);

    // Function to handle state selection and update charts
    function displaySideChart(state) {
        console.log({
            "Selected state (previous)": selectedState,
            "State being passed in": state,
        });

        // Remove the "selected" class from the previously selected state
        if (selectedState) {
            const previousStateElements = document.querySelectorAll(
                `[title="${selectedState}"]`
            );
            previousStateElements.forEach((el) => {
                el.classList.remove("selected");
            });
        }

        // Update the selected state for the app
        setSelectedState(state);

        // Add the "selected" class to the new state
        const currentStateElements = document.querySelectorAll(
            `[title="${state}"]`
        );
        currentStateElements.forEach((el) => {
            el.classList.add("selected");
        });

        // Fetch multi-year data for the selected state
        fetch(`${baseAPI}/occupations?id=${occId}&all_years=true&state=${state}`)
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    setStateWages(data);
                }
            })
            .catch((error) =>
                console.error("Error fetching state-specific data:", error)
            );
    }

    return (
        <div>
            <OccupationDropdown
                occList={occList}
                setOccId={setOccId}
                occTitle={occTitle}
                setOccTitle={setOccTitle}
            />
            {specificOcc.states && specificOcc.states.length ? (
                <h2 style={{ color: "black" }}>{occTitle}</h2>
            ) : (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <h2 style={{ color: "red" }}>{occTitle}</h2>
                    <h3 style={{ color: "red" }}>
                        Please choose another occupation
                    </h3>
                </div>
            )}

            <div className="filter-btn-container">
                <FilterDropdown filter={filter} setFilter={setFilter} />
            </div>
            <ChartDisplay specificOcc={specificOcc} filter={filter} />
            <div className="map-container">
                <USMap wages={specificOcc} displaySideChart={displaySideChart} />
                <SideChart
                    selectedState={selectedState}
                    stateWages={stateWages}
                    occTitle={occTitle}
                />
            </div>
        </div>
    );
};
