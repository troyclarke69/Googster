import React, { useContext, useEffect } from 'react';
import { AllContext } from '../context/api'; 
import NumberFormat from 'react-number-format';
import Table from 'react-bootstrap/Table';
import { motion } from 'framer-motion';
import ScrollUpButton from "react-scroll-up-button";

const Countries = () => {
    const countriesData = useContext(AllContext);
    const { getCountries } = useContext(AllContext);
    const countries = countriesData.countries;

    useEffect(() => {
        getCountries();
    }, []);

    // console.log('countries', countries);
    return (
        
        <div className='container-fluid'>       
            <p></p><p></p>
            <h6>Country Totals</h6>
            {/* <table className="table table-hover"> */}

            <Table responsive="sm" striped>
                {/* <thead style={{backgroundColor:'black', color:'white'}}> */}
                <thead>
                    <tr>
                        {/* <th></th> */}
                        <th style={{ textAlign: 'left'}}>Country</th>
                        <th>Cases</th>
                        <th>Deaths</th>
                        {/* <th>Recovered</th> */}
                        <th>Active</th>
                        <th>Critical</th>
                        <th>One Case/pop.</th>
                        <th>One Death/pop.</th>
                        <th>One Test/pop.</th>
                    </tr>
                </thead>
                <tbody>
                    {countries.map((c, index) => {
                        const { country, cases, deaths, recovered, active, critical,
                            oneCasePerPeople, oneDeathPerPeople, oneTestPerPeople } = c;
                        return(
                        <tr >
                            <td style={{ textAlign: 'left'}}>
                                <motion.img src={c.countryInfo.flag} alt={country} 
                                    style={{ width: '50px', height: '34px'}} 
                                    initial={{ x: "100vh" }}
                                    animate={{ x: 0 }}
                                    // Tween, Spring or Inertia.
                                    transition={{ type: "tween", stiffness: 60, duration: 2.5 }}
                                />
                                {'  '}{country}
                                
                            </td>             
                            <td><NumberFormat displayType={'text'} thousandSeparator="," value={cases} /></td>             
                            <td><NumberFormat displayType={'text'} thousandSeparator="," value={deaths} /></td>             
                            {/* <td><NumberFormat displayType={'text'} thousandSeparator="," value={recovered} /></td> */}
                            <td><NumberFormat displayType={'text'} thousandSeparator="," value={active} /></td> 
                            <td><NumberFormat displayType={'text'} thousandSeparator="," value={critical} /></td>             
                            <td><NumberFormat displayType={'text'} thousandSeparator="," value={oneCasePerPeople} /></td>             
                            <td><NumberFormat displayType={'text'} thousandSeparator="," value={oneDeathPerPeople} /></td>             
                            <td><NumberFormat displayType={'text'} thousandSeparator="," value={oneTestPerPeople} /></td>             
                        </tr> )
                    })}
                </tbody>
            </Table>

            <ScrollUpButton AnimationDuration={100} />

        </div>
    )
};

export default Countries;