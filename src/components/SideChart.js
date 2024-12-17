import React, { useMemo, useCallback, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip, Legend, LineElement, PointElement, Filler } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, Tooltip, Legend, LineElement, PointElement, Filler);

function SideChart({ stateWages, selectedState, occTitle }) {

    useEffect(()=>{
    },[stateWages, selectedState])
   
    const sampleData = {
        labels: stateWages.years,
        datasets: [
            {
                label: `Average wage for ${occTitle} in ${selectedState}`,
                data: stateWages.wages,
                borderColor: ['green'],
                backgroundColor: ['#e4fae6'],
                fill: {
                    target: 'origin',
                    above: function(context){
                        const chart = context.chart;
                        const {ctx, chartArea } = chart;
                        if(!chartArea){
                            return null
                        } else {
                            return getGradient(chart);
                        }
                    },
                    below: ''
                },
                tooltip: {
                    titleAlign: 'center',
                    callbacks: {
                        label: function (context) {
                            if (context.parsed.y !== null) {
                                return '$'+context.formattedValue;
                            }
                        },
                    },
                },
            },
        ],
    }
    const options = useMemo(() => ({
        pointRadius: 5,
        pointHitRadius: 5,
        responsive: true,
        scales: {
            y: {
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, ticks) {
                        return '$' + value;
                    }
                }
            }
        }
    }), []);
    function getGradient(chart){
        const {ctx, chartArea: {top, bottom, left, right}} = chart;
        const gradientSegment = ctx.createLinearGradient(0,top,0,bottom);
        gradientSegment.addColorStop(0,'rgba(182, 255, 193, 0.7)');
        gradientSegment.addColorStop(0.5,'rgb(0, 250, 62, 0.7)');
        gradientSegment.addColorStop(1,'rgba(0, 135, 33, 0.7)');
        return gradientSegment;
    }
    return (
        <div>
            <div id="side-chart-container">
                <Line options={options} data={sampleData} />
            </div>
        </div>
    );
}

export default React.memo(SideChart);
