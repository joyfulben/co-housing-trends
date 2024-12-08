import React, { useEffect } from "react";
import { useState } from 'react';
import ChartDisplay from './ChartDisplay';
import USMap from './USMap';
import SideChart from './SideChart';
import OccupationDropdown from './MUI/OccupationDropdown';
import FilterDropdown from './MUI/FilterDropdown';

export const OccSelector = () =>{

    const [occId, setOccId] = useState(0);
    const [occTitle, setOccTitle] = useState("");
    const [specificOcc, setSpecificOcc] = useState([]);
    const [filter, setFilter] = useState('alpha');
    const [occList, setOccList] = useState([]);
    const [displayChart, setDisplayChart] = useState(false);
    const [selectedState, setSelectedState] = useState('');
    const [stateWages, setStateWages] = useState({});

    useEffect(() => {
        fetch('http://localhost:4322/fetch-occupations')
            .then(response => response.json())
            .then(data => {
                if (JSON.stringify(data) !== JSON.stringify(occList)) {
                    setOccList(data);
                }
            })
            .catch(error => console.error("Error fetching occupations:", error));
    }, []);
    // When occId changes, fetch specific data and update occTitles and occWages
    useEffect(()=> {
        fetch(`http://localhost:4322/occupations?id=${occId}&sort=${filter}`)
        .then(response => response.json())
        .then(data => {
            if (JSON.stringify(data) !== JSON.stringify(occList)) {
                setSpecificOcc(data);
            }
        }
    )
        .catch(error => console.error("Error fetching occupations:", error));
    },[occId,filter]);

    function displaySideChart (state) {
        setSelectedState(state);
        if (!displayChart) {
            setDisplayChart(true);
        }
        fetch(`http://localhost:4322/occupations?id=${occId}&all_years=true&state=${selectedState}`)
        .then(response => response.json())
        .then(data => {
            if (data) {
                setStateWages(data);
            }
        }
    )
    .catch(error => console.error("Error fetching state data:", error));
        
    }
    return (
        <div>
            <OccupationDropdown occList={occList} setOccId={setOccId} occTitle={occTitle} setOccTitle={setOccTitle}/>
            {(specificOcc.states && specificOcc.states.length)?<h2 style={{color: "black"}}>{occTitle}</h2>:<div style={{display:"flex",flexDirection:"column"}}><h2 style={{color: "red"}}>{occTitle}</h2><h3 style={{color:"red"}}>Please choose another occupation</h3></div>}
            
            <div className="filter-btn-container">
                <FilterDropdown filter={filter} setFilter={setFilter} />
            </div>
            <ChartDisplay specificOcc={specificOcc} />
            <div className="map-container">
            <USMap wages={specificOcc} displaySideChart={displaySideChart}/>
            <SideChart stateWages={stateWages}></SideChart>
            </div>
        </div>
    )
}