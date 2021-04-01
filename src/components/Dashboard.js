import React, { useContext } from 'react';
import { StatsContext } from '../context/api';
import NumberFormat from 'react-number-format';


const Dashboard = () => {
    const _num = 5
    const _numTrend = 200;
    const { stats } = useContext(StatsContext);

    // order yesterday cases:
    let topCases = stats.sort(function(a, b) {
        return a['yesterdayCases'] - b['yesterdayCases']}).reverse().slice(0, _num);
    // console.log('Yesterday Cases', topCases);

    // order yesterday deaths:
    let topDeaths = stats.sort(function(a, b) {
      return a['yesterdayDeaths'] - b['yesterdayDeaths']}).reverse().slice(0, _num);
    // console.log('Yesterday Deaths', topDeaths);  

    // order three-day case ave.:
    let topThreeDayAve = stats.sort(function(a, b) {
       return a['threeDayCasesAve'] - b['threeDayCasesAve']}).reverse().slice(0, _num);
    // console.log('threeDayCases', topThreeDayAve); 
      
    // order three-day case ave.:
    let topPastWeekAve = stats.sort(function(a, b) {
        return a['pastWeekCasesAve'] - b['pastWeekCasesAve']}).reverse().slice(0, _num);
    // console.log('pastWeekCases', topPastWeekAve);  

    // order case % increase
    let topCasesPerc = stats.sort(function(a, b) {
        return a['yesterdayCasesPerc'] - b['yesterdayCasesPerc']}).reverse().slice(0, _num);
    // console.log('yesterdayCasesPerc', topCasesPerc); 

    // order death % increase
    // let topDeathsPerc = stats.find(element => element > 0); //returns only first element
    let topDeathsPerc = stats.sort(function(a, b) {
        return a['yesterdayDeathsPerc'] - b['yesterdayDeathsPerc']}).reverse().slice(0, _num);
    // console.log('yesterdayDeathsPerc', topDeathsPerc); 
    
     // order past v previous week case ave.:
     let topPvPWeekAve = stats.sort(function(a, b) {
        return a['pastVsPreviousWeekCasesAve'] 
            - b['pastVsPreviousWeekCasesAve']}).reverse().slice(0, _numTrend);
    // console.log('topPvPWeekAve', topPvPWeekAve); 
    
    // order past v previous week case ave.:
    let topPvPWeekAvePerc = stats.sort(function(a, b) {
        return a['pastVsPreviousWeekCasesAvePerc'] 
                - b['pastVsPreviousWeekCasesAvePerc']}).reverse().slice(0, _num);
    // console.log('topPvPWeekAvePerc', topPvPWeekAvePerc);  

    return (
        <>
        <div className="container stats-container">
            <h5>Yesterday's Highs</h5>
            <div className="row">
                <div className="col-sm-3">
                    <ul className='stats-list'>  
                        <h5>Cases</h5>            
                        { topCases.map( (country, index) => {
                            return (
                                <li key={index}><small>{index+1}</small> 
                                    <strong>{country.name}</strong> 
                                    <em><NumberFormat 
                                        value={country.yesterdayCases} 
                                        displayType={'text'} thousandSeparator="," 
                                    /></em>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="col-sm-3">
                    <ul className='stats-list'>  
                        <h5>Deaths</h5>            
                        { topDeaths.map( (country, index) => {
                            return (
                                <li key={index}><small>{index+1}</small> 
                                    <strong>{country.name}</strong> 
                                    <em><NumberFormat 
                                        value={country.yesterdayDeaths} 
                                        displayType={'text'} thousandSeparator="," 
                                    /></em>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="col-sm-3">
                    <ul className='stats-list'>  
                        <h5>Case Surge(%)</h5>            
                        { topCasesPerc.map( (country, index) => {
                            return (
                                <li key={index}><small>{index+1}</small> 
                                    <strong>{country.name}</strong> 
                                    <em><NumberFormat 
                                        value={country.yesterdayCasesPerc} 
                                        displayType={'text'} thousandSeparator="," 
                                        decimalScale="2"
                                    />%</em>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="col-sm-3">
                    <ul className='stats-list'>  
                        <h5>Death Surge(%)</h5>            
                        { topDeathsPerc.map( (country, index) => {
                            return (
                                <li key={index}><small>{index+1}</small> 
                                    <strong>{country.name}</strong> 
                                    <em><NumberFormat 
                                        value={country.yesterdayDeathsPerc} 
                                        displayType={'text'} thousandSeparator="," 
                                        decimalScale="2"
                                    />%</em>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div className="row trend-list">
                <h5>Trends</h5>
                <table className="table table-hover table-trend">
                    <thead className="bg-dark text-light">
                        <th>Country</th>
                        <th>Change in Ave. Daily Cases (%)</th>
                        <th>Over the last Week, Ave. Cases/Day</th>
                        <th>2 Weeks ago, Ave. Cases/Day</th>     
                    </thead>
                    <tbody>
                        {
                            topPvPWeekAve.map( (country, index) => {
                                return (
                                    <>
                                        <tr key={index} className="trend-list-data">
                                            <td>
                                                <small>{index+1}</small>
                                                {' '}{country.name}</td>

                                                <td><em><NumberFormat 
                                                value={country.pastVsPreviousWeekCasesAve} 
                                                displayType={'text'} thousandSeparator="," 
                                            />{' '}
                                            (<NumberFormat 
                                                value={country.pastVsPreviousWeekCasesAvePerc}
                                                displayType={'text'} thousandSeparator="," 
                                                decimalScale="1"
                                            />%)</em>
                                                {' '}
                                                { country.pastVsPreviousWeekCasesAve > 0 
                                                    ?
                                                    <i className="fa fa-arrow-up fa-2x"></i>
                                                    :
                                                    <i className="fa fa-arrow-down fa-2x"></i>
                                                }
                                            </td>

                                            <td><NumberFormat 
                                                value={country.pastWeekCasesAve}
                                                displayType={'text'} thousandSeparator="," 
                                            /></td>                                      
                                            <td><NumberFormat 
                                                value={country.previousWeekCasesAve}
                                                displayType={'text'} thousandSeparator="," 
                                            /></td>
                                            
                                        </tr>
                                    </>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>    
        </div>            
        </>
    )
}

export default Dashboard;
