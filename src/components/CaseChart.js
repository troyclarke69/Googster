import React from 'react'
import { Bar, Line, defaults } from 'react-chartjs-2'

defaults.global.tooltips.enabled = true;
defaults.global.legend.position = 'top';

const CaseChart = ({ title, labels, caseData, lastXCases, lastXCasesSmoothed, lastXAves, lastXVacs }) => {

    return (
        <div>
            <p></p>
            <Line
                data={{
                        labels: labels,
                        datasets:[
                        {
                            label: title,
                            data: lastXCases,
                            hidden: true,
                            backgroundColor: [
                                'rgba(40, 80, 140, .5)',
                            ],  
                            fill: false,
                            borderColor: [
                                'rgba(0, 150, 50, 1)',
                            ],                          
                        },
                        {
                            label: '7-Day Avg',
                            data: lastXAves, 
                            backgroundColor: [
                                'rgba(255, 0, 0, .5)',
                            ],
                            fill: false,
                            borderColor: [
                                'rgba(255, 0, 0, 1)',
                            ],                               
                        },
                        {
                            label: "Daily Cases/Million",
                            data: lastXCasesSmoothed,
                            hidden: true,
                            backgroundColor: [
                                'rgba(200, 200, 0, .7)',
                            ],  
                            fill: false,
                            borderColor: [
                                'rgba(200, 200, 0, 1)',
                            ],                          
                        },
                        {
                            label: 'Daily Vaccinations/Million',
                            data: lastXVacs, 
                            backgroundColor: [
                                'rgba(0, 0, 255, 1)',
                            ],
                            fill: false,
                            borderColor: [
                                'rgba(0, 0, 255, 1)',
                            ],                               
                        }                         
                    ],
                }}
                height={200}
                width={300}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: false,
                                }
                            }
                        ]
                    }, 
                    legend: {
                        labels: {
                            fontSize: 12,                          
                        }
                    }
                }}
            />

        </div>
    )
}

export default CaseChart;