import { Nav } from "../components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import { BsCart4, BsPencilSquare, BsSearch } from 'react-icons/bs';
// import { CgProfile } from 'react-icons/cg';
// import { GrLogin, GrLogout } from 'react-icons/gr';
import { MdAssignmentAdd, MdLogin, MdLogout, MdAccountCircle, MdShoppingCart } from 'react-icons/md';



const Header = (props) => {
    const { isLoggedIn, getProductData, userData } = props;

    const [search, setSearch] = useState([]);

    useEffect(() => {
        getProductData();
        
    }, []);

    return (
        <div className="header-jsx" onMouseLeave={() => document.getElementById('search').style.visibility = 'hidden'}>
            <div className="header-top">
                <Link to="/" ><img src="/images/logo-short.jpg" alt="Gutter Ball Logo" id="logo"/></Link>
                <br />
                {isLoggedIn ? <p>Welcome {userData.username}</p> : <p>Welcome Guest</p> }
                {/* ICONS */}
                { isLoggedIn ? <Link to="/profile" className="nav-btn-top icon"><MdAccountCircle /></Link> :<Link to="/register" className="nav-btn-top icon">< MdAssignmentAdd /></Link> }
                { isLoggedIn ? <Link to="/logout" className="nav-btn-top icon"><MdLogout /></Link> : <Link to="/login" className="nav-btn-top icon"><MdLogin /></Link> }
                <Link to="/cart" className="nav-btn-top icon"><MdShoppingCart /></Link>

                 {/* SEARCHBOX */}
                 <div>
                    <input className="searchbox"
                    type="text"
                    placeholder="Search..."
                    onChange={(event) => {
                    setSearch(
                        props.productData.filter((product) => product.name.toLowerCase().includes(event.target.value.toLowerCase()) 
                            || product.brand.toLowerCase().includes(event.target.value.toLowerCase()) 
                        ));
                    document.getElementById('search').style.visibility = 'visible'
                    }} />
                    <ul id="search">
                        { search.map((product) => {
                            return(
                            <li className="indSearchItem" key={product.id}>
                                <div>
                                    <img src={product.image} className="indSearchPic" /> 
                                    <Link to={`/single/${product.id}`}> {product.brand} {product.name}</Link>
                                </div>
                            </li>
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