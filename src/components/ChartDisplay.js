import React from "react";
import { useEffect } from "react";
import api from '../api/get'
import { useState } from 'react';


export const ChartDisplay = (props) => {

    const [occData, setOccData]=useState(0)
    const [chartOccId, setChartOccId]=useState(0);
    const getJobData = async () => {
        try {
          const response = await api.get(`data?drilldowns=Year,State&measures=Average Wage,Average Wage Appx MOE&Record Count>=5&Workforce Status=true&Detailed Occupation=${props.occId}`);
          if (response && response.data) console.log("Successful response: ", response.data);
          setOccData(response.data.data);
        } catch(err){
          if (err.response)console.log('🔴🔴🔴🔴🔴🔴🔴 ERROR ERROR ERROR: ',err.response);
          else console.log('Different error: ', err.message);
        }
      }

      console.log({"props occId ":props.occId,"chart occId":chartOccId});
      if (props.occId == chartOccId){
        console.log("The occIds are equal");
      }else{
        console.log('I am trying to get the job data now');
        getJobData();
        setChartOccId(props.occId);
      }
    useEffect(() => {
        console.log("Chart Display props: ",props);
  }, [])
  return(
    <div>
        <ol>
            {occData && occData[0]["Average Wage"]?<li>${(occData[6]["Average Wage"]).toFixed(2)} Annually</li>:<li>"No wages yet"</li> }
        </ol>
    </div>
  )

}