import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const DATABASE_URL = 'http://localhost:1337/api';

const Profile = (props) => {
    const { getUserData, userData, isLoggedIn } = props;

    useEffect(() => {
        getUserData();
        // getProductData();
    }, [isLoggedIn]);
    
    console.log(userData);

    return (
        <div className="homepage">
            <p>Profile</p>
            {
                userData.isAdmin === false ? 
                        <div key={userData.id} className="singleProduct">
                            <div className="itemInfoFlex">
                                <h3> Username: {userData.username}</h3>
                            </div>
                        </div>
                : 
                <div>
                    <h1> Admin Page </h1>
                    <h3> Username: {userData.username}</h3>
                    <div>Welcome</div>
                </div>
            }
        </div>
    )
}

export default Profile;