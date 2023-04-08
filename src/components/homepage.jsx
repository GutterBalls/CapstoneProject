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
        <section>
            <div className="homePageFlex">
                <div className="hp-text-container">
                    <h1 className="hpt"> Welcome to the Gutterball Bowling Superstore! </h1>
                    <h3 className="hpt"> Please login or create an account above to place an order or feel free to browse our selection of products.</h3>
                    <h3 className="hpt"> Thank you for your business. </h3>
                </div>
            </div>           
        </section>
    )
}
export default Homepage;