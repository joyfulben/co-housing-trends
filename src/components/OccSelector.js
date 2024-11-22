import React, { useEffect } from "react";
import { useState } from 'react';
import ChartDisplay from './ChartDisplay';
import OccupationDropdown from './MUI/OccupationDropdown';

export const OccSelector = () =>{

    const [occId, setOccId] = useState(0);
    const [occTitle, setOccTitle] = useState("");
    const [occTitles, setOccTitles] = useState([]);
    const [wages, setWages] = useState([]);
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
    useEffect(()=> {
        fetch(`http://localhost:4322/occupations?id=${occId}&sort=alpha`)
        .then(response => response.json())
        .then(data => {
            if (JSON.stringify(data) !== JSON.stringify(occList)) {
                console.log("data coming from specific occupation fetch: ", data);
            }
        }
    )
        .catch(error => console.error("Error fetching occupations:", error));
    },[occId])
    return (
        <div>
            <OccupationDropdown occList={occList} setOccId={setOccId} occTitle={occTitle} setOccTitle={setOccTitle}/>
            <ChartDisplay occId={occId} occTitles={occTitles} wages={wages} />
        </div>
    )
}