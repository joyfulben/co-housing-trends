import React, { useMemo, useCallback, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip, Legend, BarElement } from "chart.js";
import FilterDropdown from './MUI/FilterDropdown';

ChartJS.register(CategoryScale, LinearScale, Tooltip, Legend, BarElement);

function ChartDisplay({ specificOcc, setFilter, filter }) {

    useEffect(()=>{
        console.log("SHow me the specific occupation data please: ", specificOcc);
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
                backgroundColor: ['rgb(0, 219, 76)', 'rgb(0, 224, 81)', /* more colors */],
                borderColor: ['silver'],
                borderWidth: 1,
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';
                            if (label) label += ': ';
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }).format(context.parsed.y);
                            }
                            return label;
                        },
                    },
                },
            },
        ],
    }), []);

    const options = useMemo(() => ({
        responsive: true,
        indexAxis: 'y',
        scales: {
            x: { ticks: { callback: (value) => '$' + value } },
            y: { ticks: { autoSkip: false } },
        }
        // plugins: { tooltip: { backgroundColor: '#ff789a' } },
    }), []);

    // Memoize filter change handler
    const handleFilterChange = useCallback((newFilter) => setFilter(newFilter), []);

    return (
        <div>
            <div className="filter-btn-container">
                <FilterDropdown filter={filter} setFilter={handleFilterChange} />
            </div>
            <div id="graph-container">
                <Bar options={options} data={sampleData} />
            </div>
        </div>
    );
}

export default React.memo(ChartDisplay);
