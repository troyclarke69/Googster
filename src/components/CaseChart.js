import React from 'react'
import { Bar, Line, defaults } from 'react-chartjs-2'

defaults.global.tooltips.enabled = true;
defaults.global.legend.position = 'top';

const CaseChart = ({ title, labels, data }) => {

    return (
        <div>
            <p></p>
            <h4>{title}</h4>
            {/* <small className='small-text'>Click on the chart labels to show/hide the corresponding data.</small> */}

            <Bar
                data={{
                        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                        labels: labels,
                        datasets:[
                        {
                            label: '',
                            data: data,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 2,
                        },
                    ],
                }}
                height={400}
                width={600}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                }
                            }
                        ]
                    }, 
                    legend: {
                        labels: {
                            fontSize: 16,
                        }
                    }
                }}
            />
        </div>
    )
}

export default CaseChart;