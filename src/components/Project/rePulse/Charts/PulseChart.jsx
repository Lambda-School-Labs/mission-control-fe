import React from 'react';
import { Bar } from 'react-chartjs-2';

const PulseChart = ({ data, color }) => {
    const options = {
        maintainAspectRatio: false,
        legend:{
            display: false,
            position: 'left'
        },
    }

    const pulseData = {
        labels: ['Issue Count', 'Closed Issues', 'Open Issues', 'Closed PRs', 'Open PRs', 'Merged PRs', 'PR Count'],
        datasets: [
            {
                label: 'Issue Count',
                backgroundColor: ['#17D7EA','#176EEA','#2A17EA', '#9317EA', '#EA17D7', '#EA176E', 'chartreuse'],
                borderColor: 'black',
                borderWidth: 1,
                hoverBackgroundColor: 'pink',
                hoverBorderColor: 'purple',
                data: [data.issueCount, data.closedIssues, data.openIssues, data.closedPRs, data.openPRs, data.mergedPRs, data.prCount]
            }
        ]
    };

    return (
        <div>
            <Bar options={options} data={pulseData} height={250} />
        </div>
    )
};

export default PulseChart;