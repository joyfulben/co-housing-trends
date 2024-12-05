import React, { useMemo, useCallback, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip, Legend, LineElement, PointElement, Filler } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, Tooltip, Legend, LineElement, PointElement, Filler);

function SideChart({ stateWages }) {

    useEffect(()=>{
       
    console.log({"data received for state": stateWages});
    },[stateWages])
    // const sampleData = useMemo(() => ({
    //     labels: data.states,
    //     datasets: [
    //         {
    //             label: 'Average state wage',
    //             data: specificOcc.wages,
    //             backgroundColor: (context)=>{
    //                 const chart = context.chart;
    //                 const {ctx, chartArea } = chart;
    //                 if(!chartArea){
    //                     return null
    //                 } else {
    //                     return getGradient(chart);
    //                 }
    //             },
    //             borderColor: ['silver'],
    //             borderWidth: 1,
                // tooltip: {
                //     callbacks: {
                //         label: function (context) {
                //             let label = context.dataset.label || '';
                //             if (label) label += ': ';
                //             if (context.parsed.y !== null) {
                //                 label += '$'+context.formattedValue;
                //             }
                //             return label;
                //         },
                //     },
                // },
    //         },
    //     ],
    // }), [data]);
    const sampleData = {
        labels: stateWages.years,
        datasets: [
            {
                label: "Average wage",
                data: stateWages.wages,
                borderColor: ['green','yellow'],
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
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';
                            if (label) label += ': ';
                            if (context.parsed.y !== null) {
                                label += '$'+context.formattedValue;
                            }
                            return label;
                        },
                    },
                },
            },
        ],
    }
    const options = useMemo(() => ({
        responsive: true
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
            <div id="graph-container">
                <Line options={options} data={sampleData} />
            </div>
        </div>
    );
}

export default React.memo(SideChart);
