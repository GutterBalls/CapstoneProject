import { Nav } from "../components";
import { Link } from "react-router-dom";


const Header = () => {


    return (
        <div className="header-jsx">
            <div className="header-top">
                <img src="/images/logo-short.jpg" width={200} alt="Gutter Ball Logo"/>
                <Link to="/profile" className="nav-btn">Login/Profile</Link>
                <Link to="/cart" className="nav-btn">Cart</Link>
                <input id="searchbox"
                    type="text"
                    placeholder=" Search..."
                    onChange={(event) => {
                    setSearchQuery(event.target.value)
                    }}>
                </input>
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