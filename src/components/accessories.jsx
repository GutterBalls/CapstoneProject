import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
const DATABASE_URL = 'http://localhost:1337/api';
const perPage = 6;

const Accessories = (props) => {
    const [currentPage, setCurrentPage] = useState(0);
    const offset = currentPage * perPage;
    const accProducts = props.productData.filter((singleAcc) => singleAcc.category_id === 4);
    const pageCount = Math.ceil(accProducts.length / perPage);

    useEffect(() => {
        props.getProductData();
        if (localStorage.getItem("token")){
            props.getOrderData();
            console.log("Accessories component inside useEffect line 17", props.orderData)
        };
    }, []);

    function pageClick({ selected: selectedPage}) {
        setCurrentPage(selectedPage)
    };

    async function addItemToCart (event) {
        // console.log("Accessories LINE 26 orderID", props.orderData[0].id);
        // console.log("Accessories LINE 27 evt", event.target.value[0])
        try {
            const specificItem = props.productData.filter((item) => item.id === parseInt(event.target.value))
            const response = await fetch(`${DATABASE_URL}/cartItems`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: props.userData.id,
                    order_id: props.orderData[0].id, 
                    product_id: parseInt(event.target.value),
                    qty: 1,
                    price: specificItem[0].price
                })
            })
            const translatedData = await response.json()

            console.log("Accessories LINE 45", translatedData);

        } catch (error) {
            console.log("Error w/ accessories/addItemToCart", error);
        }
    }

    return (
        <section className="main-container">
            <aside className="main-left">Filter by...
                <ul><strong>Brand:</strong>
                    <li>BBF</li>
                    <li>Brunswick</li>
                    <li>Genesis</li>
                    <li>Hammer</li>
                    <li>KR Strikeforce</li>
                    <li>Storm</li>
                    <li>Vise</li>
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
                    props.productData.length ? props.productData.filter((singleAcc) => singleAcc.category_id === 4).slice(offset, offset + perPage).map((singleProduct) => {
                        
                        return (
                            <div key={singleProduct.id} className="main-singleProduct">
                                <Link to={`/single/${singleProduct.id}`}><img src={singleProduct.image} className="singleProductImage"/></Link>
                                <div className="itemInfoFlex">
                                    <h5> Brand: {singleProduct.brand}</h5>
                                    <h5> Name: {singleProduct.name}</h5> 
                                    <h5> Price: ${singleProduct.price}</h5>
                                    <button className="atc-btn" value={singleProduct.id} onClick={addItemToCart}> Add to Cart </button> 
                                </div>
                            </div>
                            
                        )
                        
                    }) : <h1> No data loaded. </h1>
                }
                </div>
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
        </section>
    )
}

export default Accessories;