import React, { useMemo, useCallback, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip, Legend, BarElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, Tooltip, Legend, BarElement);

function ChartDisplay({ specificOcc, filter }) {
    useEffect(()=>{
    },[specificOcc, filter])
    const sampleData = useMemo(() => ({
        labels: specificOcc.states,
        datasets: [
            {
                label: (specificOcc.states && specificOcc.states.length)?'Average state wages in 2022':'Wages not available for this occupation',
                data: specificOcc.wages,
                backgroundColor: (context)=>{
                    const chart = context.chart;
                    const {ctx, chartArea } = chart;
                    if(!chartArea){
                        return null
                    } else {
                        return getGradient(chart);
                    }
                },
                borderColor: ['silver'],
                borderWidth: 1,
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
    }), [specificOcc, filter]);

    const options = useMemo(() => ({
        responsive: true,
        indexAxis: 'y',
        scales: {
            x: { ticks: { callback: (value) => '$' + value } },
            y: { ticks: { autoSkip: false } },
        }
    }), []);
    function getGradient(chart){
        const {ctx, chartArea: {top, bottom, left, right}} = chart;
        const gradientSegment = ctx.createLinearGradient(left,0,right,0);
        gradientSegment.addColorStop(0,'#008721');
        gradientSegment.addColorStop(0.5,'#00fa3e');
        gradientSegment.addColorStop(1,'#b6ffc1');
        return gradientSegment;
    }
    return (
        <div>
            <div id="graph-container">
                <Bar options={options} data={sampleData} />
            </div>
        </div>
    );
}

export default React.memo(ChartDisplay);
