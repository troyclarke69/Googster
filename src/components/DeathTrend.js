import React from 'react';
import NumberFormat from 'react-number-format';


const DeathTrend = ({ rank, pastVsPreviousWeekDeathsAve, pastVsPreviousWeekDeathsAvePerc }) => {

    // console.log('DeathTrend', pastVsPreviousWeekDeathsAve, pastVsPreviousWeekDeathsAvePerc );

    return (
        <div className="container-fluid">
            <div className="case-trend-container">
                <h4>Daily Death Trend</h4>
                <div className="case-trend">
                    <small>(This Week vs. Last Week)</small>
                </div>
                {               
                    pastVsPreviousWeekDeathsAve > 0 
                    ?
                    <p><i className="fa fa-arrow-up fa-2x"></i></p> 
                    :
                    <p><i className="fa fa-arrow-down fa-2x"></i></p>
                }

                <h6> {' '}
                    <em><NumberFormat 
                        value={pastVsPreviousWeekDeathsAvePerc} 
                        displayType={'text'} thousandSeparator="," 
                        decimalScale="1"
                    />%</em>
                </h6>
            </div>
        </div>
    )
}

export default DeathTrend;
