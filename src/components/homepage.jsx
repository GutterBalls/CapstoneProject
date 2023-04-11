// import React from 'react';

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper/core';
import '/node_modules/swiper/swiper.min.css';
import '/node_modules/swiper/modules/navigation/navigation.min.css';
SwiperCore.use([Navigation]);

import { useState, useEffect, useRef } from 'react';

const Homepage = (props) => {
    const swiper = useSwiper();
    const swiperRef = useRef(null);
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

    const handleNextSlide = () => {
        if(swiperRef && swiperRef.current && swiperRef.current.swiper){
            swiperRef.current.swiper.slideNext();
        }    
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
                {/* <button onClick={() => handleNextSlide(swiperRef.current)} >Slide to the next slide</button> */}
                {/* <button onClick={ handleNextSlide } >Slide to the next slide</button> */}
            </div>
            <Swiper
                spaceBetween={10}
                slidesPerView={3}
                slidesPerGroup={3}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                navigation
                className="mySwiper"
                ref={swiperRef}
            >
                <SwiperSlide>
                    <img
                        src="/images/balls/Brunswick-HP-Mindset.png"
                        alt=""
                        style={{ width: '40%' }}
                    />
                    <h3 style={{ textDecoration: 'line-through' }}>Original Price: $184.99</h3>
                    <h3 style={{ color: 'red' }}>Sale Price: $126</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="/images/balls/Brunswick-MP-Attitude.png"
                        alt=""
                        style={{ width: '40%' }}
                    />
                    <h3 style={{ textDecoration: 'line-through' }}>Original Price: $184.98</h3>
                    <h3 style={{ color: 'red' }}>Sale Price: $120</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="/images/balls/Brunswick-HP-Defender.png"
                        alt=""
                        style={{ width: '40%' }}
                    />
                    <h3 style={{ textDecoration: 'line-through' }}>Original Price: $139.97</h3>
                    <h3 style={{ color: 'red' }}>Sale Price: $112</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="/images/bags/brunswick-tzone-1-tote-lime.jpg"
                        alt=""
                        style={{ width: '40%' }}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="/images/bags/brunswick-edge-1-wht.jpg"
                        alt=""
                        style={{ width: '40%' }}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="/images/bags/brunswick-quest-2-blkblu.jpg"
                        alt=""
                        style={{ width: '40%' }}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="/images/shoes/dexter-c9-m.jpg"
                        alt=""
                        style={{ width: '40%' }}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="/images/shoes/dexter-groovy-w.jpg"
                        alt=""
                        style={{ width: '40%' }}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="/images/shoes/dexter-harper-w.jpg"
                        alt=""
                        style={{ width: '40%' }}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="/images/accessories/genesis-excel-bowling-tape.jpg"
                        alt=""
                        style={{ width: '40%' }}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="/images/accessories/genesis-sync-bowling-tape.jpg"
                        alt=""
                        style={{ width: '40%' }}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="/images/accessories/kr-strikeforce-pure_energy-ball-cleaner.jpg"
                        alt=""
                        style={{ width: '40%' }}
                    />
                </SwiperSlide>
            </Swiper>
            <style>{`
                .button-container{
                    display: flex;
                    justify-content: center;                   
                }
                .button-container button{
                    font-size: 16;                   
                }
            `}</style>
        </section>
    )
}
export default Homepage;

// '/images/balls/Brunswick-HP-Mindset.png' 
// '/images/balls/Brunswick-MP-Attitude.png' 
// '/images/balls/Brunswick-HP-Defender.png' 

// <h3>Original Price: $259</h3>
// <h3>Sale Price: $12</h3>