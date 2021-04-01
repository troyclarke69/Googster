import React, { useEffect, useContext } from 'react';
import  { useHistory } from 'react-router-dom';
import CountryTotals from '../components/CountryTotals';
import CountryDailies from '../components/CountryDailies';
import WhosBad from '../components/WhosBad';
import Footer from '../components/Footer';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { CountryContext, UserContext, EarthContext } from '../context/api';
import ScrollUpButton from "react-scroll-up-button";
import YesterdayCases from '../components/YesterdayCases';
import Dashboard from '../components/Dashboard';
import TickerSample from '../components/TickerSample';
import CaseChart from '../components/CaseChart';

const Splash = () => {
  const { countryList, getCountryTotals, countryTotalsLoading, countryTotalsError,
          getCountryDailies, countryDailiesLoading, countryDailiesError,
          getCountryInfo, countryInfo, countryInfoLoading, countryInfoError,
          getWhosBad, whosBad } = useContext(CountryContext);
  const { getEarth, earth, earthLoading, earthError } = useContext(EarthContext);
  const { getUserGeolocationDetails, country, userDetails, userLoading, userError } = useContext(UserContext);

  let history = useHistory();
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

  useEffect( () => {
    getUserGeolocationDetails();
  },[]);

  // THIS API BOMBS OUT TOO OFTEN!!!!
  // useEffect( () => {
  //   getCountryInfo(country);
  // },[country]);

  useEffect( () => {
    getEarth();
  },[]);

  useEffect( () => {
    getWhosBad();
  },[]);

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

  return (
    <>

      {!userLoading &&
        <TickerSample />  
      }

      {!userLoading &&
        <DropdownButton variant='secondary'
              className='dropdown'
              title="Select a country..."
              id="dropdown"
              onSelect={handleSelect}
                  >
                    <Dropdown.Item eventKey='all' Link to = '/earth'>~All~</Dropdown.Item>
                    {countryList.map((name) => {
                      return <Dropdown.Item eventKey={name}>{name}</Dropdown.Item>
                  })}
          </DropdownButton>
      }
      
      <p></p>
      
      { !userLoading &&
        <CountryTotals countryName={country} 
                      //  nativeName={countryInfo[0].nativeName} 
        /> 
      }

      { !userLoading && <CountryDailies countryName={country} /> }

      { !userLoading &&
        <Dashboard />
      }

      <p></p>

      <ScrollUpButton AnimationDuration={100} />

      { !userLoading && <Footer />}
    </>
  );
};

export default Splash;