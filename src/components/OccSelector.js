import React, { useEffect } from "react";
import { useState } from 'react';
import ChartDisplay from './ChartDisplay';
import USMap from './USMap';
import OccupationDropdown from './MUI/OccupationDropdown';
import FilterDropdown from './MUI/FilterDropdown';

export const OccSelector = () =>{

    const [occId, setOccId] = useState(0);
    const [occTitle, setOccTitle] = useState("");
    const [specificOcc, setSpecificOcc] = useState([]);
    const [filter, setFilter] = useState('alpha');
    const [occList, setOccList] = useState([]);

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
    },[occId,filter])
    return (
        <div>
            <OccupationDropdown occList={occList} setOccId={setOccId} occTitle={occTitle} setOccTitle={setOccTitle}/>
            <h2>{occTitle}</h2>
            <div className="filter-btn-container">
                <FilterDropdown filter={filter} setFilter={setFilter} />
            </div>
            <ChartDisplay specificOcc={specificOcc} />
            <USMap wages={specificOcc}/>
        </div>
    )
}