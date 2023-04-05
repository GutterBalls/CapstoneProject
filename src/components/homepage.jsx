import { useState, useEffect } from "react";

const Homepage = (props) => {
    const { setIsLoggedIn, getProductData } = props;

    useEffect(() => {
        getProductData();
        if (localStorage.getItem("token")) {
            setIsLoggedIn(true)
            // getUserData()
        } else {
            setIsLoggedIn(false)
            console.log("No Token!")
        }
    }, [])

    return (
        <div className="main-container">
            <h1> Welcome to the Gutterball Bowling Superstore! </h1>
            <h3> Please login or create an account above to place an order or feel free to browse our selection of products.</h3>
            <h3> Thank you for your business. </h3>
            
        </div>
    )
}
export default Homepage;