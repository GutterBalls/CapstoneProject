const Accessories = (props) => {

    return (
        <div className="homepage">
            <p>1 - Accessories</p>
            {
                props.productData.length ? props.productData.filter((singleBall) => singleBall.category_id === 4).map((singleProduct) => {
                    
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
    )
}

export default Accessories;