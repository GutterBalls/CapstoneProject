import React from "react";
import {
    MDBCarousel,
    MDBCarouselItem
} from "mdb-react-ui-kit";

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
            {/* <div className="homePageFlex">
                <div className="hp-text-container">
                    <h1 className="hpt"> Welcome to the Gutterball Bowling Superstore! </h1>
                    <h3 className="hpt"> Please login or create an account above to place an order or feel free to browse our selection of products.</h3>
                    <h3 className="hpt"> Thank you for your business. </h3>
                </div>
            </div> */}
            {/* <div> */}
                <MDBCarousel showIndicators showControls fade className="homePageFlex">
                    <MDBCarouselItem 
                    // className="carousel-item active" id="carousel-item-1"
                        className='w-30 d-block'
                        itemId={1}
                        src='/images/balls/Brunswick-HP-Defender.png' 
                        style={{ width: "20%", height: "20%", textAlign: "center"}}
                        alt=''
                    >
                        <h5>Original Price: $159</h5>
                        <p>Sale Price: $24</p>
                    </MDBCarouselItem>
                    <MDBCarouselItem 
                    // class="carousel-item" id="carousel-item-2"
                        className='w-30 d-block'
                        itemId={2}
                        src='/images/balls/Brunswick-HP-Mindset.png' 
                        style={{ width: "20%", height: '20%', textAlign: "center"}}
                        alt=''
                    >
                        <h5>Original Price: $1,159</h5>
                        <p>Sale Price: $69</p>
                    </MDBCarouselItem>
                    <MDBCarouselItem 
                    // class="carousel-item" id="carousel-item-3"
                        className='w-30 d-block'
                        itemId={3}
                        src='/images/balls/Brunswick-MP-Attitude.png' 
                        style={{ width: "20%", height: "20%", textAlign: "center" }}
                        alt=''
                    >
                        <h5>Original Price: $259</h5>
                        <p>Sale Price: $12</p>
                    </MDBCarouselItem>
                </MDBCarousel>
            {/* </div>            */}
        </section>
    )
}
export default Homepage;