import React, { useContext, useState } from 'react'
import NumberFormat from 'react-number-format';
import { CountryContext, EarthContext } from '../context/api';

const DailyVacs = ({num}) => {
    const { owid } = useContext(EarthContext);
    const { countryInfo } = useContext(CountryContext);

    const _name  = countryInfo[0].name;
    let _num = num;
    // NOTE: All per millionLION
    let vacs = [];      
    let tests = [];
    let hosp = [];
    let cases = [];     
    let deaths = [];    

    // console.log(owid);

    let currentDate = new Date();
    let _yesterday = currentDate - 86400000;
    let yesterday = new Date(_yesterday);
    // See note below: getDate() returns correct date (day of month) here, but not from below ???

    owid.forEach((x) => {
        let _vacs = []; 
        let _tests = []; 
        let _hosp = []; 
        let _cases = [];
        let _deaths = [];

        let xDate = new Date(x.data[x.data.length-1].date)
        // *** ODD!! getDate() returns date - 1 day, for the xDate found!!!! WTF??? So, will add one ... ***

        if (x.data[x.data.length-1].new_vaccinations_smoothed_per_million !== undefined 
            && x.name.substring(0,4) !== "OWID" 
                && xDate.getMonth().toString() + (xDate.getDate() + 1).toString() === 
                    yesterday.getMonth().toString() + yesterday.getDate().toString()
                ) {

                    _vacs.push(x.location, 
                        x.data[x.data.length-1].new_vaccinations_smoothed_per_million,
                        x.data[x.data.length-1].date, );
        };
        if (_vacs.length > 0) {
            vacs.push(_vacs);
        };

        if (x.data[x.data.length-1].new_tests_smoothed_per_thousand !== undefined 
            && x.name.substring(0,4) !== "OWID" 
                && xDate.getMonth().toString() + (xDate.getDate() + 1).toString() === 
                    yesterday.getMonth().toString() + yesterday.getDate().toString()
                ) {

                    _tests.push(x.location, 
                        x.data[x.data.length-1].new_tests_smoothed_per_thousand,
                        x.data[x.data.length-1].date, );
        };
        if (_tests.length > 0) {
            tests.push(_tests);
        };

        if (x.data[x.data.length-1].hosp_patients_per_million !== undefined 
            && x.name.substring(0,4) !== "OWID" 
                && xDate.getMonth().toString() + (xDate.getDate() + 1).toString() === 
                    yesterday.getMonth().toString() + yesterday.getDate().toString()
                ) {
                    
                    _hosp.push(x.location, 
                        x.data[x.data.length-1].hosp_patients_per_million,
                        x.data[x.data.length-1].date, );
        };
        if (_hosp.length > 0) {
            hosp.push(_hosp);
        };

        if (x.data[x.data.length-1].total_cases_per_million !== undefined 
            && x.name.substring(0,4) !== "OWID" 
                && xDate.getMonth().toString() + (xDate.getDate() + 1).toString() === 
                    yesterday.getMonth().toString() + yesterday.getDate().toString()
                ) {
                    
                    _cases.push(x.location, 
                        Math.ceil(x.data[x.data.length-1].total_cases_per_million),
                        x.data[x.data.length-1].date, );
        };
        if (_cases.length > 0) {
            cases.push(_cases);
        };

        if (x.data[x.data.length-1].total_deaths_per_million !== undefined 
            && x.name.substring(0,4) !== "OWID" 
                && xDate.getMonth().toString() + (xDate.getDate() + 1).toString() === 
                    yesterday.getMonth().toString() + yesterday.getDate().toString()
                ) {
                    
                    _deaths.push(x.location, 
                        Math.ceil(x.data[x.data.length-1].total_deaths_per_million),
                        x.data[x.data.length-1].date, );
        };
        if (_deaths.length > 0) {
            deaths.push(_deaths);
        };
    });

    let topVacs = vacs.sort(function(a, b) {
        return a[1] - b[1] }).reverse().slice(0, _num);

    // No info for Sat June 18th - SAT    
    let topTests = tests.sort(function(a, b) {
        return a[1] - b[1] }).reverse().slice(0, _num);
    // console.log('topTests', topTests);

    let topHosp = hosp.sort(function(a, b) {
        return a[1] - b[1] }).reverse().slice(0, _num);
    // console.log('topHosp', topHosp);

    let topCases = cases.sort(function(a, b) {
        return a[1] - b[1] }).reverse().slice(0, _num);
    // console.log('topCases', topCases);

    let topDeaths = deaths.sort(function(a, b) {
        return a[1] - b[1] }).reverse().slice(0, _num);
    // console.log('topDeaths', topDeaths);
    
    return (
        <>
            <div className="row">  
                <div className="col-sm-4">      
                    <ul className='stats-list'> 
                        <h5>Vaccination Rate</h5>
                        <h6>(New Vacs per million)</h6> 
                        {/* <small>Yesterday's reported numbers</small>   */}
                        { topVacs.map( (country, index) => {
                            return (
                                <li title="Vac Rate" key={country[0]}>
                                    <small>{index+1}</small> 
                                    {/* <strong>{country[0]}</strong>  */}
                                    { country[0] === _name ?
                                        <strong 
                                            style={{color:'red', 
                                            fontWeight: '800',
                                            fontSize: '1.25rem'}}>{country[0]}</strong> 
                                    :  <strong>{country[0]}</strong> 
                                    }

                                    <em><NumberFormat 
                                        value={country[1]} 
                                        displayType={'text'} thousandSeparator="," 
                                        decimalScale="2"
                                    /></em>
                                </li> )
                        })}
                    </ul>
                </div>

                <div className="col-sm-4">      
                    <ul className='stats-list'> 
                        <h5>Case Rate</h5>
                        <h6>(Total Cases per million)</h6> 
                        {/* <small>Yesterday's reported numbers</small>   */}
                        { topCases.map( (country, index) => {
                            return (
                                <li title="Case Rate" key={country[0]}>
                                    <small>{index+1}</small> 
                                    {/* <strong>{country[0]}</strong>  */}
                                    { country[0] === _name ?
                                        <strong 
                                            style={{color:'red', 
                                            fontWeight: '800',
                                            fontSize: '1.25rem'}}>{country[0]}</strong> 
                                    :  <strong>{country[0]}</strong> 
                                    }
                                    <em><NumberFormat 
                                        value={country[1]} 
                                        displayType={'text'} thousandSeparator="," 
                                        decimalScale="2"
                                    /></em>
                                </li> )
                        })}
                    </ul>
                </div>

                <div className="col-sm-4">      
                    <ul className='stats-list'> 
                        <h5>Death Rate</h5>
                        <h6>(Total Deaths per million)</h6> 
                        { topDeaths.map( (country, index) => {
                            return (
                                <li title="Death Rate" key={country[0]}>
                                    <small>{index+1}</small> 
                                    { country[0] === _name ?
                                        <strong 
                                            style={{color:'red', 
                                            fontWeight: '800',
                                            fontSize: '1.25rem'}}>{country[0]}</strong> 
                                    :  <strong>{country[0]}</strong> 
                                    }
                                    <em><NumberFormat 
                                        value={country[1]} 
                                        displayType={'text'} thousandSeparator="," 
                                        decimalScale="2"
                                    /></em>
                                </li> )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default DailyVacs
