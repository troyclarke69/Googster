import React from 'react';

const Footer = () => {

    return (
        <>
            <div className='container-fluid'>
                <footer className='footer'>
                    <p className="small-text">* "SURGE": Yesterday's count (ex. 11), less the day before (10), divided by the day before, (equals 1/10 or a 10% "surge")</p>
                    <h6>Kudos to the makers of these data sources: <br /> 
                        <a href='https://pomber.github.io/covid19/timeseries.json'>pomber</a><br />  
                        <a href='https://corona.lmao.ninja'>disease.sh</a><br />
                        <a href='https://geolocation-db.com'>geolocation-db.com</a><br />
                        <a href='https://restcountries.eu'>restcountries.eu</a><br />
                        <a href='https://ourworldindata.org'>ourworldindata.org</a>
                    </h6>
                </footer>
            </div>
        </>
    )
};

export default Footer;