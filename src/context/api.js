import React, { useState, createContext } from 'react';
import {  dailyApi, earthApi, newsApi, countriesApi, 
          countryApi, geoApi, infoApi } 
        from '../helpers/Constants';
import axios from 'axios';

export const EarthContext = createContext();
export const AllContext = createContext();
export const CountryContext = createContext();
export const UserContext = createContext();
export const StatsContext = createContext();

export const CoronaProvider = ({ children }) => {

  const [countries, setCountries] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [countriesError, setCountriesError] = useState(false);

  const [userDetails, setUserDetails] = useState();
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState(false);

  const [countryTotals, setCountryTotals] = useState([]);
  const [countryTotalsLoading, setCountryTotalsLoading] = useState(true);
  const [countryTotalsError, setCountryTotalsError] = useState(false);

  const [countryDailies, setCountryDailies] = useState([]);
  const [countryDailiesLoading, setCountryDailiesLoading] = useState(true);
  const [countryDailiesError, setCountryDailiesError] = useState(false);

  const [countryInfo, setCountryInfo] = useState([]);
  const [countryInfoLoading, setCountryInfoLoading] = useState(true);
  const [countryInfoError, setCountryInfoError] = useState(false);

  const [countryNews, setCountryNews] = useState([]);
  const [countryNewsLoading, setCountryNewsLoading] = useState(true);
  const [countryNewsError, setCountryNewsError] = useState(false);

  const [earth, setEarth] = useState([]);
  const [earthLoading, setEarthLoading] = useState(true);
  const [earthError, setEarthError] = useState(false);

  const [whosBad, setWhosBad] = useState([]);
  const [whosBadLoading, setWhosBadLoading] = useState(true);
  const [whosBadError, setWhosBadError] = useState(false);

  const [country, setCountry] = useState('Bosnia');
  const [countryList, setCountryList] = useState([]);

  // local arrays:
  const countryData = [];
  const countryListData = [];

  const [ stats, setStats ] = useState([]);
  const [ countryStats, setCountryStats ] = useState(null);
  const [ countryStatsLoading, setCountryStatsLoading ] = useState(true);

  const getEarth = async () => {
    await axios.get(earthApi)
        .then(resp => {
          if (resp.status >= 200 && resp.status <= 299) {
            // console.log('api-earth', resp.data);
            setEarth(resp.data);
            setEarthLoading(false);
            setEarthError(false);
            } else {
            setEarthLoading(false);
            setEarthError(true);
            throw new Error(resp.statusText);
          }})
        .catch((error) => console.log(error));           
    };

  const getCountries = async () => {
    await axios.get(countriesApi)
        .then(resp => {
          if (resp.status >= 200 && resp.status <= 299) {
            // console.log('api-countries', resp.data);
            setCountries(resp.data);
            setCountriesLoading(false);
            setCountriesError(false);
            } else {
            setCountriesLoading(false);
            setCountriesError(true);
            throw new Error(resp.statusText);
          }})
        .catch((error) => console.log(error));           
      };

  const getCountryTotals = async (countryName) => {
    await axios.get(countryApi + countryName)
        .then(resp => {
          if (resp.status >= 200 && resp.status <= 299) {
            // console.log('api-countries', resp.data);
            setCountryTotals(resp.data);
            setCountryTotalsLoading(false);
            setCountryTotalsError(false);
            } else {
            setCountryTotalsLoading(false);
            setCountryTotalsError(true);
            throw new Error(resp.statusText);
          }})
        .catch((error) => console.log(error));           
      };

  const getCountryInfo = async (countryName) => {
    await axios.get(infoApi + countryName)
        .then(resp => {
          if (resp.status >= 200 && resp.status <= 299) {
            // console.log('api-countries', resp.data);
            setCountryInfo(resp.data);
            setCountryInfoLoading(false);
            setCountryInfoError(false);
            } else {
            setCountryInfoLoading(false);
            setCountryInfoError(true);
            throw new Error(resp.statusText);
          }})
        .catch((error) => console.log(error));           
      };

  const getWhosBad = async () => {
    await axios.get(dailyApi)
        .then(resp => {
          if (resp.status >= 200 && resp.status <= 299) {
            // console.log('getWhosBad', resp.data);
            setWhosBad(resp.data);
            setWhosBadLoading(false);
            setWhosBadError(false);

            let countries = [];
            let keys = Object.keys(resp.data); // NOT whosBad ... 
            // will be avail. in other components ... is this the thing I misunderstanding about state?????
            // console.log('KEYS ', keys);
            for (var i=0; i < keys.length; i++) { countries.push(keys[i]); } 

            let yesterdayCasesPerc = 0;
            let yesterdayCases = 0;
            let yesterdayDeathsPerc = 0;
            let yesterdayDeaths = 0;
            let threeDayCasesPerc = 0;
            let threeDayCasesAve = 0;
            let pastWeekCasesAve = 0;
            let previousWeekCasesAve = 0;
            let pastMonthCasesAve = 0;
            let pastVsPreviousWeekCasesAve = 0;
            let pastVsPreviousWeekCasesAvePerc = 0;

            for (var j = 0; j < countries.length; j++) {
                // console.log('country', countries[j]);

                // ****************************** Yesterday Cases
                yesterdayCases = 
                  (resp.data[countries[j]][resp.data[countries[j]].length - 1].confirmed 
                    - resp.data[countries[j]][resp.data[countries[j]].length - 2].confirmed)

                // ****************************** Yesterday %
                yesterdayCasesPerc = 
                  (resp.data[countries[j]][resp.data[countries[j]].length - 1].confirmed 
                    - resp.data[countries[j]][resp.data[countries[j]].length - 2].confirmed)
                       /
                     resp.data[countries[j]][resp.data[countries[j]].length - 2].confirmed
                     * 100;              

                 // ****************************** Yesterday Deaths
                yesterdayDeaths = 
                  (resp.data[countries[j]][resp.data[countries[j]].length - 1].deaths 
                    - resp.data[countries[j]][resp.data[countries[j]].length - 2].deaths)


                // ****************************** Yesterday Deaths %
                // only report if there was a death on last reported day (i.e. yesterday)
                // if we don't filter here, we run into many (0/1) = 0 - as well as (1/0) = NaN  
                yesterdayDeathsPerc = 0; 

                if  (resp.data[countries[j]][resp.data[countries[j]].length - 1].deaths 
                    - resp.data[countries[j]][resp.data[countries[j]].length - 2].deaths > 0) {

                  yesterdayDeathsPerc = 
                    (resp.data[countries[j]][resp.data[countries[j]].length - 1].deaths 
                      - resp.data[countries[j]][resp.data[countries[j]].length - 2].deaths)
                          /
                        resp.data[countries[j]][resp.data[countries[j]].length - 2].deaths
                        * 100;              
                }

                // ****************************** 3-day Cases
                threeDayCasesAve = 
                    Math.ceil((resp.data[countries[j]][resp.data[countries[j]].length - 1].confirmed 
                    - resp.data[countries[j]][resp.data[countries[j]].length - 4].confirmed)
                    / 3);

                // ****************************** 3-day %
                threeDayCasesPerc = 
                    ((resp.data[countries[j]][resp.data[countries[j]].length - 1].confirmed 
                    - resp.data[countries[j]][resp.data[countries[j]].length - 4].confirmed) 
                        /
                      resp.data[countries[j]][resp.data[countries[j]].length - 4].confirmed
                      * 100 / 3);              

                // ****************************** Past week case Ave     
                pastWeekCasesAve = 
                  Math.ceil((resp.data[countries[j]][resp.data[countries[j]].length - 1].confirmed 
                    - resp.data[countries[j]][resp.data[countries[j]].length - 8].confirmed)
                      / 7);

                // ****************************** Previous week case Ave
                previousWeekCasesAve = 
                  Math.ceil((resp.data[countries[j]][resp.data[countries[j]].length - 8].confirmed 
                    - resp.data[countries[j]][resp.data[countries[j]].length - 15].confirmed)
                      / 7);

                // ****************************** past 30 days Case Ave
                pastMonthCasesAve = 
                  Math.ceil((resp.data[countries[j]][resp.data[countries[j]].length - 1].confirmed 
                    - resp.data[countries[j]][resp.data[countries[j]].length - 31].confirmed)
                      / 30);

                // past vs. previous week case ave.
                // reset to 0 - to handle 0 pastVsPreviousWeekCasesAve instances
                pastVsPreviousWeekCasesAve = 0;
                pastVsPreviousWeekCasesAvePerc = 0;

                pastVsPreviousWeekCasesAve = pastWeekCasesAve - previousWeekCasesAve;

                pastVsPreviousWeekCasesAvePerc = 
                    (pastWeekCasesAve - previousWeekCasesAve) /
                        previousWeekCasesAve * 100;


                let rowStats = {
                    name: countries[j],
                    yesterdayCases,
                    yesterdayCasesPerc,
                    yesterdayDeaths,
                    yesterdayDeathsPerc,
                    threeDayCasesAve,
                    threeDayCasesPerc,
                    pastWeekCasesAve,
                    previousWeekCasesAve,
                    pastMonthCasesAve,
                    pastVsPreviousWeekCasesAve,
                    pastVsPreviousWeekCasesAvePerc               
                };
                stats.push(rowStats);
            }

            setStats(stats);
            // console.log('stats', stats);

          } else {
            setWhosBadLoading(false);
            setWhosBadError(true);           
            throw new Error(resp.statusText);
            
          }})
        .catch((error) => console.log(error));           
      };

  const getCountryNews = async (isoCode) => {
    // insert isoCode into newsApi
    const url = newsApi.replace('<>', isoCode);
    // console.log(url);

    await axios.get(url)
        .then(resp => {
          if (resp.status >= 200 && resp.status <= 299) {
            // console.log('api-news', resp.data);
            setCountryNews(resp.data);
            setCountryNewsLoading(false);
            setCountryNewsError(false);
            } else {
            setCountryNewsLoading(false);
            setCountryNewsError(true);
            throw new Error(resp.statusText);
          }})
        .catch((error) => console.log(error));           
      };    

  // NOTE: Using fetch here, just for s&g!    
  const getCountryDailies = (countryName) => {
    // console.log('getTest', countryName);
    fetch(dailyApi)
        .then( response => response.json() )
        .then( data => {
            setCountryDailiesLoading(false);
            setCountryDailiesError(false);

            // load country names for the dropdown list
            // gen list from dailyApi ...
            let keys = Object.keys(data);
            for (var i=0; i < keys.length; i++) 
            {
              countryListData.push(keys[i]);
            }             
            setCountryList(countryListData);

            data && data[countryName].forEach(({ date, confirmed, recovered, deaths }) => 
              {
                  let row = [];
                  row.push(date, confirmed, recovered, deaths);
                  countryData.push(row);
              }
          );

        // NOTE: countryData = array, data = object (contains keys)
        setCountryDailies(countryData);
        // setCountryDailies(data);
      });          
      // console.log('countryDailies', countryDailies);
    };

  const getUserGeolocationDetails = async () => {
      await axios.get(geoApi)
          .then(resp => {
            if (resp.status >= 200 && resp.status <= 299) {

              setUserDetails(resp.data);

              setCountry(resp.data.country_name);

              setUserLoading(false);
              setUserError(false)
            } else {
              setUserLoading(false);
              setUserError(true);
              throw new Error(resp.statusText);
            }
          })
          .catch((err) => {
              console.log(err);
              setUserLoading(false);
              setUserError(false);
          });
    };

  const getCountryStats = (countryName) => {
      // must adjust some names ... do not match exactly from data sources
      let name = '';
      switch(countryName) {
        case 'USA':
          name = 'US';
          break;
        case 'UK':
          name = 'United Kingdom';
          break;
        case 'Bosnia':
          name = 'Bosnia and Herzegovina';
          break;
        default:
          name = countryName;      
      }

      console.log(countryName, name);
      const cStats = stats.filter( (country) => {
         return country.name === name;
      });

      setCountryStats(cStats);
      setCountryStatsLoading(false);
    };

  return (
      <UserContext.Provider 
        value={{ getUserGeolocationDetails, country, userDetails, userLoading, userError }}>

          <EarthContext.Provider
            value={{ getEarth, earth, earthLoading, earthError }}>

            <CountryContext.Provider
              value={{  getCountryTotals, countryTotals, countryList, countryTotalsLoading,         countryTotalsError, getCountryDailies, countryDailies, countryDailiesLoading, countryDailiesError, getCountryInfo, countryInfo, countryInfoLoading, countryInfoError,
              getCountryNews, countryNews, countryNewsLoading, countryNewsError,
              getWhosBad, whosBad, whosBadLoading, whosBadError
                }}>

                    <AllContext.Provider
                        value={{ getCountries, countries, countriesLoading, countriesError  }}
                        >
                          <StatsContext.Provider
                            value={{ stats, getCountryStats, countryStats }}>
                              {children}
                          </StatsContext.Provider>
                        
                    </AllContext.Provider>

            </CountryContext.Provider>

          </EarthContext.Provider>

      </UserContext.Provider>      
    ); 

};