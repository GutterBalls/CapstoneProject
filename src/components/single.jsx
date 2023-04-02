import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
const DATABASE_URL = 'http://localhost:1337/api';

const Single = (props) => {
    const [singleProduct, setSingleProduct] = useState([]);
    const { id } = useParams();
    console.log("UseParams", useParams())
    useEffect(() => {
        getProductById();
        
    }, [useParams()]);
    
    async function getProductById () {
        try {
            const response = await fetch(`${DATABASE_URL}/products/${id}`)
            const translatedData = await response.json();
            console.log("Single product", translatedData)
            setSingleProduct(translatedData)
            return singleProduct
        } catch (error) {
            throw error;
        };
    };

    

    return (
        <div className="homepage">
            <p>1 - Single Item View</p>
            {
                singleProduct  ?
                <div id="singlePageFlex">
                    <img src={singleProduct.image} id="singlePageImage"/>
                    <h1> {singleProduct.brand} </h1>
                    <h2> {singleProduct.name} </h2>
                    <h3> Description: {singleProduct.description} </h3>
                    <button> Add to Cart</button>
                </div> : <p> no single product data </p>
                
            }
            
        </div>
    )
}

export default Single;