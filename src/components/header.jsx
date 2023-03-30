import { Nav } from "../components";
import { Link } from "react-router-dom";


const Header = () => {


    return (
        <div className="header">
            <img src="/images/GB-logo-header.jpg" width={200} alt="Gutter Ball Logo"/>
            <div id="nav-container">
                <div className="search-container">
                    <input id="searchbox"
                        type="text"
                        placeholder=" Search..."
                        onChange={(event) => {
                        setSearchQuery(event.target.value)
                        }}>
                    </input>
                </div>

                <div className="nav">
                    <Link to="/balls" className="nav-btn">Balls</Link>
                    <Link to="/bags" className="nav-btn">Bags</Link>
                    <Link to="/shoes" className="nav-btn">Shoes</Link>
                    <Link to="/accessories" className="nav-btn">Accessories</Link>
                    <div className="nav-right"><Link to="/profile" className="nav-btn">Login/Profile</Link></div>
                    <div><Link to="/cart" className="nav-btn">Cart</Link></div>
                </div>
            </div>
        </div>
    )
}
export default Header;