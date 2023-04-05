import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const DATABASE_URL = 'http://localhost:1337/api';

const Cart = (props) => {
    const [cartQuantity, setCartQuantity] = useState(1);
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        getCartData();
        props.getUserData();
    }, []);

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

    function cartItemQuantity(event) {
        setCartQuantity(event.target.value)
    };

    function cartQuantityLoop() {
        let number = [];

        for (let i = 1; i <=10; i++) {
            number.push(<option value={i}>{i}</option>)
        }
        return number
    };


    return (
        <div className="homepage">
            <h1 id="cartOwner">{props.userData.username}</h1>
            {
                cartData.length && localStorage.getItem("token") ? cartData.filter((item)=> item.user_id === props.userData.id ).map((singleItem) => {
                    return (
                        <div key={singleItem.id} className="cartFlex">
                            <div className="cartItem">
                                <h3> Order ID: {singleItem.order_id}</h3> 
                                { props.productData.filter((singleProduct) => singleItem.product_id == singleProduct.id).map((product) => { 
                                return (
                                    <div>
                                        <img src={product.image} style={{width: "auto", height: "5vh"}}/>
                                        <div>
                                            <h4> {product.brand} {product.name}</h4>
                                        </div>
                                    </div>
                                )})}
                                <label htmlFor="cartQuantity"> Quantity:</label> 
                                <select id="cartQuantity" value={cartQuantity} onChange={cartItemQuantity}> {cartQuantityLoop()}</select>
                                <h4> Price: ${singleItem.price}</h4>
                                <h4> Total: ${(cartQuantity * singleItem.price).toFixed(2)}</h4>
                            </div>
                        </div>
                        
                    )
                    
                }) : <h1> No items in your cart. Please login or create an account to begin the process! </h1>
            } 
                        <h2> Total: {Math.reduce}</h2>
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