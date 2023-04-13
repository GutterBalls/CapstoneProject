import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem} from 'mdb-react-ui-kit';
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

// Filter Balls (Sale)   
    const filteredBallsSale = productData.filter((singleProduct) => {
        if (specials === "Sale" && singleProduct.sale === false) {
            return false;
        }
        return singleProduct.category_id === 1        
    });

// Filter Balls (Clearance)   
    const filteredBallsClearance = productData.filter((singleProduct) => {
        if (specials === "Clearance" && singleProduct.clearance === false) {
            return false;
        }
        return singleProduct.category_id === 1        
    });

// Filter Bags (Sale)   
    const filteredBagsSale = productData.filter((singleProduct) => {
        if (specials === "Sale" && singleProduct.sale === false) {
            return false;
        }
        return singleProduct.category_id === 2        
    });

// Filter Bags (Clearance)   
    const filteredBagsClearance = productData.filter((singleProduct) => {
        if (specials === "Clearance" && singleProduct.clearance === false) {
            return false;
        }
        return singleProduct.category_id === 2        
    });

// Filter Shoes (Sale)   
    const filteredShoesSale = productData.filter((singleProduct) => {
        if (specials === "Sale" && singleProduct.sale === false) {
            return false;
        }
        return singleProduct.category_id === 3        
    });

// Filter Shoes (Clearance)   
    const filteredShoesClearance = productData.filter((singleProduct) => {
        if (specials === "Clearance" && singleProduct.clearance === false) {
            return false;
        }
        return singleProduct.category_id === 3        
    });

// Filter Accessories (Sale)   
    const filteredAccessoriesSale = productData.filter((singleProduct) => {
        if (specials === "Sale" && singleProduct.sale === false) {
            return false;
        }
        if (specials === "Clearance" && singleProduct.clearance === false) {
            return false;
        }
        return singleProduct.category_id === 4        
    });

