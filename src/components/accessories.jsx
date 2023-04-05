import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
const perPage = 6;

const Accessories = (props) => {
    const [currentPage, setCurrentPage] = useState(0);
    const offset = currentPage * perPage;
    const accProducts = props.productData.filter((singleAcc) => singleAcc.category_id === 4);
    const pageCount = Math.ceil(accProducts.length / perPage);

    function pageClick({ selected: selectedPage}) {
        setCurrentPage(selectedPage)
    };

    useEffect(() => {
        props.getProductData();
    }, []);

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
                                    <button className="atc-btn"> Add to Cart </button> 
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