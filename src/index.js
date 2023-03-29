// BOILERPLATE, CHANGE AS NEEDED

import {createRoot} from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Accessories, Bags, Balls, Shoes, Single, Homepage, Profile, Cart, Confirm } from "./components/index";
import { useState, useEffect } from "react";
// const DATABASE_URL = `http://localhost:1337/api`

const App = () => {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [userData, setUserData] = useState([]);
    // useEffect(() => {
        
    //     if (localStorage.getItem("token")) {
    //         setIsLoggedIn(true)
    //         getUserData()
    //     } else {
    //         setIsLoggedIn(false)
    //         console.log("No Token!")
    //     }
    // }, [])
    
    // const getUserData = async () => {
    //     try {
    //       const response = await fetch(`${DATABASE_URL}/users/me`, {
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'Authorization': `Bearer ${localStorage.getItem("token")}`
    //         },
    //       });
    //       const translatedData = await response.json();
    //       console.log(translatedData);
    //       if (translatedData.id > 0) {
    //         setUserData(translatedData);
    //       } else {
    //         console.log("Error w/ translatedData.id within getUserData func in src/index.js");
    //       }
    //     } catch (error) {
    //       console.error("Error with getUserData function", error);
    //     }
    //   }


    return (
        <BrowserRouter>
            <div className="br">

                <nav className="br-nav">
                </nav>

                <header className="br-header">
                </header>

                <Routes>
                    <Route path="/" element={<Homepage />}/>
                    {/* <Route path="/balls" element={<Balls isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userData={userData} setUserData={setUserData}/>}/>
                    <Route path="/bags" element={<Bags isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userData={userData} setUserData={setUserData}/>}/>
                    <Route path="/shoes" element={<Shoes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userData={userData} setUserData={setUserData}/>}/>
                    <Route path="/accessories" element={<Accessories isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userData={userData} setUserData={setUserData}/>}/>
                    <Route path="/single" element={<Single isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userData={userData} setUserData={setUserData}/>}/>
                    <Route path="/profile" element={<Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userData={userData} setUserData={setUserData}/>}/>
                    <Route path="/cart" element={<Cart isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userData={userData} setUserData={setUserData}/>}/>
                    <Route path="/confirm" element={<Confirm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userData={userData} setUserData={setUserData}/>}/> */}
                </Routes>

                <footer>

                </footer>

            </div>
        </BrowserRouter>
)};



const appElement = document.getElementById("app");
const root = createRoot(appElement);
root.render(<App/>);