import React, { useContext, useEffect, useState } from 'react';
import { CountryContext, StatsContext } from '../context/api'; 
import NumberFormat from 'react-number-format';
// import XChart from '././XChart';
import { motion } from 'framer-motion';
import CaseTrend from './CaseTrend';

const CountryTotals = ({ countryName, nativeName }) => {
    const countryData = useContext(CountryContext);
    const { getCountryTotals, countryTotalsLoading, countryTotalsError } = useContext(CountryContext);
    const { stats, getCountryStats, countryStats, countryStatsLoading } = useContext(StatsContext);

    useEffect( () => {
        getCountryTotals(countryName);
    },[countryName]);  

    const countryTotals = countryData.countryTotals;
    const { country, population, continent, cases, todayCases, deaths, todayDeaths, countryInfo,
            oneCasePerPeople, oneDeathPerPeople } = countryTotals; 

    useEffect( () => {
        getCountryStats(country);
    },[country]);

    if (countryTotalsError) {
        return (
            <div className='container'>
                <h4>Ooops! Something went wrong!</h4>
            </div>
        )
    }

    if (countryTotalsLoading || countryStatsLoading) {
        return (
          <div className='container'>
            <h4>Loading up your country stats...</h4>
          </div>
        )
      }

    return ( 
        <motion.div className='container'>

            { country !== nativeName && <h4 className='native-name'>{nativeName}</h4> }
            <a style={{textDecoration: 'none'}} href={'https://www.google.com/maps/place/' + country}
                target="_blank">
                    <h4>{country}</h4>
            </a>         

            {countryInfo ? 
                <motion.img className='img-flag' src={countryInfo.flag} alt={country} 
                    initial={{ y: "-100vh" }}
                    animate={{ y: 0 }}
                    // Tween, Spring or Inertia.
                    transition={{ type: "tween", stiffness: 60, duration: .5 }}
                /> 
                : 
                ''
            }
            
            <h6>pop. <NumberFormat displayType={'text'} thousandSeparator="," value={population} /></h6>
            <small>{continent}</small>
            <p className='small-text'>Note: The day is reset after midnight GMT+0.</p>


            { countryStats[0] &&
                <CaseTrend 
                    rank={1}
                    pastVsPreviousWeekCasesAve={countryStats[0].pastVsPreviousWeekCasesAve}
                    pastVsPreviousWeekCasesAvePerc={countryStats[0].pastVsPreviousWeekCasesAvePerc}
                /> 
            }
            
            <div className="row">
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-title">Today's Cases</h6>
                            <h4 className="card-text"><NumberFormat displayType={'text'} thousandSeparator="," value={todayCases} /></h4>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-title">Today's Deaths</h6>
                            <h4 className="card-text"><NumberFormat displayType={'text'} thousandSeparator="," value={todayDeaths} /></h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-title">Total Cases</h6>
                            <h4 className="card-text"><NumberFormat displayType={'text'} thousandSeparator="," value={cases} /></h4>
                            <p className="card-text">One case per {' '}
                                <em><NumberFormat displayType={'text'} thousandSeparator="," value={oneCasePerPeople} /></em>
                                {' '} people
                                <br />(
                                <em><NumberFormat displayType={'text'} decimalSeparator="." decimalScale="3"
                                    value={(1/oneCasePerPeople)*100} /></em>% of the population)
                            </p>
                            {/* <p class="card-text">Risk of contraction: {' '}
                                <NumberFormat displayType={'text'} decimalSeparator="." decimalScale="2"
                                    value={(1/oneCasePerPeople)*100} />%
                            </p> */}
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-title">Total Deaths</h6>
                            <h4 className="card-text"><NumberFormat displayType={'text'} thousandSeparator="," value={deaths} /></h4>
                            <p className="card-text">One death per {' '}
                                <em><NumberFormat displayType={'text'} thousandSeparator="," value={oneDeathPerPeople} /></em>
                                {' '} people
                                <br />(
                                <em><NumberFormat displayType={'text'} decimalSeparator="." decimalScale="3"
                                    value={(1/oneDeathPerPeople)*100} /></em>% of the population)
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </motion.div>     
    )
};

export default CountryTotals;