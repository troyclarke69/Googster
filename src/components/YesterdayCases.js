import React, { useContext } from 'react';
import { CountryContext } from '../context/api';
import NumberFormat from 'react-number-format';

const YesterdayCases = () => {
    const { yesterdayCases, 
            yesterdayDeaths } = useContext(CountryContext);
    // console.log(yesterdayCases);

    return (
        <>
            <div className='yesterday-cases-container'>

                <h5>Most Cases Yesterday</h5>
                <ul className='yesterday-cases'>
                {
                    yesterdayCases.map( (country, index) => {
                        return (<>
                            <li><small>{index+1}</small>
                                <strong style={{color: 'red'}}>
                                    {country[0]}
                                </strong>
                                <em><NumberFormat 
                                    value={country[1]} 
                                    displayType={'text'} thousandSeparator="," 
                                /></em>
                            </li>
                        </>)
                    })
                }
                </ul>
            </div>

            <div className='yesterday-cases-container'>

                <h5>Most Deaths Yesterday</h5>
                <ul className='yesterday-cases'>
                {
                    yesterdayDeaths.map( (country, index) => {
                        return (<>
                            <li><small>{index+1}</small>
                                <strong style={{color: 'red'}}>
                                    {country[0]}
                                </strong>
                                <em><NumberFormat 
                                    value={country[1]} 
                                    displayType={'text'} thousandSeparator="," 
                                /></em>
                            </li>
                        </>)
                    })
                }
                </ul>
            </div>
        </>
    )
}

export default YesterdayCases
