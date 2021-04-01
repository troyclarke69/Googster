import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/api'; 

const Home = () => {
    const user = useContext(UserContext);
    const { getUserGeolocationDetails } = useContext(UserContext);

    useEffect(() => {
        getUserGeolocationDetails();
    },[]);

    return (
        <>
            {/* <NavBar /> */}

            <div className='container-fluid'>
                {/* <h4>This is Home</h4> */}
                
                <h6>Looks like you are from: 
                    {!user.details.userLoading && <p>{user.details.country_name}</p>}
                        {/* {(!user && !!user.details.country_name) ? user.details.country_name : ' Unknown'}} */}
                </h6>

                {/* <Country countryName={user.details.country_name} /> */}

                {/* <Countries /> */}

            </div>

            {/* <Footer /> */}
        </>
    )
};

export default Home;