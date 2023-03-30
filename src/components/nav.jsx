import { Link } from "react-router-dom";



const Nav = () => {


    return (
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
    )
}
export default Nav;