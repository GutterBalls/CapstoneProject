import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const DATABASE_URL = 'http://localhost:1337/api';

const Single = (props) => {
    const [singleProduct, setSingleProduct] = useState([]);
    const [allReviews, setAllReviews] = useState([]);
    const [productRating, setProductRating] = useState(0);
    const [productReview, setProductReview] = useState("");
    const { id } = useParams();
    const nav = useNavigate();
    
    useEffect(() => {
        getProductById();
        getReviews();
    }, []);
    
    async function getProductById () {
        try {
            const response = await fetch(`${DATABASE_URL}/products/${id}`)
            const translatedData = await response.json();
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

            console.log("Single.jsx 51 - addItemToCart", translatedData);

        } catch (error) {
            console.log("Error w/ singleItem/addItemToCart", error);
        };
    };

    async function getReviews () {
        try {
            console.log("Inside try getReviews")
            const response = await fetch(`${DATABASE_URL}/reviews`)
            console.log("Response getReviews", response)
            const translatedData = await response.json();
            if (translatedData) {
                console.log("Get reviews TRANS DATA line 64", translatedData)
                setAllReviews(translatedData);
            } else {
                console.log("No reviews yet.")
            }

            console.log(allReviews)

        } catch (error) {
            throw error;
        };
    };

    async function postReview (event) {
        console.log("Post Review USERNAME on USERDATA", props.userData.username)
        event.preventDefault();
        try {
            const response = await fetch(`${DATABASE_URL}/reviews`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    username: props.userData.username,
                    product_id: id,
                    product_brand: singleProduct.brand,
                    product_name: singleProduct.name,
                    rating: productRating,
                    review: productReview
                })
            });

            const translatedData = await response.json()
            setProductRating("")
            setProductReview("")
            console.log("Post Review trans data", translatedData);

        } catch (error) {
            throw error;
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
                    { props.isLoggedIn ? <button className='atc-btn' value={singleProduct.id} onClick={addItemToCart}> Add to Cart </button> 
                    : <button className='atc-btn'><Link to="/login">Login to purchase</Link></button>
                    }
                    <br />
                    <button onClick={()=> nav(-1)}>Go Back</button>
                    {
                        allReviews.length > 0 ?  allReviews.filter((single) => {
                             return single.product_id === singleProduct.id
                             }).map((singleReview) => {
                            return(
                                <span key={singleReview.id}>
                                    <h3> Review by: {singleReview.username} </h3>
                                    <h4> Rating: {singleReview.rating}</h4>
                                    <h4> Review: {singleReview.review}</h4>
                                </span> 
                     )}) : <p> No reviews yet for this product ! </p>
                    }       

                </div> : <p> ...We're bowling. BRB! </p>   
            }
            {
                props.isLoggedIn ?
                <div>
                    <form onSubmit={postReview}>
                        <input
                        type="text"
                        placeholder="Rating"
                        value={productRating}
                        onChange={(event) => setProductRating(event.target.value)} />
                        <textarea
                        type="text"
                        placeholder="Product Review"
                        rows="2"
                        cols="15"
                        value={productReview}
                        onChange={(event) => setProductReview(event.target.value)} />
                        <button type="submit"> Submit Product Review </button>
                    </form>
                </div> : <h1> Please login to review this product. </h1>
            }
            
        </div>
    )
}

export default Single;