// Filter Accessories (Clearance)   
    const filteredAccessoriesClearance = productData.filter((singleProduct) => {
        if (specials === "Clearance" && singleProduct.clearance === false) {
            return false;
        }
        return singleProduct.category_id === 4        
    });

    return (
        <section>
            <div className='hp-container'>
{/* Filter (Specials)*/}                
                <aside className='hp-left'>
                    <ul className="filter"> 
                        <li className="filter-item">
                            <MDBDropdown dropright group>
                                <MDBDropdownToggle 
                                style={{backgroundColor: "rgb(188,0,0)", width: "115px"}} 
                                onClick={() => {
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
                <div className='hp-right'>
                    <div className="swiper-container">
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
{/* Map Balls (Sale)   */}            
                        <div className="main-right">
                            {
                                specials === "Sale" ? filteredBallsSale.map((singleProduct) => {
                                    return (
                                        <div key={singleProduct.id}>
                                            <SwiperSlide className='swiper-slide'>
                                                <Link to={`/single/${singleProduct.id}`}>
                                                    <img className='swiper-pic' 
                                                        src={singleProduct.image}
                                                    />
                                                </Link>
                                                <div className='swiper-slide'>
                                                    <h4>{singleProduct.brand}</h4>
                                                    <h5>{singleProduct.name}</h5> 
                                                    <h5 style={{ textDecoration: 'line-through' }}>${(singleProduct.price + (singleProduct.price * .15)).toFixed(2)}</h5>
                                                </div>
                                                <h4 style={{ color: 'red' }}>Sale Price: ${singleProduct.price}</h4>
                                            </SwiperSlide>                                  
                                        </div>
                                    )
                                }) :
/* Map Balls (Clearance)  */
                                <div className="main-right">
                                    {
                                        specials === "Clearance" ? filteredBallsClearance.map((singleProduct) => {
                                            return (
                                                <div key={singleProduct.id}>
                                                    <SwiperSlide className='swiper-slide'>
                                                        <Link to={`/single/${singleProduct.id}`}>
                                                            <img className='swiper-pic' 
                                                                src={singleProduct.image}
                                                            />
                                                        </Link>
                                                        <div className='swiper-slide'>
                                                            <h4  style={{ color: 'white' }}>{singleProduct.brand}</h4>
                                                            <h5>{singleProduct.name}</h5> 
                                                            <h6 style={{ textDecoration: 'line-through' }}>${(singleProduct.price + (singleProduct.price * .30)).toFixed(2)}</h6>
                                                        </div>
                                                        <h3 style={{ color: 'red' }}>Sale Price: ${singleProduct.price}</h3>
                                                    </SwiperSlide>                                  
                                                </div>
                                            )
                                        }) : ""
                                    }
                                </div>
                            }
                        </div>
{/* Map Bags (Sale) */}   
                        <div className="main-right">
                            {
                                specials === "Sale" ? filteredBagsSale.map((singleProduct) => {
                                    return (
                                        <div key={singleProduct.id}>
                                            <SwiperSlide>
                                                <Link to={`/single/${singleProduct.id}`}>
                                                    <img 
                                                        src={singleProduct.image} 
                                                        style={{ width: '80%', color: 'black' }}
                                                    />
                                                </Link>
                                                <div style={{ color: 'black' }}>
                                                    <h4>{singleProduct.brand}</h4>
                                                    <h5>{singleProduct.name}</h5> 
                                                    <h6 style={{ textDecoration: 'line-through' }}>${(singleProduct.price + (singleProduct.price * .15)).toFixed(2)}</h6>
                                                </div>
                                                <h3 style={{ color: 'red' }}>Sale Price: ${singleProduct.price}</h3>
                                            </SwiperSlide>                                  
                                        </div>
                                    )
                                }) : 
/* Map Bags (Clearance) */
                                <div className="main-right">
                                    {
                                        specials === "Clearance" ? filteredBagsClearance.map((singleProduct) => {
                                            return (
                                                <div key={singleProduct.id}>
                                                    <SwiperSlide>
                                                        <Link to={`/single/${singleProduct.id}`}>
                                                            <img 
                                                                src={singleProduct.image} 
                                                                style={{ width: '80%', color: 'black' }}
                                                            />
                                                        </Link>
                                                        <div style={{ color: 'black' }}>
                                                            <h4>{singleProduct.brand}</h4>
                                                            <h5>{singleProduct.name}</h5> 
                                                            <h6 style={{ textDecoration: 'line-through' }}>${(singleProduct.price + (singleProduct.price * .30)).toFixed(2)}</h6>
                                                        </div>
                                                        <h3 style={{ color: 'red' }}>Sale Price: ${singleProduct.price}</h3>
                                                    </SwiperSlide>                                  
                                                </div>
                                            )
                                        }) : ""
                                    }
                                </div>
                            }
                        </div>
{/* Map Shoes (Sale) */}   
                        <div className="main-right">
                            {
                                specials === "Sale" ? filteredShoesSale.map((singleProduct) => {
                                    return (
                                        <div key={singleProduct.id}>
                                                <SwiperSlide>
                                                    <Link to={`/single/${singleProduct.id}`}>
                                                        <img 
                                                            src={singleProduct.image} 
                                                            style={{ width: '80%', color: 'black' }}
                                                        />
                                                    </Link>
                                                    <div style={{ color: 'black' }}>
                                                        <h4>{singleProduct.brand}</h4>
                                                        <h5>{singleProduct.name}</h5> 
                                                        <h6 style={{ textDecoration: 'line-through' }}>${(singleProduct.price + (singleProduct.price * .15)).toFixed(2)}</h6>
                                                    </div>
                                                    <h3 style={{ color: 'red' }}>Sale Price: ${singleProduct.price}</h3>
                                                </SwiperSlide>                                  
                                        </div>
                                    )
                                }) :
/* Map Shoes (Clearance) */   
                                <div className="main-right">
                                    {
                                        specials === "Clearance" ? filteredShoesClearance.map((singleProduct) => {
                                            return (
                                                <div key={singleProduct.id}>
                                                        <SwiperSlide>
                                                            <Link to={`/single/${singleProduct.id}`}>
                                                                <img 
                                                                    src={singleProduct.image} 
                                                                    style={{ width: '80%', color: 'black' }}
                                                                />
                                                            </Link>
                                                            <div style={{ color: 'black' }}>
                                                                <h4>{singleProduct.brand}</h4>
                                                                <h5>{singleProduct.name}</h5> 
                                                                <h6 style={{ textDecoration: 'line-through' }}>${(singleProduct.price + (singleProduct.price * .30)).toFixed(2)}</h6>
                                                            </div>
                                                            <h3 style={{ color: 'red' }}>Sale Price: ${(singleProduct.price - (singleProduct.price * .3)).toFixed(2)}</h3>
                                                        </SwiperSlide>                                  
                                                </div>
                                            )
                                        }) : ""
                                    }
                                </div>
                            }
                        </div>
{/* Map Accessories (Sale) */}
                        <div className="main-right">
                            {
                                specials === "Sale" ? filteredAccessoriesSale.map((singleProduct) => {
                                    return (
                                        <div key={singleProduct.id}>
                                            <SwiperSlide>
                                                <Link to={`/single/${singleProduct.id}`}>
                                                    <img 
                                                        src={singleProduct.image} 
                                                        style={{ width: '80%', color: 'black' }}
                                                    />
                                                </Link>
                                                <div style={{ color: 'black' }}>
                                                    <h4>{singleProduct.brand}</h4>
                                                    <h5>{singleProduct.name}</h5> 
                                                    <h6 style={{ textDecoration: 'line-through' }}>${(singleProduct.price + (singleProduct.price * .15)).toFixed(2)}</h6>
                                                </div>
                                                <h3 style={{ color: 'red' }}>Sale Price: ${singleProduct.price}</h3>
                                            </SwiperSlide>                                  
                                        </div>
                                    )
                                }) : 
/* Map Accessories (Clearance) */
                                <div className="main-right">
                                    {
                                        specials === "Clearance" ? filteredAccessoriesClearance.map((singleProduct) => {
                                            return (
                                                <div key={singleProduct.id}>
                                                    <SwiperSlide>
                                                        <Link to={`/single/${singleProduct.id}`}>
                                                            <img 
                                                                src={singleProduct.image} 
                                                                style={{ width: '80%', color: 'black' }}
                                                            />
                                                        </Link>
                                                        <div style={{ color: 'black' }}>
                                                            <h4>{singleProduct.brand}</h4>
                                                            <h5>{singleProduct.name}</h5> 
                                                            <h6 style={{ textDecoration: 'line-through' }}>${(singleProduct.price + (singleProduct.price * .30)).toFixed(2)}</h6>
                                                        </div>
                                                        <h3 style={{ color: 'red' }}>Sale Price: ${singleProduct.price}</h3>
                                                    </SwiperSlide>                                  
                                                </div>
                                            )
                                        }) : ""
                                    }
                                </div>
                            }
                        </div>
                        </Swiper> 
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Homepage;









