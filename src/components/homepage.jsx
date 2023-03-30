import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Nav } from "../components";

// const BASE_URL = `http://localhost:1337/api`

const Homepage = () => {
    // const [myData, setMyData] = useState({})

    // useEffect(() => {
    //     if (localStorage.getItem("token")) {
    //         props.setIsLoggedIn(true)
    //         fetchMyData();
    //     } else {
    //         props.setIsLoggedIn(false)
    //     }
        
    //     async function fetchMyData() {
    //         try {
    //             const response = await fetch(`${BASE_URL}/users/me`, {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     Authorization: `Bearer ${localStorage.getItem("token")}`
    //                 }
    //             })
    //             const translatedData = await response.json(); 
    //             console.log(translatedData)
    //             setMyData(translatedData)
    //         } catch (e) {
    //             console.log(e); 
    //         }
    //     }
    // }, [])

    // return (
    //     <div className="homepage">
    //         <div>
    //             <p>React is running in HOMEPAGE</p>
    //             {/* {
    //                 props.isLoggedIn ? <p className="welcome">Welcome {myData.username}! Please use navigation buttons above.</p>
    //                 : <h3>Login / register above or <Link to="/routines">continue as a guest</Link> to view some routines.</h3>
    //             } */}
    //         </div>
    //         <br />
    //         <br />
    //     </div>
    // )

    return (
        <div>
            <p>Homepage</p>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
            <p>12</p>
            <p>13</p>
            <p>14</p>
            <p>15</p>
            <p>16</p>
        </div>
    )
}
export default Homepage;