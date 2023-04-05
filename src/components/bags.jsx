import { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
const perPage = 6;

const Bags = (props) => {
    const [currentPage, setCurrentPage] = useState(0);
    const offset = currentPage * perPage;
    const bagProducts = props.productData.filter((singleBag) => singleBag.category_id === 2);
    const pageCount = Math.ceil(bagProducts.length / perPage);

    useEffect(() => {
        props.getProductData();
    }, []);

    function pageClick({ selected: selectedPage}) {
        setCurrentPage(selectedPage)
    };

    return (
        <section className="main-container">
            <aside className="main-left">Filter by...
                <ul><strong>Brand:</strong>
                    <li>Brunswick</li>
                    <li>Elite</li>
                    <li>Storm</li>
                </ul>
                <ul><strong>Capacity:</strong>
                    <li>1 Ball Totes</li>
                    <li>1 Ball Rollers</li>
                    <li>2 Ball Rollers</li>
                    <li>3+ Ball Rollers</li>
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
                    props.productData.length ? props.productData.filter((singleBag) => singleBag.category_id === 2).slice(offset, offset + perPage).map((singleProduct) => {
                        
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
                        
                    }) : <h1> ...data loading, make a sammich. </h1>
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

export default Bags;