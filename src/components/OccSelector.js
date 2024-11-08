import React, { useEffect } from "react";
import { useState } from 'react';
import { ChartDisplay } from './ChartDisplay';
import OccupationDropdown from './MUI/OccupationDropdown';
let ref = require('../api/ref.json');

export const OccSelector = () =>{

    const [occId, setOccId] = useState(0);
    useEffect(()=>{
        console.log("selector state of occId: ", occId);
    })
    ref.occupations.sort(function(a, b) {
        var textA = a.title.toUpperCase();
        var textB = b.title.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    
    const handleOccupationSelect = (e) => {
        const valNum=Number(e.target.value);
        console.log("Value for the occupation: ", valNum);

        setOccId(valNum);
    }
    return (
        <div>
            <OccupationDropdown setOccId={setOccId} occRef={ref}/>
            <ChartDisplay occId={occId} />
        </div>
    )
}