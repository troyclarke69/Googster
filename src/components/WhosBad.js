import React, { useContext, useEffect, useState } from 'react';
import { CountryContext } from '../context/api'; 
import NumberFormat from 'react-number-format';
import { computeHeadingLevel } from '@testing-library/dom';

const WhosBad = () => {
    const countryData = useContext(CountryContext);
    const { getWhosBad, whosBad, whosBadLoading, whosBadError } = useContext(CountryContext);
    const [ threeDayAve, setThreeDayAve ] = useState([]);
    const [ weekAve, setWeekAve ] = useState([]);
    const [ yesterday, setYesterday ] = useState([]);
    const [ yesterdayPerc, setYesterdayPerc ] = useState([]);
    const [ weekPerc, setWeekPerc ] = useState([]);

    const [highCases, setHighCases] = useState(0);
    const [highCasesDate, setHighCasesDate] = useState(null);

    const [highDeaths, setHighDeaths] = useState(0);
    const [highDeathsDate, setHighDeathsDate] = useState(null);

    useEffect( () => { getWhosBad();  },[]);
    useEffect( () => { paranoidAndroid({whosBad}); },[whosBad]);

    const paranoidAndroid = ({ whosBad }) => {
        let countries = [];
        let startTime = new Date(); let s = startTime.getSeconds(); let m = startTime.getMilliseconds();
        let keys = Object.keys(whosBad);
        for (var i=0; i < keys.length; i++) { countries.push(keys[i]); } 
        // console.log('LIST ', countryListData);
        let yesterdayTotal = 0;
        let yesterdayArr = [];

        let yesterdayTotalPerc = 0;
        let yesterdayArrPerc = [];

        let twoDayTotal = 0;
        let threeDayTotal = 0;
        let weekTotal = 0;
        let weekTotalPerc = 0;

        let twoDayArr = [];
        let threeDayArr = [];

        let weekArr = [];
        let weekArrPerc = [];

         //WORST DAYS - Cases & Deaths
         var dailyHigh = 0;
         var dailyHighDate;
         var dailyDeath = 0;
         var dailyDeathDate;
         var highDataRow = [];
         var highData = [];
         var start = 1; //must begin at 1 - will obtain first day by offsetting by 1
        //  end = countryDailies.length;


        // *******************************
        for (var j = 0; j < countries.length; j++) {

            // find peak day and compare latest # (%) 
            // -- LOOK AT CountryDaillies()

            // Me fears that this is going to bog down heavy
            // MUST FIND BETTER SOLUTION
            // PERHAPS ADD THIS FUNCTION TO CountryDaillies() ?????????????????????????????????????

            // Math.max WORKS!! However, the data is accumulative
            // so we have to loop thru the data to calc the dailies ...

            // console.log(whosBad[countries[j]].length);
            // for (var x = 0; x < whosBad[countries[j]].length; x++) {
            //     console.log('x');
            // }

            // like we did in CountryDailies() =>
            // if ( ( countryDailies[i][1] - countryDailies[i - 1][1]) * 1
            //             > dailyHigh) {
            //     dailyHigh = ( countryDailies[i][1] - countryDailies[i - 1][1]) * 1;
            //     dailyHighDate = countryDailies[i][0];
            // };

            // listData.push(d);


            // ****************************** Yesterday Cases
            yesterdayTotal = whosBad[countries[j]][whosBad[countries[j]].length - 1].confirmed 
                    - whosBad[countries[j]][whosBad[countries[j]].length - 2].confirmed;

            let rowY = [];
            rowY.push(countries[j], yesterdayTotal);
            yesterdayArr.push(rowY);

            // Yesterday case % Increase
            yesterdayTotalPerc = 
                    (whosBad[countries[j]][whosBad[countries[j]].length - 1].confirmed 
                    - whosBad[countries[j]][whosBad[countries[j]].length - 2].confirmed)
                    /
                    whosBad[countries[j]][whosBad[countries[j]].length - 2].confirmed
                    * 100;
                

            let rowYP = [];
            rowYP.push(countries[j], yesterdayTotalPerc);
            yesterdayArrPerc.push(rowYP);

            // *******************************
            threeDayTotal = whosBad[countries[j]][whosBad[countries[j]].length - 1].confirmed 
            - whosBad[countries[j]][whosBad[countries[j]].length - 4].confirmed;

            let row = [];
            row.push(countries[j], Math.ceil(threeDayTotal / 3));
            threeDayArr.push(row);

            // *******************************
            weekTotal = whosBad[countries[j]][whosBad[countries[j]].length - 1].confirmed 
                - whosBad[countries[j]][whosBad[countries[j]].length - 8].confirmed;

            let roweek = [];
            roweek.push(countries[j], Math.ceil(weekTotal / 7));
            weekArr.push(roweek);

             // *******************************
             weekTotalPerc = 
                     (whosBad[countries[j]][whosBad[countries[j]].length - 1].confirmed 
                     - whosBad[countries[j]][whosBad[countries[j]].length - 8].confirmed)
                     /
                     whosBad[countries[j]][whosBad[countries[j]].length - 8].confirmed
                     * 100;

            let roweekPerc = [];
            roweekPerc.push(countries[j], Math.ceil(weekTotalPerc));
            weekArrPerc.push(roweekPerc);

        }

        // console.log('ORIG', twoDayArr);

        // THANKS TO Pramod Vemulapalli (Stackoverflow) !!!!!!!!!!!!!!!!!
        // >> how to sort these arrays ... high #
        let sortedArr = threeDayArr.sort(function(a, b){return a[1] - b[1]}).reverse();
        let sortedArrWeek = weekArr.sort(function(a, b){return a[1] - b[1]}).reverse();
        let sortedArrY = yesterdayArr.sort(function(a, b){return a[1] - b[1]}).reverse();
        let sortedArrYP = yesterdayArrPerc.sort(function(a, b){return a[1] - b[1]}).reverse();
        let sortedArrWP = weekArrPerc.sort(function(a, b){return a[1] - b[1]}).reverse();

        //show top 5
        setThreeDayAve(sortedArr.slice(0,5));
        // console.log('ThreeDayArr', threeDayArr);
        //show top 5
        setWeekAve(sortedArrWeek.slice(0,5));
        // console.log('WeekArr', weekArr);
         //show top 5
         setYesterday(sortedArrY.slice(0,5));
        //  console.log('YesterdayArr', yesterdayArr);
        //show top 5
        setYesterdayPerc(sortedArrYP.slice(0,5));
        //  console.log('YesterdayArrPerc', yesterdayArrPerc);
         //show top 5
        setWeekPerc(sortedArrWP.slice(0,5));
        // console.log('WeekArrPerc', weekArrPerc);

        let endTime = new Date(); let es = endTime.getSeconds(); let em = endTime.getMilliseconds();
        console.log(es, s, em, m);

    };
    
    return (
        <>
        <div className='container'>
            <h6>Highest % Increase over the past week</h6>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            {/* <th>Country</th> */}
                            {/* <th>Cases</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        
                            {weekPerc.map( (c, index) => {
                                    return (
                                       <tr> 
                                           <td>
                                                <a href={'https://www.google.com/maps/place/' + c[0]}
                                                    target="_blank">
                                                        {c[0]}
                                                </a>
                                            </td> 
                                           <td>
                                                <NumberFormat displayType={'text'} decimalScale="2" thousandSeparator="," value={ c[1] } />
                                            </td> 
                                        </tr>
                                    )
                                })
                            }
                    </tbody>
                </table>

            <h6>Highest % Increase from yesterday</h6>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            {/* <th>Country</th> */}
                            {/* <th>Cases</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        
                            {yesterdayPerc.map( (c, index) => {
                                    return (
                                       <tr> 
                                           <td>
                                                <a href={'https://www.google.com/maps/place/' + c[0]}
                                                    target="_blank">
                                                        {c[0]}
                                                </a>
                                            </td> 
                                           <td>
                                                <NumberFormat displayType={'text'} decimalScale="2" thousandSeparator="," value={ c[1] } />
                                            </td> 
                                        </tr>
                                    )
                                })
                            }
                    </tbody>
                </table>

            <h6>Highest Cases: Yesterday</h6>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            {/* <th>Country</th> */}
                            {/* <th>Cases</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        
                            {yesterday.map( (c, index) => {
                                    return (
                                       <tr> 
                                           <td>
                                                <a href={'https://www.google.com/maps/place/' + c[0]}
                                                    target="_blank">
                                                        {c[0]}
                                                </a>
                                           </td> 
                                           <td>{ c[1] }</td> 
                                        </tr>
                                    )
                                })
                            }
                    </tbody>
                </table>
                
            <h6>Highest Cases: 3-day Ave.</h6>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            {/* <th>Country</th> */}
                            {/* <th>Cases</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        
                            {threeDayAve.map( (c, index) => {
                                    return (
                                       <tr> 
                                           <td>
                                                <a href={'https://www.google.com/maps/place/' + c[0]}
                                                    target="_blank">
                                                        {c[0]}
                                                </a>
                                            </td> 
                                           <td>{ c[1] }</td> 
                                        </tr>
                                    )
                                })
                            }
                    </tbody>
                </table>
        
            <h6>Highest Cases: Past Week Ave.</h6>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            {/* <th>Country</th> */}
                            {/* <th>Cases</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        
                            {weekAve.map( (c, index) => {
                                    return (
                                       <tr> 
                                           <td>
                                                <a href={'https://www.google.com/maps/place/' + c[0]}
                                                    target="_blank">
                                                        {c[0]}
                                                </a>
                                            </td> 
                                           <td>{ c[1] }</td> 
                                        </tr>
                                    )
                                })
                            }
                    </tbody>
                </table>
        </div>
        </>
    )
}

export default React.memo(WhosBad);

// let countryData = [];
        // // builds array for all countries - all dates
        // if (countries.length > 0) {
        //     for (var i = 0; i < countries.length; i++) {
        //         whosBad[countries[i]].forEach(
        //             ({ date, confirmed, recovered, deaths }) => 
        //         {
        //             let row = [];
        //             row.push(countries[i], date, confirmed, recovered, deaths);
        //             countryData.push(row);
        //         })
        //     } 
        // } 
        // console.log('countryData', countryData);