import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const DATABASE_URL = 'http://localhost:1337/api';

const Cart = (props) => {
    

    useEffect(() => {
        getCartData();
    }, []);

    const [cartData, setCartData] = useState([]);

    async function getCartData() {
        try {
            const response = await fetch(`${DATABASE_URL}/cartItems`)
            const translatedData = await response.json();
            console.log(translatedData);

            setCartData(translatedData);
            console.log("Cart data", cartData)

            return translatedData
        } catch (error) {
            console.log(error)
        };
    };

    return (
        <div className="homepage">
            <h1 id="cartOwner">{props.userData.username}'s Cart</h1>
            {
                cartData.length ? cartData.filter((item)=> item.user_id === props.userData.id ).map((singleItem) => {
                    return (
                        <div key={singleItem.id} className="cartFlex">
                            <div className="cartItem">
                                <h3> Order ID: {singleItem.order_id}</h3> 
                                {/* { props.productData.filter((singleProduct) =>  } */}
                                <h4> Product ID: {singleItem.product_id}</h4>
                                <h4> Quantity: {singleItem.qty}</h4>
                                <h4> Price: ${singleItem.price}</h4>
                            </div>
                        </div>
                        
                    )
                    
                }) : <h1> No items in your cart. </h1>
            } 
            {/* <div>
                <form class="form">
                    <div class="checkout-method">
                        <button type="button" class="button">
                            <i class="ri-bank-card-line"></i>
                        </button>
                        <button type="button" class="button button--inactive">
                            <i class="ri-paypal-fill"></i>
                        </button>
                    </div>
                    <div class="checkout-information">
                        <div class="input-group">
                            <label for="name">Name on card</label>
                            <input type="text" id="name" placeholder="Enter name" />
                        </div>
                        <div class="input-group">
                            <label for="number">Card number</label>
                            <input type="text" id="number" placeholder="0000 0000 0000 0000" />
                        </div>
                        <div class="horizontal-grid">
                            <div class="input-group">
                                <label for="date">Expiration date</label>
                                <input type="text" id="date" placeholder="12/27" />
                            </div>
                            <div class="input-group">
                                <label for="cvv">CVV</label>
                                <input type="number" id="cvv" placeholder="CVV" />
                            </div>
                        </div>
                    </div>
                    <button class="button button--checkout">Checkout</button>
                </form>
            </div> */}
        </div>

    )
}

export default Cart;