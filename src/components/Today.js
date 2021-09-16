import React from 'react';
import NumberFormat from 'react-number-format';


const Today = ({ todayCases, todayDeaths, 
                cases, deaths, 
                oneCasePerPeople, oneDeathPerPeople }) => {
                    
    return (
        <>
            <div className="container">
                <div className="row">
                    
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h6 className="card-title">Today's Cases</h6>
                                <h4 className="card-text"><NumberFormat displayType={'text'} thousandSeparator="," value={todayCases} /></h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h6 className="card-title">Today's Deaths</h6>
                                <h4 className="card-text"><NumberFormat displayType={'text'} thousandSeparator="," value={todayDeaths} /></h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h6 className="card-title">Total Cases</h6>
                                <h4 className="card-text"><NumberFormat displayType={'text'} thousandSeparator="," value={cases} /></h4>
                                <p className="card-text">One case per {' '}
                                    <em><NumberFormat displayType={'text'} thousandSeparator="," value={oneCasePerPeople} /></em>
                                    {' '} people
                                    {/* <br />(
                                    <em><NumberFormat displayType={'text'} decimalSeparator="." decimalScale="3"
                                        value={(1/oneCasePerPeople)*100} /></em>% of the population) */}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h6 className="card-title">Total Deaths</h6>
                                <h4 className="card-text"><NumberFormat displayType={'text'} thousandSeparator="," value={deaths} /></h4>

                                {/* <p className="card-text">One death per {' '}
                                    <em><NumberFormat displayType={'text'} thousandSeparator="," value={oneDeathPerPeople} /></em>
                                    {' '} people
                                    <br />(
                                    <em><NumberFormat displayType={'text'} decimalSeparator="." decimalScale="3"
                                        value={(1/oneDeathPerPeople)*100} /></em>% of the population)
                                </p> */}

                                <p className="card-text">One death per {' '}
                                    <em><NumberFormat displayType={'text'} decimalSeparator="." decimalScale="3"
                                        value={deaths / cases} /></em>
                                    {' '}cases{' '}
                                    (
                                    <NumberFormat displayType={'text'} decimalSeparator="." decimalScale="1"
                                        value={deaths / cases * 100} />%)
                                </p>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
            
        </>
    )
}

export default Today;
