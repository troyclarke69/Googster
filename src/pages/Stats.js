import React, { useEffect, useContext } from 'react';
import Footer from '../components/Footer';
import { CountryContext, UserContext, EarthContext } from '../context/api';
import Dashboard from '../components/Dashboard';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Stats = () => {
  const { countryList, getCountryTotals, countryTotals,
          countryTotalsLoading, countryTotalsError,
          getCountryDailies, countryDailiesLoading, countryDailiesError,
          getCountryInfo, countryInfo, countryInfoLoading, countryInfoError,
          getWhosBad, whosBad } = useContext(CountryContext);
  const { getEarth, earth, earthLoading, earthError, 
          getOwid, owid, owidLoading, owidError } = useContext(EarthContext);
  const { getUserGeolocationDetails, country, userDetails, userLoading, userError } = useContext(UserContext);

  let num = 0;

  return (
    <>
      <Dashboard num={num} />
      <Footer />
    </>
  );
};

export default Stats;