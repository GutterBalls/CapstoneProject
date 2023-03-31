
import {createRoot} from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Accessories, Bags, Balls, Shoes, Single, Header ,Homepage, Profile, Cart, Confirm, Sidebar, Footer } from "./components/index";
import { useState, useEffect } from "react";



const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        
        if (localStorage.getItem("token")) {
            setIsLoggedIn(true)
            getUserData()
        } else {
            setIsLoggedIn(false)
            console.log("No Token!")
        }
    }, [])
    
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
                <section className="br-showcase">
			        <header className="br-header"><Header /></header>
			        <aside className="br-sidebar"><Sidebar /></aside>
			        <div className="br-main">
                        <Routes>
                            <Route path="/" element={<Homepage />}/>
                            <Route path="/balls" element={<Balls isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userData={userData} setUserData={setUserData}/>}/>
                            <Route path="/bags" element={<Bags isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userData={userData} setUserData={setUserData}/>}/>
                            <Route path="/shoes" element={<Shoes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userData={userData} setUserData={setUserData}/>}/>
                            <Route path="/accessories" element={<Accessories isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userData={userData} setUserData={setUserData}/>}/>
                            <Route path="/single" element={<Single isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userData={userData} setUserData={setUserData}/>}/>
                            <Route path="/profile" element={<Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userData={userData} setUserData={setUserData}/>}/>
                            <Route path="/cart" element={<Cart isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userData={userData} setUserData={setUserData}/>}/>
                            <Route path="/confirm" element={<Confirm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userData={userData} setUserData={setUserData}/>}/>
                        </Routes>
                    </div>
			        <footer className="br-footer"><Footer /></footer>
		        </section>

                
            </div>
        </BrowserRouter>
)};



const appElement = document.getElementById("app");
const root = createRoot(appElement);
root.render(<App/>);