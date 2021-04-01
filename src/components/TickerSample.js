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

                    <span style={{ }}>                       
                        <h4 style={{ color: 'navy', letterSpacing: '.5rem', fontSize: '1.2rem'}}>
                            <NumberFormat displayType={'text'} 
                                thousandSeparator="," 
                                value={earth.cases} 
                            /> 
                            <span>
                                {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                                &nbsp;cases
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>

                            <NumberFormat displayType={'text'} 
                                thousandSeparator="," 
                                value={earth.deaths} 
                            /> 
                            <span>
                                {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                                &nbsp;deaths
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>

                        </h4>           
                        
                                  
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

            
                    
                </>
            )}
        </Ticker>
    )
}
 
export default MoveStuffAround;