import React from 'react';
import NumberFormat from 'react-number-format';

const CountryVacs = ({  location, 
                        new_cases, 
                        people_fully_vaccinated, people_fully_vaccinated_per_hundred,
                        people_vaccinated, 
                        people_vaccinated_per_hundred,
                        new_vaccinations }) => {

    // if (people_fully_vaccinated === undefined) people_fully_vaccinated = 0;
    // if (people_fully_vaccinated_per_hundred === undefined) people_fully_vaccinated_per_hundred = 0;
    // if (people_vaccinated === undefined) people_vaccinated = 0;
    // if (people_vaccinated_per_hundred === undefined) people_vaccinated_per_hundred = 0;

    return (
        <>
           <div className="container">
           <div className="row">
                    <div className="col-sm-12">
                        <div className="card-vaccinations-yesterday">
                            <div className="card-vaccinations-body">
                                <h6 style={{ color: '#0f0f0f' }} className="card-title">Vaccinated Yesterday</h6>
                                { 
                                    new_vaccinations !== undefined ? 
                                    <>
                                        
                                        <h5 className="">
                                            <em><NumberFormat  style={{ color: '#203040', fontWeight: 600 }} displayType={'text'}        displayType={'text'} thousandSeparator=","
                                                value={new_vaccinations} /></em>
                                        </h5>
                                       
                                </> : <><small>No Data Available at the moment</small></>}
                                
                            </div>
                        </div>
                    </div>
                </div> 

                <div className="row">
                    <div className="col-sm-6">
                        <div className="card-vaccinations">
                            <div className="card-vaccinations-body">
                                <h6 style={{ color: '#f8f8f8' }} className="card-title">Vaccinated</h6>
                                { 
                                    people_vaccinated !== undefined ? 
                                    <>
                                        
                                        <h4 className="card-vaccinations-text">
                                            <NumberFormat  style={{ color: '#e6e6e6' }} displayType={'text'}        decimalSeparator="." decimalScale="2"
                                                value={people_vaccinated_per_hundred} />%
                                        </h4>
                                        <p className="card-vaccinations-text-p">
                                            <em>(<NumberFormat
                                                displayType={'text'} thousandSeparator="," value={people_vaccinated} />)</em>
                                        </p>
                                </> : <><small>No Data Available at the moment</small></>}
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card-vaccinations">
                            <div className="card-vaccinations-body">
                                <h6  style={{ color: '#f8f8f8' }} className="card-title">Fully Vaccinated</h6>
                                { 
                                    people_fully_vaccinated !== undefined ? <>
                                        
                                        <h4 className="card-vaccinations-text"><NumberFormat  style={{ color: '#e6e6e6' }} displayType={'text'} decimalSeparator="." decimalScale="2"
                                                value={people_fully_vaccinated_per_hundred} />%</h4>
                                        <p className="card-vaccinations-text-p">
                                            <em>(<NumberFormat displayType={'text'} thousandSeparator="," value={people_fully_vaccinated} />)</em>
                                        </p>
                                </> : <><small>No Data Available at the moment</small></>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CountryVacs;
