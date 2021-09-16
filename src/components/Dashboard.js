import React, { useContext } from 'react';
import  { Link, useHistory } from 'react-router-dom';
import { CountryContext, EarthContext, StatsContext } from '../context/api';
import NumberFormat from 'react-number-format';
import DailyVacs from './DailyVacs';

const Dashboard = ({num}) => {
    
    let _num = 5;
    let _numTrend = 5;

    if (num == 0) {
        _num = 250;
        _numTrend = 250;
    }
    
    const { stats } = useContext(StatsContext);
    const { earth } = useContext(EarthContext);
    const { countryInfo } = useContext(CountryContext);
    const history = useHistory();

    const _name  = countryInfo[0].name;
    // console.log(_name);

    // order yesterday cases:
    let topCases = stats.sort(function(a, b) {
        return a['yesterdayCases'] - b['yesterdayCases']}).reverse().slice(0, _num);
    // console.log('Yesterday Cases', topCases);

    // order yesterday deaths:
    let topDeaths = stats.sort(function(a, b) {
      return a['yesterdayDeaths'] - b['yesterdayDeaths']}).reverse().slice(0, _num);
    // console.log('Yesterday Deaths', topDeaths);  

    // order three-day case av.:
    let topThreeDayAve = stats.sort(function(a, b) {
       return a['threeDayCasesAve'] - b['threeDayCasesAve']}).reverse().slice(0, _num);
    // console.log('threeDayCases', topThreeDayAve); 
      
    // order three-day case av.:
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
    
     // order past v previous week case av.:
     let topPvPWeekAve = stats.sort(function(a, b) {
        return a['pastVsPreviousWeekCasesAve'] 
            - b['pastVsPreviousWeekCasesAve']}).reverse().slice(0, _numTrend);

    let topPvPWeekAvePerc = stats.sort(function(a, b) {
        return a['pastVsPreviousWeekCasesAvePerc'] 
            - b['pastVsPreviousWeekCasesAvePerc']}).reverse().slice(0, _numTrend);
            
    return (

        // <div className="container stats-container">
        <div className="container">
            <p></p>
            <hr />
            <h4>Earth</h4>
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg" 
                alt="The World" width='246px' height='198px' />
            <h6>pop. <NumberFormat displayType={'text'} thousandSeparator="," value={earth.population} /></h6>
            
            <p></p>

            { num !== 0 ? 
                <Link className="link-to" to="/stats">View All Stats</Link>
                :
                <Link className="link-to" to="/">Back</Link>          
            }
            
            <p></p>

            <h5>Yesterday's Highs</h5>
            <div className="row">
                <div className="col-sm-3">
                    <ul className='stats-list'>  
                        <h5>Cases</h5>            
                        { topCases.map( (country, index) => {
                            let {name} = country.name;
                            return (
                                <li title="Cases" key={country.name}>
                                    <small>{index+1}</small> 

                                    {/* <strong>{country.name}</strong>  */}

                                    { country.name === _name ?
                                        <strong 
                                            style={{color:'red', 
                                            fontWeight: '800',
                                            fontSize: '1.25rem'}}>{country.name}</strong> 
                                    :  <strong>{country.name}</strong> 
                                    }

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
                                <li title="Deaths" key={country.name}>
                                    <small>{index+1}</small> 
                                    {/* <strong>{country.name}</strong>  */}
                                    { country.name === _name ?
                                        <strong 
                                            style={{color:'red', 
                                            fontWeight: '800',
                                            fontSize: '1.25rem'}}>{country.name}</strong> 
                                    :  <strong>{country.name}</strong> 
                                    }
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
                    <ul className='stats-list' title="Yesterday's cases (ex. 11) less the day before (10) divided by the day before (equals 1/10 or 10%)">  
                        <h5>Case Surge*</h5>  
                        {/* <h6>(Highest daily % increase)</h6>           */}
                        { topCasesPerc.map( (country, index) => {
                            return (
                                <li title="Case Surge" key={country.name}>
                                    <small>{index+1}</small> 
                                    {/* <strong>{country.name}</strong>  */}
                                    { country.name === _name ?
                                        <strong 
                                            style={{color:'red', 
                                            fontWeight: '800',
                                            fontSize: '1.25rem'}}>{country.name}</strong> 
                                    :  <strong>{country.name}</strong> 
                                    }
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
                    <ul className='stats-list' title="Yesterday's deaths (ex. 11) less the day before (10) divided by the day before (equals 1/10 or 10%)">  
                        <h5>Death Surge*</h5>            
                        { topDeathsPerc.map( (country, index) => {
                            return (
                                <li title="Death Surge" key={country.name}>
                                    <small>{index+1}</small> 
                                    {/* <strong>{country.name}</strong>  */}
                                    { country.name === _name ?
                                        <strong 
                                            style={{color:'red', 
                                            fontWeight: '800',
                                            fontSize: '1.25rem'}}>{country.name}</strong> 
                                    :  <strong>{country.name}</strong> 
                                    }
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
           
            <DailyVacs num={_num} />
           
            <hr />
            <div className="row trend-list">
                <h5>Case Trends</h5>
                <table className="table table-hover table-trend">
                    {/* <thead className="bg-dark text-light"> */}
                    <thead style={{backgroundColor: '#f8f8f8'}}>
                        <th>Country</th>
                        <th>Change in avg daily cases (%)</th>
                        <th>Over the last week, avg cases/day</th>
                        <th>2 weeks ago, avg cases/day</th>     
                    </thead>
                    {/* <tbody style={{backgroundColor: '#e7e7e7'}}> */}
                    <tbody>
                        {
                            topPvPWeekAvePerc.map( (country, index) => {
                                return (
                                    <>
                                        <tr key={country.name} className="trend-list-data">
                                            <td>
                                                {/* <small>{index+1}</small>
                                                {' '}{country.name}</td> */}

                                        { country.name === _name ?
                                        <strong 
                                            style={{color:'red', 
                                            fontWeight: '800',
                                            fontSize: '1.25rem'}}>{country.name}</strong> 
                                    :  <h6>{country.name}</h6> 
                                    }
                                                </td>

                                                <td>
                                                    <em>
                                                        <NumberFormat 
                                                            value={country.pastVsPreviousWeekCasesAvePerc}
                                                            displayType={'text'} thousandSeparator="," 
                                                            decimalScale="1"
                                                        />%{' '}(
                                                        <NumberFormat 
                                                        value={country.pastVsPreviousWeekCasesAve} 
                                                        displayType={'text'} thousandSeparator="," 
                                                        />)
                                                    </em>

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
    )
}

export default Dashboard;
