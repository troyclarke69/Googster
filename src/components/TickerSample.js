import React, { useContext } from 'react';
import Ticker from 'react-ticker';
import { EarthContext } from '../context/api';
import NumberFormat from 'react-number-format';

const MoveStuffAround = () => {

    const { getEarth, earth, earthLoading, earthError } = useContext(EarthContext);
    // console.log(earth);

    return (

        <Ticker>
            {({ index }) => (
                <>
                    {/* <h4
                        style={{color: 'blue'}}>
                            Did you get your Polio vaccine? How 'bout tetanus? &nbsp;
                    </h4>
                    
                    <br />
                    Do you wear a seatbelt? Do you put on a coat when it's cold?<br /> */}
                    <div className="container-fluid">
                    <span>  
                        
                        <p style={{ fontFamily: 'sans-serif', color: 'navy', letterSpacing: '.25rem', fontSize: '1.2rem', fontWeight: '800'}}>

                            {/* Planet Earth Stats: */}

                            <NumberFormat displayType={'text'} 
                                thousandSeparator="," 
                                value={earth.todayCases} 
                            /> 
                            <span>
                                {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                                &nbsp;New Cases in the World Today
                                {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                                &nbsp;&nbsp;
                            </span>

                            <br />

                            <NumberFormat displayType={'text'} 
                                thousandSeparator=","
                                value={earth.todayDeaths} 
                            /> 
                            <span>
                                {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                                &nbsp;Deaths in the World Today
                                {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                            </span>

                            {/* <br /> */}

                            {/* <NumberFormat displayType={'text'} 
                                displayType={'text'} thousandSeparator="," 
                                decimalScale="2"
                                value={(earth.todayDeaths / earth.todayCases) * 100}
                            /> */}

                            {/* <span style={{ fontFamily: 'sans-serif', color: 'red', letterSpacing: '-.05rem', fontSize: '1rem', fontWeight: '800'}}>
                                &nbsp;% chance you might die if you get covid
                            </span>   */}

                            {/* <NumberFormat displayType={'text'} 
                                thousandSeparator="," 
                                value={earth.cases} 
                            />  */}
                            {/* <span>
                                &nbsp;&nbsp;
                                &nbsp;Total Cases
                                &nbsp;&nbsp;
                            </span> */}

                            {/* <NumberFormat displayType={'text'} 
                                thousandSeparator="," 
                                value={earth.deaths} 
                            />  */}
                            {/* <span>
                                &nbsp;Total Deaths
                                &nbsp;&nbsp;
                            </span> */}
                            
                            <br />
                            
                            {/* <span style={{ fontFamily: 'sans-serif', color: 'green', letterSpacing: '.1rem', fontSize: '1rem', fontWeight: '600'}}
                                >If you are an anti-vaxxer and/or anti-masker, then you're a Dumbass.
                            </span> */}

                        </p>           
                        
                                  
                    </span>

                    {/* <span style={{ color: 'red'}}>
                        World Deaths                        
                        <h4 style={{ color: 'blue'}}>
                            <NumberFormat displayType={'text'} 
                                thousandSeparator="," 
                                value={earth.deaths} 
                            />  <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        </h4>                     
                    </span> */}

            
                    </div>  
                </>
            )}
        </Ticker>
    )
}
 
export default MoveStuffAround;