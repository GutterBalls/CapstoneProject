import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBBtn } from 'mdb-react-ui-kit';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper/core';
import '/node_modules/swiper/swiper.min.css';
import '/node_modules/swiper/modules/navigation/navigation.min.css';
SwiperCore.use([Navigation]);

import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

const Homepage = (props) => {
    const swiper = useSwiper();
    const swiperRef = useRef(null);
    const { setIsLoggedIn, getProductData, productData } = props;

    const [currentPage, setCurrentPage] = useState(0);
    const [specials, setSpecials] = useState("Sale");

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

// Filter Balls (Sale & Clearance)   
    const filteredBallsSale = productData.filter((singleProduct) => {
        if (specials === "Sale" && singleProduct.sale === false) {
            return false;
        }
        if (specials === "Clearance" && singleProduct.clearance === false) {
                    return false;
                }
        return singleProduct.category_id === 1        
        // return true
    });

// Filter Bags (Sale & Clearance)   
    const filteredBagsSale = productData.filter((singleProduct) => {
        if (specials === "Sale" && singleProduct.sale === false) {
            return false;
        }
        if (specials === "Clearance" && singleProduct.clearance === false) {
                    return false;
                }
        return singleProduct.category_id === 2        
        // return true
    });

// Filter Shoes (Sale & Clearance)   
    const filteredShoesSale = productData.filter((singleProduct) => {
        if (specials === "Sale" && singleProduct.sale === false) {
            return false;
        }
        if (specials === "Clearance" && singleProduct.clearance === false) {
                    return false;
                }
        return singleProduct.category_id === 3        
        // return true
    });

// Filter Accessories (Sale & Clearance)   
    const filteredAccessoriesSale = productData.filter((singleProduct) => {
        if (specials === "Sale" && singleProduct.sale === false) {
            return false;
        }
        if (specials === "Clearance" && singleProduct.clearance === false) {
                    return false;
                }
        return singleProduct.category_id === 4        
        // return true
    });

    return (
        <section>
            {/* <div className="homePageFlex">
                <div className="hp-text-container">
                    <h1 className="hpt"> Welcome to the Gutterball Bowling Superstore! </h1>
                    <h3 className="hpt"> Please login or create an account above to place an order or feel free to browse our selection of products.</h3>
                    <h3 className="hpt"> Thank you for your business. </h3>
                </div>
            </div> */}
            <aside className="main-left">    
                <ul className="filter">
                    <li className="filter-item">
                        <MDBDropdown dropright group>
                            <MDBDropdownToggle 
                            style={{backgroundColor: "rgb(188,0,0)", width: "115px"}} 
                            onClick={() => {
                                // setSpecials(0)
                                setCurrentPage(0)
                            }}>Specials</MDBDropdownToggle>
                            <MDBDropdownMenu>
                                <MDBDropdownItem onClick={() => {setSpecials("Sale") , setCurrentPage(0)}} link="true">Sale</MDBDropdownItem>
                                <MDBDropdownItem onClick={() => {setSpecials("Clearance"), setCurrentPage(0)}} link="true">Clearance</MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </li>
                </ul>
            </aside>
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
// Map Balls (Sale & Clearance)              
            <div className="main-right">
                {
                    productData.length ? filteredBallsSale.map((singleProduct) => {
                        return (
                            <div key={singleProduct.id} /* className="main-singleProduct" */>
                                
                                    <SwiperSlide>
                                        <Link to={`/single/${singleProduct.id}`}><img src={singleProduct.image} style={{ width: '80%', color: 'black' }}/* className="singleProductImage" *//></Link>
                                        <div style={{ color: 'black' }} /* className="itemInfoFlex" */>
                                            <h4>{singleProduct.brand}</h4>
                                            <h5>{singleProduct.name}</h5> 
                                            <h6 style={{ textDecoration: 'line-through' }}>${(singleProduct.price + (singleProduct.price * .3)).toFixed(2)}</h6>
                                        </div>
                                        <h3 style={{ color: 'red' }}>Sale Price: ${singleProduct.price}</h3>
                                    </SwiperSlide>                                  
                            </div>
                        )
                    }) : ""
                }
            </div>
// Map Bags (Sale & Clearance)   
            <div className="main-right">
                {
                    productData.length ? filteredBagsSale.map((singleProduct) => {
                        return (
                            <div key={singleProduct.id} /* className="main-singleProduct" */>
                                
                                    <SwiperSlide>
                                        <Link to={`/single/${singleProduct.id}`}><img src={singleProduct.image} style={{ width: '80%', color: 'black' }}/* className="singleProductImage" *//></Link>
                                        <div style={{ color: 'black' }} /* className="itemInfoFlex" */>
                                            <h4>{singleProduct.brand}</h4>
                                            <h5>{singleProduct.name}</h5> 
                                            <h6 style={{ textDecoration: 'line-through' }}>${singleProduct.price}</h6>
                                        </div>
                                        <h3 style={{ color: 'red' }}>Sale Price: ${((singleProduct.price - (singleProduct.price * .3))).toFixed(2)}</h3>
                                    </SwiperSlide>                                  
                            </div>
                        )
                    }) : ""
                }
            </div>
// Map Shoes (Sale & Clearance)   
            <div className="main-right">
                {
                    productData.length ? filteredShoesSale.map((singleProduct) => {
                        return (
                            <div key={singleProduct.id} /* className="main-singleProduct" */>
                                
                                    <SwiperSlide>
                                        <Link to={`/single/${singleProduct.id}`}><img src={singleProduct.image} style={{ width: '80%', color: 'black' }}/* className="singleProductImage" *//></Link>
                                        <div style={{ color: 'black' }} /* className="itemInfoFlex" */>
                                            <h4>{singleProduct.brand}</h4>
                                            <h5>{singleProduct.name}</h5> 
                                            <h6 style={{ textDecoration: 'line-through' }}>${singleProduct.price}</h6>
                                        </div>
                                        <h3 style={{ color: 'red' }}>Sale Price: ${(singleProduct.price - (singleProduct.price * .3)).toFixed(2)}</h3>
                                    </SwiperSlide>                                  
                            </div>
                        )
                    }) : ""
                }
            </div>
// Map Accessories (Sale & Clearance)
            <div className="main-right">
                {
                    productData.length ? filteredAccessoriesSale.map((singleProduct) => {
                        return (
                            <div key={singleProduct.id} /* className="main-singleProduct" */>
                                
                                    <SwiperSlide>
                                        <Link to={`/single/${singleProduct.id}`}><img src={singleProduct.image} style={{ width: '80%', color: 'black' }}/* className="singleProductImage" *//></Link>
                                        <div style={{ color: 'black' }} /* className="itemInfoFlex" */>
                                            <h4>{singleProduct.brand}</h4>
                                            <h5>{singleProduct.name}</h5> 
                                            <h6 style={{ textDecoration: 'line-through' }}>${singleProduct.price}</h6>
                                        </div>
                                        <h3 style={{ color: 'red' }}>Sale Price: ${(singleProduct.price - (singleProduct.price * .3)).toFixed(2)}</h3>
                                    </SwiperSlide>                                  
                            </div>
                        )
                    }) : ""
                }
            </div>
            </Swiper> 
        </section>
    )
}
export default Homepage;