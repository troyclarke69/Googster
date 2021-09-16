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

    // console.log('GeoLocation', details);

};

export default GeoLocation;