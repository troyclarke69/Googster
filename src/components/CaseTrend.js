import React from 'react';
import NumberFormat from 'react-number-format';


const CaseTrend = ({ rank, pastVsPreviousWeekCasesAve, pastVsPreviousWeekCasesAvePerc }) => {
    return (
        <>
            <div className="case-trend-container">
                <h4>Daily Case Trend</h4>
                <div className="case-trend">
                    <small>(This Week vs. Last Week)</small>
                </div>
                {               
                    pastVsPreviousWeekCasesAve > 0 
                    ?
                    <p><i className="fa fa-arrow-up fa-2x"></i></p> 
                    :
                    <p><i className="fa fa-arrow-down fa-2x"></i></p>
                }

                <h6> {' '}
                    <em><NumberFormat 
                        value={pastVsPreviousWeekCasesAvePerc} 
                        displayType={'text'} thousandSeparator="," 
                        decimalScale="1"
                    />%</em>
                </h6>
            </div>
        </>
    )
}

export default CaseTrend;
