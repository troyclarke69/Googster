import React, { useContext, useEffect, useState } from 'react';
import { CountryContext } from '../context/api'; 
import NumberFormat from 'react-number-format';
import XChart from '././XChart';
import Moment from 'react-moment';
import CaseChart from './CaseChart';

const CountryDailies = ({ countryName }) => {
    let num = 5;
    const countryData = useContext(CountryContext);
    const { getCountryDailies, countryDailiesLoading, countryDailiesError } = useContext(CountryContext);
    const { getVaccinations, vaccinations, vaccinationsLoading, vaccinationsError} = useContext(CountryContext);

    useEffect( () => {
        getCountryDailies(countryName);
    },[countryName]);

    useEffect( () => {
        getVaccinations(countryName);
    },[countryName]);

    const countryDailies = countryData.countryDailies;
    const title = 'Timeline';
    const caseTitle = 'Daily Cases';
    const deathTitle = 'Daily Deaths';
    const recoveredTitle = 'Daily Recovered';
    let labels = [];
    let caseData = [];
    let deathData = [];
    let recoveredData = [];

    // chart data
    const [chartLabels, setChartLabels] = useState([]);
    const [chartCases, setChartCases] = useState([]);
    const [chartDeaths, setChartDeaths] = useState([]);
    const [chartRecovered, setChartRecovered] = useState([]);

    const [lastXCases, setLastXCases] = useState([]);
    const [lastXCasesSmoothed, setLastXCasesSmoothed] = useState([]);
    const [lastXDates, setLastXDates] = useState([]);
    const [lastXAves, setLastXAves] = useState([]);
    const [lastXVacs, setLastXVacs] = useState([]);

    const [yesterdayCases, setYesterdayCases] = useState(0);
    const [threeDayCases, setThreeDayCases] = useState(0);
    const [weekCases, setWeekCases] = useState(0);
    const [twoWeekCases, setTwoWeekCases] = useState(0);
    const [monthCases, setMonthCases] = useState(0);
    const [twoMonthCases, setTwoMonthCases] = useState(0);
    const [threeMonthCases, setThreeMonthCases] = useState(0);
    const [allReportedCases, setAllReportedCases] = useState(0);

    const [yesterdayDeaths, setYesterdayDeaths] = useState(0);
    const [threeDayDeaths, setThreeDayDeaths] = useState(0);
    const [weekDeaths, setWeekDeaths] = useState(0);
    const [twoWeekDeaths, setTwoWeekDeaths] = useState(0);
    const [monthDeaths, setMonthDeaths] = useState(0);
    const [twoMonthDeaths, setTwoMonthDeaths] = useState(0);
    const [threeMonthDeaths, setThreeMonthDeaths] = useState(0);
    const [allReportedDeaths, setAllReportedDeaths] = useState(0);

    const [highCases, setHighCases] = useState(0);
    const [highCasesDate, setHighCasesDate] = useState(null);

    const [highDeaths, setHighDeaths] = useState(0);
    const [highDeathsDate, setHighDeathsDate] = useState(null);

    // console.log('vaccinations', vaccinations);

    useEffect( () => {
        okComputer({countryDailies});
    },[countryDailies]);

    const tester = ({ countryDailies }) => {
        if (!countryDailiesLoading && !countryDailiesError) {
            const data = countryDailies;
            // console.log('data', data[320][0], data[320][1]);
        }
    };

    const okComputer = ({ countryDailies }) => {
        if (!countryDailiesLoading && !countryDailiesError 
            && !vaccinationsLoading && !vaccinationsError) {

            let listData = [];
            let start = 0;
            let end = countryDailies.length;

            // timeline chart (all reported dates - f. Jan 22/20)
            for (var i = start; i < end; i++) {  
                labels.push(countryDailies[i][0]);    
                caseData.push(countryDailies[i][1]);
                recoveredData.push(countryDailies[i][2]);
                deathData.push(countryDailies[i][3]);
            }

            setChartLabels(labels);
            setChartCases(caseData);
            setChartRecovered(recoveredData);
            setChartDeaths(deathData);

            // timeline chart 2 (last x reported dates) WITH WK av.
            start = countryDailies.length - 1;
            //  end = countryDailies.length - 61;

            let offset = countryDailies.length - vaccinations[0].data.length;
            // console.log('offset', offset);

            // report from specific date >>
            let dateStart = new Date('1 Jan 2021');
            let currentDate = new Date();
            let totalSeconds = (currentDate - dateStart) / 1000;
            let totalDays = Math.ceil(totalSeconds / 3600 / 24);
            end = countryDailies.length - totalDays;

            let _lastXCases = [];
            let _lastXCasesSmoothed = [];
            let _lastXDates = [];
            let _lastXAves = [];
            let _lastXVacs = [];
            setLastXVacs([]);
            setLastXCasesSmoothed([]);

            for (var i = start; i > end; i--) {  
                _lastXDates.push(countryDailies[i][0]);    
                _lastXCases.push(countryDailies[i][1] - countryDailies[i - 1][1]);  
                _lastXAves.push(
                    Math.ceil((countryDailies[i][1] - countryDailies[i - 7][1])
                        / 7)
                ); 

                _lastXVacs.push(vaccinations[0].data[i - offset]['new_vaccinations_smoothed_per_million']);
                // 7-day avg
                _lastXCasesSmoothed.push(Math.ceil(vaccinations[0].data[i - offset]['new_cases_smoothed_per_million']));
            }

            // console.log('cases', _lastXCasesSmoothed);

            _lastXCases = _lastXCases.reverse();
            _lastXCasesSmoothed = _lastXCasesSmoothed.reverse();
            _lastXDates = _lastXDates.reverse();
            _lastXAves = _lastXAves.reverse();
            _lastXVacs = _lastXVacs.reverse();
            setLastXCases(_lastXCases);
            setLastXCasesSmoothed(_lastXCasesSmoothed);
            setLastXDates(_lastXDates);
            setLastXAves(_lastXAves);
            setLastXVacs(_lastXVacs);

            // CASE averages : last 3 days, 1 week, 2 weeks, months, twoMonths, threeMonths
            start = countryDailies.length - 1;
            end = 0;

            let xTotal = 0;
            let counter = 0;
            let a = 3; let b = 7; let c = 14; let d = 30; let e = 60; let f= 90; 
            let g = countryDailies.length - 1;
            let aa = 0; let bb = 0; let cc = 0; let dd = 0; let ee = 0; let ff = 0;
            let gg = 0;
            for(var i = start; i > end; i--) {
                counter = counter + 1;
                xTotal = xTotal + (countryDailies[i][1] - countryDailies[i - 1][1]);
                if (counter === a){
                    aa = Math.ceil(xTotal / a);
                }
                if (counter === b){
                    bb = Math.ceil(xTotal / b);
                }
                if (counter === c){
                    cc = Math.ceil(xTotal / c);
                }
                if (counter === d){
                    dd = Math.ceil(xTotal / d);
                }
                if (counter === e){
                    ee = Math.ceil(xTotal / e);
                }
                if (counter === f){
                    ff = Math.ceil(xTotal / f);
                }
                if (counter === g){
                    gg = Math.ceil(xTotal / g);
                }
            };

            // DEATH averages : last 3 days, 1 week, 2 weeks, monthL
            start = countryDailies.length - 1;
            end = 0;
            xTotal = 0;
            counter = 0;

            let w = 3; let x = 7; let y = 14; let z = 30; let az = 60; let bz = 90;
            let cz = countryDailies.length - 1;
            let ww = 0; let xx = 0; let yy = 0; let zz = 0; let azz = 0; let bzz = 0;
            let czz = 0;
            for(var i = start; i > end; i--) {
                counter = counter + 1;
                xTotal = xTotal + (countryDailies[i][3] - countryDailies[i - 1][3]);
                if (counter === w){
                    ww = Math.ceil(xTotal / w);
                }
                if (counter === x){
                    xx = Math.ceil(xTotal / x);
                }
                if (counter === y){
                    yy = Math.ceil(xTotal / y);
                }
                if (counter === z){
                    zz = Math.ceil(xTotal / z);
                }
                if (counter === az){
                    azz = Math.ceil(xTotal / az);
                }
                if (counter === bz){
                    bzz = Math.ceil(xTotal / bz);
                }
                if (counter === cz){
                    czz = Math.ceil(xTotal / cz);
                }
            };
            // console.log('deaths', ww, xx, yy, zz);

            setYesterdayCases(countryDailies[countryDailies.length - 1][1] 
                - countryDailies[countryDailies.length - 2][1]);
            setThreeDayCases(aa);
            setWeekCases(bb);
            setTwoWeekCases(cc);
            setMonthCases(dd);
            setTwoMonthCases(ee);
            setThreeMonthCases(ff);
            setAllReportedCases(gg);

            setYesterdayDeaths(countryDailies[countryDailies.length - 1][3] 
                - countryDailies[countryDailies.length - 2][3]);
            setThreeDayDeaths(ww);
            setWeekDeaths(xx);
            setTwoWeekDeaths(yy);
            setMonthDeaths(zz);    
            setTwoMonthDeaths(azz);    
            setThreeMonthDeaths(bzz);    
            setAllReportedDeaths(czz);    
            
            //WORST DAYS - Cases & Deaths
            var dailyHigh = 0;
            var dailyHighDate;
            var dailyDeath = 0;
            var dailyDeathDate;
            var highDataRow = [];
            var highData = [];
            start = 1; //must begin at 1 - will obtain first day by offsetting by 1
            end = countryDailies.length;

            for (var i = start; i < end; i++) {    
                if ( ( countryDailies[i][1] - countryDailies[i - 1][1]) * 1
                            > dailyHigh) {
                  dailyHigh = ( countryDailies[i][1] - countryDailies[i - 1][1]) * 1;
                  dailyHighDate = countryDailies[i][0];
                };

                if ( ( countryDailies[i][3] - countryDailies[i - 1][3]) * 1
                            > dailyDeath) {
                  dailyDeath = ( countryDailies[i][3] - countryDailies[i - 1][3]) * 1;
                  dailyDeathDate = countryDailies[i][0];
                };
    
                listData.push(d);
            };

            setHighCases(dailyHigh);
            setHighCasesDate(dailyHighDate);
            setHighDeaths(dailyDeath);
            setHighDeathsDate(dailyDeathDate);

        };
    };  

    return (
        <>
            <div className="container">
                <h5>Daily Cases</h5>
                <p className='small-text'>Click on the chart labels to show/hide the corresponding data.</p>

                <CaseChart 
                    title={'Daily Cases'}

                    // labels={['Past 2 Months (ave/day)', 
                    //         'Past Month (ave/day)', 'Past Week (ave/day)', 
                    //     'Past 3 days (ave/day)', 'Yesterday']}
                    labels = {lastXDates}
                    caseData={
                        [   twoMonthCases,
                            monthCases,
                            weekCases,
                            threeDayCases,
                            yesterdayCases
                        ]                 
                    }
                    
                    lastXCases={lastXCases}
                    lastXCasesSmoothed={lastXCasesSmoothed}
                    lastXAves={lastXAves}
                    lastXVacs={lastXVacs}
                    // deathData={
                    //     [ monthDeaths,
                    //         weekDeaths,
                    //         threeDayDeaths,
                    //         yesterdayDeaths
                    //     ]                 
                    // }
                />
            </div>

            {/* <hr></hr> */}
            <h1></h1>
            {/* <div className='container'>  */}
            <div className="container">                    
                <h5>Cases &amp; Deaths</h5>
                {/* <h5>The Numbers</h5> */}
                    <table className="table table-striped table-hover table-custom">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Cases</th>
                                <th>Deaths</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><h6>Yesterday</h6></td>
                                <td><NumberFormat displayType={'text'} thousandSeparator="," value={yesterdayCases} /></td>
                                <td><NumberFormat displayType={'text'} thousandSeparator="," value={yesterdayDeaths} /></td>
                            </tr>
                            {/* <tr>
                                <td><h6>past 3 days (avg/day)</h6></td>
                                <td><NumberFormat displayType={'text'} thousandSeparator="," value={threeDayCases} /></td>
                                <td><NumberFormat displayType={'text'} thousandSeparator="," value={threeDayDeaths} /></td>
                            </tr> */}
                            <tr>
                                <td><h6>past week (avg/day)</h6></td>
                                <td><NumberFormat displayType={'text'} thousandSeparator="," value={weekCases} /></td>
                                <td><NumberFormat displayType={'text'} thousandSeparator="," value={weekDeaths} /></td>
                            </tr>
                            {/* <tr>
                                <td><h6>past 2 weeks (avg/day)</h6></td>
                                <td><NumberFormat displayType={'text'} thousandSeparator="," value={twoWeekCases} /></td>
                                <td><NumberFormat displayType={'text'} thousandSeparator="," value={twoWeekDeaths} /></td>
                            </tr> */}
                            <tr>
                                <td><h6>past 30 days (avg/day)</h6></td>
                                <td><NumberFormat displayType={'text'} thousandSeparator="," value={monthCases} /></td>
                                <td><NumberFormat displayType={'text'} thousandSeparator="," value={monthDeaths} /></td>
                            </tr>
                            {/* <tr>
                                <td><h6>past 60 days (avg/day)</h6></td>
                                <td><NumberFormat displayType={'text'} thousandSeparator="," value={twoMonthCases} /></td>
                                <td><NumberFormat displayType={'text'} thousandSeparator="," value={twoMonthDeaths} /></td>
                            </tr> */}
                            {/* <tr>
                                <td><h6>past 90 days (avg/day)</h6></td>
                                <td><NumberFormat displayType={'text'} thousandSeparator="," value={threeMonthCases} /></td>
                                <td><NumberFormat displayType={'text'} thousandSeparator="," value={threeMonthDeaths} /></td>
                            </tr> */}
                            <tr>
                                <td><h6>all reported (avg/day)</h6></td>
                                <td><NumberFormat displayType={'text'} thousandSeparator="," value={allReportedCases} /></td>
                                <td><NumberFormat displayType={'text'} thousandSeparator="," value={allReportedDeaths} /></td>
                            </tr>
                        </tbody>
                    </table>
            </div>

            <p></p>

            <div className='container'>
                <h5>Worst Days</h5>
                <table className='table table-custom'>
                    <tbody>
                        <tr>
                            <td>Cases</td>
                            <td>
                                <Moment format="MMMM D YYYY">
                                    {highCasesDate}
                                </Moment>
                            </td>
                            <td><NumberFormat displayType={'text'} thousandSeparator="," value={highCases} /></td>
                        </tr>
                        <tr>
                            <td>Deaths</td>
                            <td>
                                <Moment format="MMMM D YYYY">
                                    {highDeathsDate}
                                </Moment>
                            </td>
                            <td><NumberFormat displayType={'text'} thousandSeparator="," value={highDeaths} /></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <XChart title={title}
                    labels={chartLabels} 
                    caseTitle={caseTitle}
                    caseData={chartCases} 
                    deathTitle={deathTitle}
                    deathData={chartDeaths}
                    recoveredTitle={recoveredTitle}
                    recoveredData={chartRecovered}
            />  
        
        </>
    )
};

export default CountryDailies;