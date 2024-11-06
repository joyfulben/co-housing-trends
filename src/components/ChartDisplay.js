import React from "react";
// import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineController, PointElement, Title, Tooltip, Legend, LineElement, plugins } from "chart.js";
import api from '../api/get'
import { useState } from 'react';

ChartJS.register(
    CategoryScale, LinearScale,LineElement, LineController, PointElement, Title, Tooltip, Legend
);
export const ChartDisplay = (props) => {
    const [wages, setWages] = useState({});
    const [labels, setLabels] = useState([]);
    const [chartData, setChartData] = useState({});
    const [occId, setOccId] = useState(1);
        const formatChartData = () => {
            const newLabels=[];
            const newWages=[];
            wages.map((state,index)=>{
                if(state['Year']=== '2022'){
                    newLabels.push(state['State']);
                    let roundWage = Math.round(state['Average Wage']);
                    newWages.push(roundWage);
                }
            });
            setChartData({labels:newLabels,wages:newWages});
            setLabels(newLabels);
        }
        const getJobData = async () => {
            try {
              const response = await api.get(`data?drilldowns=Year,State&measures=Average Wage,Average Wage Appx MOE&Record Count>=5&Workforce Status=true&Detailed Occupation=${props.occId}`);
              if (response && response.data) console.log("Successful response: ", response.data.data);
              setWages(response.data.data);
              formatChartData();
            } catch(err){
              if (err.response)console.log('🔴🔴🔴🔴🔴🔴🔴 ERROR ERROR ERROR: ',err.response);
              else console.log('Different error: ', err.message);
            }
        };
        if (props.occId === occId) {
            console.log("Occupation Id is the same as what is set currently");
        }else{
            getJobData();
            setOccId(props.occId);
        }
        console.log("What does the chart data look like right now? ", chartData);
        const sampleData = {
            labels: chartData.labels,
            datasets: [{
              label: 'Average state wage',
              data: chartData.wages,
              showLine:false,
              fill: false,
              scales: {
                y: {
                    ticks: {
                        callback: function(value, index, ticks) {
                            return '$' + value;
                        }
                    }
                }
              },
              backgroundColor: [
                'rgb(0, 219, 76)',
                'rgb(0, 224, 81)',
                'rgb(0, 229, 86)',
                'rgb(0, 234, 91)',
                'rgb(0, 239, 96)',
                'rgb(0, 244, 101)',
                'rgb(0, 249, 106)',
                'rgb(0, 254, 111)'
              ],
              borderColor: [
                'silver'
              ],
              borderWidth: 1,
              pointStyle: "rectRot",
              radius: 10,
              hoverRadius: 8,
                tooltip: 
                    {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';

                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            }],
          };
          const options = {
            responsive: true,
            plugins: {
                tooltip: {
                    backgroundColor: '#ff789a'
                }
            }
          }
  return(
        <div id="graph-container"><Line options={options} data={sampleData}></Line></div>
  )
 
}