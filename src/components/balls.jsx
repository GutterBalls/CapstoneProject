import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const DATABASE_URL = 'http://localhost:1337/api';

const Balls = (props) => {
    
   
    useEffect(() => {
        props.getProductData();
    }, []);
    
    

    return (
        <div className="homepage">
            <p>Balls</p> 
            
            {
                props.productData.length ? props.productData.filter((singleBall) => singleBall.category_id === 1).map((singleProduct) => {
                    
                    return (
                        <div key={singleProduct.id} className="singleProduct">
                            <Link to={`/single/${singleProduct.id}`}><img src={singleProduct.image} className="singleProductImage"/></Link>
                            <div className="itemInfoFlex">
                                <h3> Brand: {singleProduct.brand}</h3>
                                <h3> Name: {singleProduct.name}</h3> 
                                <h4> Price: ${singleProduct.price}</h4>
                                <button> Add to Cart </button> 
                            </div>
                        </div>
                        
                    )
                    
                }) : <h1> No data loaded. </h1>
            }
        </div>
    )
}

export default Balls;