import React, { useEffect, useContext } from 'react';
import  { useHistory } from 'react-router-dom';
import CountryTotals from '../components/CountryTotals';
import CountryDailies from '../components/CountryDailies';
import Footer from '../components/Footer';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { CountryContext, UserContext, EarthContext } from '../context/api';
import ScrollUpButton from "react-scroll-up-button";
import Dashboard from '../components/Dashboard';
import TickerSample from '../components/TickerSample';
import Today from '../components/Today';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Banner from '../components/Banner';

const Splash = () => {
  const { countryList, getCountryTotals, countryTotals,
          countryTotalsLoading, countryTotalsError,
          getCountryDailies, countryDailiesLoading, countryDailiesError,
          getCountryInfo, countryInfo, countryInfoLoading, countryInfoError,
          getWhosBad, whosBad } = useContext(CountryContext);
  const { getEarth, earth, earthLoading, earthError, 
          getOwid, owid, owidLoading, owidError } = useContext(EarthContext);
  const { getUserGeolocationDetails, country, userDetails, userLoading, userError } = useContext(UserContext);

  // let spinnerType = "BallTriangle";
  // let spinnerType = "Audio";
  // let spinnerType = "Bars";
  // let spinnerType = "Circles";
  // let spinnerType = "Grid";
  let spinnerType = "Oval";
  // let spinnerType = "Puff";
  // let spinnerType = "Rings";
  // let spinnerType = "TailSpin";
  // let spinnerType = "ThreeDots";
  let spinnerColor = "red";
  let num = 5;

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
          // getOwid();

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

  // THIS API BOMBS OUT OFTEN!
  useEffect( () => {
    getCountryInfo(country);
  },[country]);

  useEffect( () => {
    getEarth();
  },[]);

  useEffect( () => {
    getWhosBad();
  },[]);

  useEffect( () => {
    getOwid();
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
      <div className='my-container'>
        <Loader
          type={spinnerType}
          color={spinnerColor}
          height={50}
          width={100}
          timeout={3000} //3 secs
        />
        <br />
        <h5>... gathering your location ...</h5>
      </div>
    )
  }

  if (countryInfoLoading) {
    return (
      <div className='my-container'>
         <Loader
          type={spinnerType}
          color={spinnerColor}
          height={50}
          width={100}
          timeout={3000} //3 secs
        />
        <br />
        <h5>... gathering your country info ...</h5>
      </div>
    )
  }

  if (owidLoading) {
    return (
      <div className='my-container'>
         <Loader
          type={spinnerType}
          color={spinnerColor}
          height={50}
          width={100}
          // timeout={6000}
        />
        <br />
        <h5>... computing stats ...</h5>
        <small style={{color:'green'}}>please hang on</small>
      </div>
    )
  }

  return (
    <>

      {!userLoading &&
        <TickerSample />  
      }

      {/* {!userLoading &&
        <Banner />  
      } */}

      {!userLoading &&
        <DropdownButton variant='secondary'
              className='dropdown'
              title="Select a country..."
              id="dropdown"
              onSelect={handleSelect}
                  >
                    <Dropdown.Item eventKey='all' Link to = '/earth'>~All~</Dropdown.Item>
                    {
                      countryList.map((name) => {
                        return <Dropdown.Item eventKey={name}>{name}</Dropdown.Item>
                      })
                    }
          </DropdownButton>
      }
      <p></p>
      
      { !userLoading &&
        <CountryTotals countryName={country} 
                       nativeName={countryInfo[0].nativeName} 
        /> 
      }
      <p></p>
      
      { !userLoading &&
        <Today  
          todayCases={countryTotals.todayCases}
          todayDeaths={countryTotals.todayDeaths}
          cases={countryTotals.cases}
          deaths={countryTotals.deaths}
          oneCasePerPeople={countryTotals.oneCasePerPeople}
          oneDeathPerPeople={countryTotals.oneDeathPerPeople}
        /> 
      }
      <p></p>

      { !userLoading && 
          <CountryDailies countryName={country} /> 
      }

      { !userLoading &&
        <Dashboard num={num} />
      }
      <p></p>

      <ScrollUpButton AnimationDuration={100} />

      { !userLoading && <Footer />}
    </>
  );
};

export default Splash;