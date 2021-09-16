import React, { useContext, useEffect, useState } from 'react';
import { CountryContext, StatsContext } from '../context/api'; 
import NumberFormat from 'react-number-format';
import { motion } from 'framer-motion';
import CaseTrend from './CaseTrend';
import DeathTrend from './DeathTrend';
import CountryVacs from './CountryVacs';

const CountryTotals = ({ countryName, nativeName }) => {
    const countryData = useContext(CountryContext);
    const { getCountryTotals, countryTotalsLoading, countryTotalsError } = useContext(CountryContext);
    const { stats, getCountryStats, countryStats, countryStatsLoading } = useContext(StatsContext);
    const { getVaccinations, vaccinations, vaccinationsLoading, vaccinationsError} = useContext(CountryContext);

    useEffect( () => {
        getCountryTotals(countryName);
    },[countryName]);  

    const countryTotals = countryData.countryTotals;
    const { country, population, continent, 
            cases, todayCases, deaths, 
            todayDeaths, countryInfo,
            oneCasePerPeople, oneDeathPerPeople } 
        = countryTotals; 

    useEffect( () => {
        getCountryStats(country);
    },[country]);

    useEffect( () => {
        getVaccinations(country);
    },[country]); 

    // console.log('countryTotals', vaccinations);

    if (countryTotalsError) {
        return (
            <div className='container'>
                <h4>Ooops! Something went wrong!</h4>
            </div>
        )
    }

    if (countryTotalsLoading || countryStatsLoading || vaccinationsLoading) {
        return (
          <div className='container'>
            <h4>Loading up the country stats...</h4>
          </div>
        )
      }

    return ( 
        <motion.div className='container'>

            { country !== nativeName && <h6 className='native-name'>{nativeName}</h6> }
            <a style={{textDecoration: 'none'}} href={'https://www.google.com/maps/place/' + country}
                target="_blank">
                    <h4>{country}</h4>
            </a>         

            {countryInfo ? 
                <motion.img className='img-flag' src={countryInfo.flag} alt={country} 
                    initial={{ y: "-100vh" }}
                    animate={{ y: 0 }}
                    // Tween, Spring or Inertia.
                    transition={{ type: "tween", stiffness: 60, duration: 1.5 }}
                /> 
                : 
                ''
            }
            
            <h6>{continent}</h6>
            <h6>pop. <NumberFormat displayType={'text'} thousandSeparator="," value={population} /></h6>
            <p className='small-text'>Note: The day is reset after Midnight GMT+0</p>

            { countryStats[0] &&
                <CaseTrend 
                    rank={1}
                    pastVsPreviousWeekCasesAve={countryStats[0].pastVsPreviousWeekCasesAve}
                    pastVsPreviousWeekCasesAvePerc={countryStats[0].pastVsPreviousWeekCasesAvePerc}
                /> 
            }

            { countryStats[0] &&
                <DeathTrend 
                    rank={1}
                    pastVsPreviousWeekDeathsAve={countryStats[0].pastVsPreviousWeekDeathsAve}
                    pastVsPreviousWeekDeathsAvePerc={countryStats[0].pastVsPreviousWeekDeathsAvePerc}
                /> 
            }

            { vaccinations[0] &&
                <CountryVacs 
                    location={vaccinations[0].location}
                    new_cases={vaccinations[0].new_cases}
                    people_fully_vaccinated={vaccinations[0].people_fully_vaccinated} people_fully_vaccinated_per_hundred={vaccinations[0].people_fully_vaccinated_per_hundred}
                    people_vaccinated={vaccinations[0].people_vaccinated}
                    people_vaccinated_per_hundred={vaccinations[0].people_vaccinated_per_hundred}
                    new_vaccinations={vaccinations[0].new_vaccinations}
                />
            }
        
        </motion.div>     
    )
};

export default CountryTotals;