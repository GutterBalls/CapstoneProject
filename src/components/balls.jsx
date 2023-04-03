import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from "react-paginate";
const DATABASE_URL = 'http://localhost:1337/api';
const perPage = 6;

const Balls = (props) => {
    const [currentPage, setCurrentPage] = useState(0);
    const offset = currentPage * perPage;
    
        
    
    const pageCount = Math.ceil(props.productData.length / perPage);
   
    useEffect(() => {
        props.getProductData();
    }, []);

    function pageClick({ selected: selectedPage}) {
        setCurrentPage(selectedPage)
    };


    
    

    return (
        <div className="homepage">
            <p>Balls</p> 
            <div className="mainProductFlex">
            
            {
                props.productData.length ? props.productData.filter((singleBall) => singleBall.category_id === 1).slice(offset, offset + perPage).map((singleProduct, index) => {
                    
                    return (
                        <div key={singleProduct.id} className="singleProduct">
                            <Link to={`/single/${singleProduct.id}`}><img src={singleProduct.image} className="singleProductImage"/></Link>
                            <div className="itemInfoFlex">
                                <h3> Brand: {singleProduct.brand}</h3>
                                <h3> Name: {singleProduct.name}</h3> 
                                <h4> Price: ${singleProduct.price}</h4>
                                <button> Add to Cart </button> 
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
    )
}

export default Balls;