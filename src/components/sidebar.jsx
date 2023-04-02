import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Sidebar = (props) => {

    return (
        <div className="">
            <section>Filter:
                <div> Brand </div> {/* grab products by brand, should be passed down as props  */}
                <div> Price {/* grab products by price */}
                    <p> High Performance greater than $200 </p>
                    <p> Mid Performance greater than 100 </p>
                    <p> Entry Level less than 100 </p>
                </div> 
                <div> Sale </div> {/* grab products where sale = true */}
                <div> Clearance </div> {/* grab products where clearance = true */}

            </section>
            
        </div>
    )
}

export default Sidebar;