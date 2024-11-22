import React, { useMemo, useCallback, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip, Legend, BarElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, Tooltip, Legend, BarElement);

function ChartDisplay({ specificOcc }) {
    useEffect(()=>{
    },[specificOcc])
    // Memoize chart data and options
    const sampleData = useMemo(() => ({
        labels: specificOcc.states,
        datasets: [
            {
                label: 'Average state wage',
                data: specificOcc.wages,
                showLine: false,
                fill: false,
                backgroundColor: ['blue', 'green', /* more colors */],
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
    }), [specificOcc]);

    const options = useMemo(() => ({
        responsive: true,
        indexAxis: 'y',
        scales: {
            x: { ticks: { callback: (value) => '$' + value } },
            y: { ticks: { autoSkip: false } },
        }
        // plugins: { tooltip: { backgroundColor: '#ff789a' } },
    }), []);

    return (
        <div>
            <div id="graph-container">
                <Bar options={options} data={sampleData} />
            </div>
        </div>
    );
}

export default React.memo(ChartDisplay);
