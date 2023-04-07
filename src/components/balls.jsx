import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from "react-paginate";
const DATABASE_URL = 'http://localhost:1337/api';
const perPage = 6;

const Balls = (props) => {
    const [currentPage, setCurrentPage] = useState(0);
    const offset = currentPage * perPage;
    const ballProducts = props.productData.filter((singleBall) => singleBall.category_id === 1);
    const pageCount = Math.ceil(ballProducts.length / perPage);
   
    useEffect(() => {
        props.getProductData();
        if (localStorage.getItem("token")){
            props.getOrderData();
            console.log("Balls component inside useEffect line 17", props.orderData)
        };
    }, []);

    function pageClick({ selected: selectedPage}) {
        setCurrentPage(selectedPage)
    };

    async function addItemToCart (event) {
        // console.log("Balls LINE 26 orderID", props.orderData[0].id);
        // console.log("Balls LINE 27 evt", event.target.value[0])
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
        <section className="main-container">
            <aside className="main-left">Filter by...
                <ul><strong>Brand:</strong>
                    <li>Brunswick</li>
                    <li>DV8</li>
                    <li>Hammer</li>
                    <li>Motiv</li>
                    <li>Storm</li>
                </ul>
                <ul><strong>Performance:</strong>
                    <li>Pro</li>
                    <li>Weekend Warrior</li>
                    <li>Ameteur Status</li>
                </ul>
                <ul><strong>Price:</strong>
                    <li>$$$</li>
                    <li>$$</li>
                    <li>$</li>
                </ul>
                <ul><strong>Specials:</strong>
                    <li>ON SALE!</li>
                    <li>CLEARANCE</li>
                </ul>
            </aside>
            <div>
                {/* <div className="mainProductFlex"> */}
                <div className="main-right">
                {
                    props.productData.length ? props.productData.filter((singleBall) => singleBall.category_id === 1).slice(offset, offset + perPage).map((singleProduct) => {
                        
                        return (
                            <div key={singleProduct.id} className="main-singleProduct">
                                <Link to={`/single/${singleProduct.id}`}><img src={singleProduct.image} className="singleProductImage"/></Link>
                                <div className="itemInfoFlex">
                                    <h5> Brand: {singleProduct.brand}</h5>
                                    <h5> Name: {singleProduct.name}</h5> 
                                    <h5> Price: ${singleProduct.price}</h5>
                                    <button className='atc-btn' value={singleProduct.id} onClick={addItemToCart}> Add to Cart </button> 
                                </div>
                            </div>
                            
                        )
                        
                    }) : <h1> ...data loading, make a sammich. </h1>
                }
                </div>
                <div className='r-pag'>
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={pageClick}
                        containerClassName={"pagination"}
                        previousLinkClassName={"item previous"}
                        nextLinkClassName={"item next"}
                        disabledClassName={"disabled-page"}
                        activeClassName={"item active"}
                        disabledLinkClassName={"item disabled"}
                    />
                </div>
            </div>
        </section>
    )
}

export default Balls;