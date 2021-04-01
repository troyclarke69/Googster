import React from 'react'
import { Bar, Line, defaults } from 'react-chartjs-2'

defaults.global.tooltips.enabled = true;
defaults.global.legend.position = 'top';

const XChart = ({   title, labels, 
                    caseTitle, caseData, 
                    deathTitle, deathData, 
                    recoveredTitle, recoveredData }) => {

    // console.log(title);
    // console.log('labels', labels);
    // console.log('caseTitle', caseTitle);
    // console.log('caseData', caseData);
    // console.log('deathTitle', deathTitle);
    // console.log('deathData', deathData);
    // console.log('recoveredTitle', recoveredTitle);
    // console.log('recoveredData', recoveredData);

    return (
        <div>
            <p></p>
            <h4>{title}</h4>
            <small className='small-text'>Click on the chart labels to show/hide the corresponding data.</small>
            <Line
                data={{
                        labels: labels,
                        datasets:[
                        {
                            label: caseTitle,
                            data: caseData, 
                            backgroundColor: [
                                'rgba(205, 181, 132, 0.4)',
                            ],                           
                        },
                        {
                            label: deathTitle,
                            data: deathData, 
                            backgroundColor: [
                                'rgba(54, 162, 235, 1)',
                            ],                           
                        },  
                        {
                            label: recoveredTitle,
                            data: recoveredData, 
                            backgroundColor: [
                                'rgba(255, 226, 86, 0.6)',
                            ],                           
                        },                         
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

{/* START HERE */}


            {/* <Bar
                data={{
                        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                        datasets:[
                        {
                            label: '# of Votes',
                            data: [12, 19, 3, 5, 2, 3],
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
                            borderWidth: 1,
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
            /> */}


        </div>
    )
}

export default XChart;