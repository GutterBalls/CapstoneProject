import { Nav } from "../components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";


const Header = (props) => {
    const [search, setSearch] = useState([]);

    useEffect(() => {
        props.getProductData();
        
    }, []);

    let searchProducts = props.productData.filter((singleProduct) => {
        return singleProduct.name //COME BACK FOR.
    })
    return (
        <div className="header-jsx">
            <div className="header-top">
                <Link to="/" ><img src="/images/logo-short.jpg" width={200} alt="Gutter Ball Logo"/></Link>
                <Link to="/profile" className="nav-btn">Login/Profile</Link>
                <Link to="/cart" className="nav-btn">Cart</Link>
                <div onMouseLeave={() => document.getElementById('search').style.visibility = 'hidden'}>
                    <input id="searchbox"
                    type="text"
                    placeholder=" Search..."
                    onMouseEnter={() => document.getElementById('search').style.visibility = 'visible'}
                    onChange={(event) => {
                    setSearch(props.productData.filter((product) => product.name.toLowerCase().includes(event.target.value.toLowerCase())));
                    document.getElementById('search').style.visibility = 'visible'
                    }} />
                    <ul id="search">
                    { search.map((product) => {
                        return(
                        <ul key={product.id}>
                            <div id="indSearchItem" /* onMouseLeave={() => document.getElementById('search').style.visibility = 'hidden'} */>
                                <img src={product.image} id="indSearchPic" /> 
                                <Link to={`/single/${product.id}`}> {product.name}</Link>

                            </div>
                        </ul>
                    )})}
                        
                    </ul>
                </div>

                
                
            </div>
            <div className="header-bottom">
                <Link to="/balls" className="nav-btn">Balls</Link>
                <Link to="/bags" className="nav-btn">Bags</Link>
                <Link to="/shoes" className="nav-btn">Shoes</Link>
                <Link to="/accessories" className="nav-btn">Accessories</Link>
            </div>
        </div>
    )
}


export default Header;