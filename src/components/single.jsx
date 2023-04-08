import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const DATABASE_URL = 'http://localhost:1337/api';

const Single = (props) => {
    const [singleProduct, setSingleProduct] = useState([]);
    const { id } = useParams();
    const nav = useNavigate();
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

    async function addItemToCart (event) {
        // console.log("SingleItem LINE 27 orderID", props.orderData[0].id);
        // console.log("SingleItem LINE 28 evt", event.target.value[0])
        try {
            const specificItem = props.productData.filter((item) => item.id === parseInt(event.target.value));
            const falseOrder = props.orderData.filter((order) => order.order_status === false);
            const response = await fetch(`${DATABASE_URL}/cartItems`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: props.userData.id,
                    order_id: falseOrder[0].id, 
                    product_id: parseInt(event.target.value),
                    qty: 1,
                    price: specificItem[0].price
                })
            })
            const translatedData = await response.json()

            console.log("Balls LINE 45", translatedData);

        } catch (error) {
            console.log("Error w/ balls/addItemToCart", error);
        }
    }
    

    return (
        <div>
            {
                singleProduct  ?
                <div id="singlePageFlex">
                    <img src={singleProduct.image} id="singlePageImage"/>
                    <h2> {singleProduct.brand} </h2>
                    <h4> {singleProduct.name} </h4>
                    <h5> ${singleProduct.price}</h5>
                    <h5> {singleProduct.description}</h5>
                    <button className='atc-btn' value={singleProduct.id} onClick={addItemToCart}>Add to Cart</button>
                    <br />
                    <button onClick={()=> nav(-1)}>Go Back</button>
                </div> : <p> no single product data </p>   
            } 
        </div>
    )
}

export default Single;