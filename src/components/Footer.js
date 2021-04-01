import React from 'react';

const Footer = () => {

    return (
        <>
            <div className='container-fluid'>
                <footer className='footer'>
                    <h6>Kudos to the makers of these data sources: <br /> 
                        <a href='https://pomber.github.io/covid19/timeseries.json"'>pomber</a><br />  
                        <a href='https://corona.lmao.ninja'>disease.sh</a><br />
                        <a href='https://geolocation-db.com'>geolocation-db.com</a><br />
                        <a href='https://restcountries.eu'>restcountries.eu</a>
                    </h6>
                </footer>
            </div>
        </>
    )
};

export default Footer;