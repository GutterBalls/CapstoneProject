
import {createRoot} from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Accessories, Bags, Balls, Shoes, Single, Header ,Homepage, Profile, Cart, Confirm, Sidebar, Footer, Login } from "./components/index";
import { useState, useEffect } from "react";
const DATABASE_URL = 'http://localhost:1337/api';


const App = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState([]);
    const [productData, setProductData] = useState([]);
    useEffect(() => {
        getProductData();
        if (localStorage.getItem("token")) {
            setIsLoggedIn(true)
            // getUserData()
        } else {
            setIsLoggedIn(false)
            console.log("No Token!")
        }
    }, [])
    
    async function getProductData() {
        try {
            const response = await fetch(`${DATABASE_URL}/products`)
            const translatedData = await response.json();
            console.log(translatedData);
            setProductData(translatedData);
            console.log("Product data", productData)
            return translatedData
        } catch (error) {
            console.log(error)
        };
    };
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
			        <header className="br-header"><Header productData={productData} setProductData={setProductData} getProductData={getProductData} /></header>
			        <aside className="br-sidebar"><Sidebar productData={productData} setProductData={setProductData} getProductData={getProductData}/></aside>
			        <div className="br-main">
                        <Routes>
                            <Route path="/" element={<Homepage />}/>
                            <Route path="/balls" element={<Balls 
                                isLoggedIn={isLoggedIn} 
                                setIsLoggedIn={setIsLoggedIn} 
                                userData={userData} 
                                setUserData={setUserData}
                                productData={productData}
                                setProductData={setProductData}
                                getProductData={getProductData}
                            />}/>
                            <Route path="/bags" element={<Bags 
                                isLoggedIn={isLoggedIn} 
                                setIsLoggedIn={setIsLoggedIn} 
                                userData={userData} 
                                setUserData={setUserData}
                                productData={productData}
                                setProductData={setProductData}
                                getProductData={getProductData}
                            />}/>
                            <Route path="/shoes" element={<Shoes 
                                isLoggedIn={isLoggedIn} 
                                setIsLoggedIn={setIsLoggedIn} 
                                userData={userData} 
                                setUserData={setUserData}
                                productData={productData}
                                setProductData={setProductData}
                                getProductData={getProductData}
                            />}/>
                            <Route path="/accessories" element={<Accessories   
                                isLoggedIn={isLoggedIn} 
                                setIsLoggedIn={setIsLoggedIn} 
                                userData={userData} 
                                setUserData={setUserData}
                                productData={productData}
                                setProductData={setProductData}
                                getProductData={getProductData}
                            />}/>
                            <Route path="/single/:id" element={<Single 
                                isLoggedIn={isLoggedIn} 
                                setIsLoggedIn={setIsLoggedIn} 
                                userData={userData} 
                                setUserData={setUserData}
                                productData={productData}
                                setProductData={setProductData}
                                getProductData={getProductData}
                            />}/>
                            <Route path="/profile" element={<Profile 
                                isLoggedIn={isLoggedIn} 
                                setIsLoggedIn={setIsLoggedIn} 
                                userData={userData} 
                                setUserData={setUserData}
                                productData={productData} 
                                setProductData={setProductData} 
                                getProductData={getProductData}
                            />}/>
                            <Route path="/cart" element={<Cart 
                                isLoggedIn={isLoggedIn} 
                                setIsLoggedIn={setIsLoggedIn} 
                                userData={userData} 
                                setUserData={setUserData}
                                productData={productData} 
                                setProductData={setProductData} 
                                getProductData={getProductData}
                            />}/>
                            <Route path="/confirm" element={<Confirm 
                                isLoggedIn={isLoggedIn} 
                                setIsLoggedIn={setIsLoggedIn} 
                                userData={userData} 
                                setUserData={setUserData}
                                productData={productData} 
                                setProductData={setProductData} 
                                getProductData={getProductData}
                            />}/>
                            <Route path="/login" element={<Login />}/>
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