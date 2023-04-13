import { useState, useEffect } from 'react';
const DATABASE_URL = 'https://gutterballs-back.onrender.com/api';

const ItemsInOrder = (props) => {
    const [cart, setCart] = useState([]);
    

    useEffect(() => {

        if (props.isLoggedIn){

        getCartData();
        
        };

    }, []);

    // GET logged in user cart.
    async function getCartData() {
        
        try {
            if (props.singleOrder.order_status == false){
            const response = await fetch(`${DATABASE_URL}/cartItems/${props.singleOrder.user_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                    },
            });
            const translatedData = await response.json();
            
            setCart(translatedData);

            } else {
                const response = await fetch(`${DATABASE_URL}/cartItems/completed/${props.singleOrder.user_id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                        },
                });
            const translatedData = await response.json();
                
            setCart(translatedData);
            
            };

        } catch (error) {
            console.log(error)
        };
    };

    
    return(
        <>
            { cart.length ? 
                cart.filter((singleCart) => singleCart.order_id == props.singleOrder.id).map((singleItem) => {
                    return(
                        <span key={singleItem.id}>
                            <hr />
                            <img src={singleItem.image} style={{float: "right", width: "75px"}} />
                            <h6> {singleItem.brand} {singleItem.name} </h6>
                            <h6> Quantity: {singleItem.qty} </h6>
                            <h6> Price: ${singleItem.price}/ea </h6>
                            
                        </span>
                    );
                }) : <h4> No items in your cart, yet! </h4>
            }
        </>
    );
};

export default ItemsInOrder;