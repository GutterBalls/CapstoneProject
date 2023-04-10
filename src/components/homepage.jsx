import React, { useEffect } from "react";
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
// import Swiper and modules styles
import 'swiper/css';

// import { useState } from "react";

const Homepage = (props) => {
    const swiper = useSwiper();
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

    const handleNextSlide = (swiper) => {
        swiper.slideNext();
    };

    return (
        <section>
            <div className="homePageFlex">
                <div className="hp-text-container">
                    <h1 className="hpt"> Welcome to the Gutterball Bowling Superstore! </h1>
                    <h3 className="hpt"> Please login or create an account above to place an order or feel free to browse our selection of products.</h3>
                    <h3 className="hpt"> Thank you for your business. </h3>
                </div>
            </div>
            <div className="button-container">
                <button onClick={() => handleNextSlide(swiper)} >Slide to the next slide</button>
            </div>
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                <SwiperSlide>
                    <img
                        src="/images/balls/Brunswick-HP-Mindset.png"
                        alt=""
                        style={{ width: '20%' }}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="/images/balls/Brunswick-MP-Attitude.png"
                        alt=""
                        style={{ width: '20%' }}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="/images/balls/Brunswick-HP-Defender.png"
                        alt=""
                        style={{ width: '20%' }}
                    />
                </SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
            </Swiper>
        </section>
    )
}
export default Homepage;

// '/images/balls/Brunswick-HP-Mindset.png' 
// '/images/balls/Brunswick-MP-Attitude.png' 
// '/images/balls/Brunswick-HP-Defender.png' 

// <h5>Original Price: $259</h5>
// <p>Sale Price: $12</p>