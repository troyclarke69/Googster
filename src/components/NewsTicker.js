import React from 'react'
import Ticker from 'react-ticker'
 
const NewsTicker = ({ feed }) => (
    <Ticker>
        {feed}
    </Ticker>
    // <Ticker>
    //     {({ index }) => (
    //         <>
    //             {feed}
    //         </>
    //     )}
    // </Ticker>
)
 
export default NewsTicker;