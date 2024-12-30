import React, { useEffect } from "react";
import { useState } from 'react';
import ChartDisplay from './ChartDisplay';
import USMap from './USMap';
import SideChart from './SideChart';
import OccupationDropdown from './MUI/OccupationDropdown';
import FilterDropdown from './MUI/FilterDropdown';

export const OccSelector = () =>{

    const [occId, setOccId] = useState(151211);
    const [occTitle, setOccTitle] = useState("Computer systems analysts");
    const [specificOcc, setSpecificOcc] = useState([]);
    const [filter, setFilter] = useState('alpha');
    const [occList, setOccList] = useState([]);
    const [displayChart, setDisplayChart] = useState(false);
    const [selectedState, setSelectedState] = useState('');
    const [stateWages, setStateWages] = useState({});
    const baseAPI = "https://occ-server.vercel.app"

    useEffect(() => {
        fetch(`${baseAPI}/fetch-occupations`)
            .then(response => response.json())
            .then(data => {
                if (JSON.stringify(data) !== JSON.stringify(occList)) {
                    setOccList(data);
                }
            })
            .catch(error => console.error("Error fetching occupations:", error));
    }, []);
    // When occId or filter changes, fetch specific data and update occTitles and occWages
    useEffect(()=> {
        fetch(`${baseAPI}/occupations?id=${occId}&sort=${filter}`)
        .then(response => response.json())
        .then(data => {
            if (JSON.stringify(data) !== JSON.stringify(occList)) {
                setSpecificOcc(data);
            } 
        }
    )
        .catch(error => console.error("Error fetching occupations:", error));
    },[occId,filter]);

    function displaySideChart(e,state) {
        //If a previous state was selected, remove its selected class
        if (selectedState.length){
            const previousState = document.querySelector(`[title="${selectedState}"]`);
            previousState.classList.remove("selected");
        };
        setSelectedState(state); // This will still update the state for other parts of the app.
        e.target.classList.add("selected"); //Dynamically update the selected state's class to selected
        // Use the `state` parameter directly
        fetch(`${baseAPI}/occupations?id=${occId}&all_years=true&state=${state}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setStateWages(data);
                }
            })
            .catch(error => console.error("Error fetching state data:", error));
    }
    
    return (
        <div>
            <OccupationDropdown occList={occList} setOccId={setOccId} occTitle={occTitle} setOccTitle={setOccTitle}/>
            {(specificOcc.states && specificOcc.states.length)?<h2 style={{color: "black"}}>{occTitle}</h2>:<div style={{display:"flex",flexDirection:"column"}}><h2 style={{color: "red"}}>{occTitle}</h2><h3 style={{color:"red"}}>Please choose another occupation</h3></div>}
            
            <div className="filter-btn-container">
                <FilterDropdown filter={filter} setFilter={setFilter} />
            </div>
            <ChartDisplay specificOcc={specificOcc} filter={filter} />
            <div className="map-container">
            <USMap wages={specificOcc} displaySideChart={displaySideChart}/>
            <SideChart selectedState={selectedState} stateWages={stateWages} occTitle={occTitle}></SideChart>
            </div>
        </div>
    )
}
