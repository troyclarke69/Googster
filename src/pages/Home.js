import React, { useContext, useEffect } from 'react';
import { UserContext, EarthContext, AllContext, CountryContext, StatsContext } from '../context/api'; 
import { useHistory }  from 'react-router-dom';
import CountryTotals from '../components/CountryTotals';
import CountryDailies from '../components/CountryDailies';

const Home = () => {
    const { countryList, getCountryTotals, countryTotals,
        countryTotalsLoading, countryTotalsError,
        getCountryDailies, countryDailiesLoading, countryDailiesError,
        getCountryInfo, countryInfo, countryInfoLoading, countryInfoError,
        getWhosBad, whosBad } = useContext(CountryContext);
    const { getEarth, earth, earthLoading, earthError } = useContext(EarthContext);
    const { getUserGeolocationDetails, country, userDetails, userLoading, userError } = useContext(UserContext);

    let history = useHistory();

    useEffect(() => {
        getUserGeolocationDetails();
    },[]);

    useEffect( () => {
        getEarth();
    },[]);
    
    useEffect( () => {
        getWhosBad();
    },[]);

    const handleSelect=(e)=>{
        if (e) {
          if (e === 'all') {
            return (
                history.push('/earth')
              )
            } else {
              getCountryTotals(e);
              getCountryDailies(e);
              if (e === 'US') {
                getCountryInfo('USA');
              } else {
                getCountryInfo(e);
              }
    
              return (
                <>
                  <CountryTotals countryName={e} />
                  <CountryDailies countryName={e} />
                </>
                )
            }
        };
      };

    if (userError) {
        return (
            <div className='container'>
                <h4>Ooops! Something went wrong!</h4>
                <h6>Try Refreshing the Page</h6>
            </div>
        )
    };
  
    if (userLoading) {
      return (
        <div className='container'>
          <h4>Hold On!</h4>
          <h6>I am crunching a boat-load of data ...</h6>
        </div>
      )
    };

    const onClick = () => {
        alert('Yeah you clicked. Good for you');
    }

    return (
        <>
            <div className='container-fluid'>
                <h1>
                    Looks like you are from {!userLoading && <strong>{country}</strong>}
                </h1>
                <ul>
                    <li>Show me some numbers</li>
                    <li>What's happening somewhere else?
                        <input type="text" id="country" defaultValue={country}></input>
                        <button onClick={onClick} type='button'>Go there</button>
                    </li>
                </ul>
            </div>
        </>
    )
};

export default Home;