import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const DATABASE_URL = 'http://localhost:1337/api';

const Balls = (props) => {
    
    const nav = useNavigate();
    useEffect(() => {
        props.getProductData();
    }, []);
    
    

    return (
        <div className="homepage">
            <p>Bowling Balls</p>
            {
                props.productData.length && props.productData.category_id === 1 ? props.productData.map((singleProduct) => {
                    return (
                        <div key={singleProduct.id}>
                            <img src={singleProduct.image}/>
                            <h3> Brand: {singleProduct.brand}</h3>
                            <h3> Ball Name: {singleProduct.name}</h3> 
                            <h4> Description: {singleProduct.description}</h4>
                            <span> Price: ${singleProduct.price}</span>
                        </div>
                    )
                }) : <h1> No data loaded. </h1>
            }  
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
            <p>12</p>
            <p>13</p>
        </div>
    )
}

export default Balls;