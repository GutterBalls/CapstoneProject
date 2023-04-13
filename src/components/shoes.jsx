import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBBtn } from 'mdb-react-ui-kit';
const DATABASE_URL = 'http://localhost:1337/api';
const perPage = 6;

const Shoes = (props) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [brand, setBrand] = useState(null);
    const [price, setPrice] = useState(0);
    const [specials, setSpecials] = useState("");
    const offset = currentPage * perPage;
    const { isLoggedIn } = props;
    
    // Filtering through all products to return what sidebar filter is selected.
    const filteredProducts = props.productData.filter((singleShoe) => {
        if (brand && singleShoe.brand != brand) {
            return false;
        };

        if (price && singleShoe.price > price) {
            return false;
        };

        if (specials === "Sale" && singleShoe.sale === false) {
            return false;
        };

        if (specials === "Clearance" && singleShoe.clearance === false) {
            return false;
        };
        
        return singleShoe.category_id === 3
    });

    // Setting the page count for pagination based off of the amount of products returned in the filter above.
    const pageCount = Math.ceil(filteredProducts.length / perPage);

    // Upon component mounting, get products and, if there is a token (logged in user), get their current order data.
    useEffect(() => {
        props.getProductData();
        if (localStorage.getItem("token")){
            props.getOrderData();
            // console.log("Shoes component inside useEffect line 17", props.orderData)
        };
    }, []);

    // Setting / rendering the current page for pagination.
    function pageClick({ selected: selectedPage}) {
        setCurrentPage(selectedPage)
    };
    // POST request to add a selected item to cart.
    async function addItemToCart (event) {
        
        try {
            const specificItem = props.productData.filter((item) => item.id === parseInt(event.target.value));
            const falseOrder = props.orderData.filter((order) => order.order_status === false);
            const response = await fetch(`${DATABASE_URL}/cartItems`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    user_id: props.userData.id,
                    order_id: falseOrder[0].id, 
                    product_id: parseInt(event.target.value),
                    qty: 1,
                    price: specificItem[0].price
                })
            });
            const translatedData = await response.json();
            props.setCounter(props.counter + 1);
            

        } catch (error) {
            console.log(error);
            alert("Duplicate Product: Visit cart to update quantity.");
        };
    };

    return (
        <section className="main-container">
            <aside className="main-left">Filter by...
                <ul className="filter">
                    <li className="filter-item">
                        <MDBBtn style={{backgroundColor: "rgb(110,0,0)", width: "115px"}} onClick={() => {
                            setBrand(null)
                            setPrice(0)
                            setSpecials("")
                            setCurrentPage(0)
                        }} link="true"> All Shoes </MDBBtn>
                    </li>
                    <li className="filter-item">
                        <MDBDropdown dropright group>
                            <MDBDropdownToggle 
                            style={{backgroundColor: "rgb(188,0,0)", width: "115px"}} 
                            onClick={() => {
                                setBrand(null)
                                setPrice(0)
                                setSpecials("")
                            }}>Brand</MDBDropdownToggle>
                            <MDBDropdownMenu>
                                <MDBDropdownItem onClick={() => {setBrand("Dexter") , setCurrentPage(0)}} link="true">Dexter</MDBDropdownItem>
                                <MDBDropdownItem onClick={() => {setBrand("Elite") , setCurrentPage(0)}} link="true">Elite</MDBDropdownItem>
                                <MDBDropdownItem onClick={() => {setBrand("KR Strikeforce") , setCurrentPage(0)}} link="true">KR</MDBDropdownItem>
                                <MDBDropdownItem onClick={() => {setBrand("Motiv") , setCurrentPage(0)}} link="true">Motiv</MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </li>
                    <li className="filter-item">
                        <MDBDropdown dropright group>
                            <MDBDropdownToggle 
                            style={{backgroundColor: "rgb(188,0,0)", width: "115px"}} 
                            onClick={() => {
                                setBrand(null)
                                setPrice(0)
                                setSpecials("")
                            }}>Price</MDBDropdownToggle>
                            <MDBDropdownMenu>
                                <MDBDropdownItem onClick={() => {setPrice(100) , setCurrentPage(0)}} link="true">$</MDBDropdownItem>
                                <MDBDropdownItem onClick={() => {setPrice(200) , setCurrentPage(0)}} link="true">$$</MDBDropdownItem>
                                <MDBDropdownItem onClick={() => {setPrice(250) , setCurrentPage(0)}} link="true">$$$</MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </li>
                    <li className="filter-item">
                        <MDBDropdown dropright group>
                            <MDBDropdownToggle 
                            style={{backgroundColor: "rgb(188,0,0)", width: "115px"}} 
                            onClick={() => {
                                setBrand(null)
                                setPrice(0)
                                setSpecials("")
                            }}>Specials</MDBDropdownToggle>
                            <MDBDropdownMenu>
                                <MDBDropdownItem onClick={() => {setSpecials("Sale") , setCurrentPage(0)}} link="true">Sale</MDBDropdownItem>
                                <MDBDropdownItem onClick={() => {setSpecials("Clearance"), setCurrentPage(0)}} link="true">Clearance</MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </li>
                </ul>
            </aside>
            <div>
                <div className="main-right">
                {
                    props.productData.length ? filteredProducts.slice(offset, offset + perPage).map((singleProduct) => {
                        
                        return (
                            <div key={singleProduct.id} className="main-singleProduct">
                                <Link to={`/single/${singleProduct.id}`}><img src={singleProduct.image} className="singleProductImage"/></Link>
                                <div className="itemInfoFlex">
                                    <h5>{singleProduct.brand}</h5>
                                    <h5>{singleProduct.name}</h5> 
                                    <h5>${singleProduct.price}</h5>
                                    { isLoggedIn ? <button className='atc-btn' value={singleProduct.id} onClick={addItemToCart}> Add to Cart </button> 
                                    : <button className='atc-btn'><Link to="/login">Login to purchase</Link></button>
                                    }
                                </div>
                            </div>
                            
                        )
                        
                    }) : <h1> ...We're bowling. BRB!. </h1>
                }
                </div>
                { props.productData.length ?
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
                            forcePage={currentPage}
                        />
                    </div>
                    : ''
                }
            </div>
        </section>
    );
};

export default Shoes;