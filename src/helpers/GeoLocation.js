import React, { useState, useEffect } from "react";

/*
    "country_code":"US",
    "country_name":"United States",
    "city":"Minneapolis",
    "postal":55455,
    "latitude":44.9733,
    "longitude":-93.2323,
    "IPv4":"126.101.76.251",
    "state":"Minnesota"
*/

const GeoLocation = () => {
    const [details, setDetails] = useState();
    
    const getUserGeolocationDetails = async () => {
        await fetch(
            "https://geolocation-db.com/json/8f12b5f0-2bc2-11eb-9444-076679b7aeb0"
        )
            .then(response => response.json())
            .then(data => setDetails(data));
    };

    useEffect(() => {
        getUserGeolocationDetails();
    });

    console.log('GeoLocation', details);

};

export default GeoLocation;

    // return (
    //     <>
    //         <div className="row">
    //             <div className="col text-center">
    //                 <h2>Find my IP and Location</h2>
    //                 <p className="mt-3">
    //                     <button
    //                         className="btn btn-primary"
    //                         onClick={getUserGeolocationDetails}
    //                     >
    //                         Find my details
    //                     </button>

    //                     <div className="row justify-content-center mt-3">
    //                         <div className="col-lg-6 text-center text-dark">
    //                             {details && (
    //                                 <ul className="list-group">
    //                                     <li className="list-group-item">
    //                                         Location :{" "}
    //                                         {`${details.city}, 
    //                                         ${details.state}{" "} 
    //                                         ${details.country_name}
    //                                         (${details.country_code})`}
    //                                     </li>
    //                                     <li className="list-group-item">
    //                                         IP: {details.IPv4}
    //                                     </li>
    //                                 </ul>
    //                             )}
    //                         </div>
    //                     </div>
    //                 </p>
    //             </div>
    //         </div>
    //     </>
    // );
// };

// export default GeoLocation;