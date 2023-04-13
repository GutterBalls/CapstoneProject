import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import {createRoot} from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Accessories, Bags, Balls, Shoes, Single, Header ,Homepage, Profile, Footer, Login, Logout, Register, CartCheckout } from "./components/index";
import { useState, useEffect } from "react";
const DATABASE_URL = 'https://gutterballs-back.onrender.com/api';


const App = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState([]);
    const [productData, setProductData] = useState([]);
    const [orderData, setOrderData] = useState([]);
    const [counter, setCounter] = useState(0);
    

    async function getProductData() {
        try {
            const response = await fetch(`${DATABASE_URL}/products`)
            const translatedData = await response.json();
            setProductData(translatedData);
            return translatedData
        } catch (error) {
            console.log("Error w/ getProductData func", error)
        };
    };

    async function getUserData() {
        
        try {
            const response = await fetch(`${DATABASE_URL}/users/me`
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
            });
            const translatedData = await response.json();
            setUserData(translatedData);

            } catch (error) {
                console.error("Error with getUserData func", error);
            };
        };
    
    async function getOrderData () {
        try {
            const response = await fetch(`${DATABASE_URL}/orders/me`
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
            });
            const translatedData = await response.json();
            setOrderData(translatedData);

        } catch (error) {
            console.error("Error w. getOrderData func", error);
        }
    }

        useEffect(()=>{
            getProductData();
            if (localStorage.getItem("token")){
            getUserData();
            getOrderData();
            };
    }, [isLoggedIn])


    return (
        <BrowserRouter>
            <div>
                <section>
			        <header><Header 
                        isLoggedIn={isLoggedIn} 
                        setIsLoggedIn={setIsLoggedIn} 
                        userData={userData}
                        setUserData={setUserData}
                        productData={productData}
                        setProductData={setProductData}
                        getProductData={getProductData}
                        orderData={orderData}
                        setOrderData={setOrderData}
                        getOrderData={getOrderData}
                        counter={counter}
                        setCounter={setCounter}
                    /></header>
			        <div className="br-main">
                        <Routes>
                            <Route path="/" element={<Homepage 
                                productData={productData} 
                                setProductData={setProductData} 
                                getProductData={getProductData}
                                isLoggedIn={isLoggedIn} 
                                setIsLoggedIn={setIsLoggedIn}
                            />}/>
                            <Route path="/balls" element={<Balls 
                                isLoggedIn={isLoggedIn} 
                                setIsLoggedIn={setIsLoggedIn} 
                                userData={userData} 
                                setUserData={setUserData}
                                productData={productData}
                                setProductData={setProductData}
                                getProductData={getProductData}
                                orderData={orderData}
                                setOrderData={setOrderData}
                                getOrderData={getOrderData}
                                counter={counter}
                                setCounter={setCounter}
                            />}/>
                            <Route path="/bags" element={<Bags 
                                isLoggedIn={isLoggedIn} 
                                setIsLoggedIn={setIsLoggedIn} 
                                userData={userData} 
                                setUserData={setUserData}
                                productData={productData}
                                setProductData={setProductData}
                                getProductData={getProductData}
                                orderData={orderData}
                                setOrderData={setOrderData}
                                getOrderData={getOrderData}
                                counter={counter}
                                setCounter={setCounter}
                            />}/>
                            <Route path="/shoes" element={<Shoes 
                                isLoggedIn={isLoggedIn} 
                                setIsLoggedIn={setIsLoggedIn} 
                                userData={userData} 
                                setUserData={setUserData}
                                productData={productData}
                                setProductData={setProductData}
                                getProductData={getProductData}
                                orderData={orderData}
                                setOrderData={setOrderData}
                                getOrderData={getOrderData}
                                counter={counter}
                                setCounter={setCounter}
                            />}/>
                            <Route path="/accessories" element={<Accessories   
                                isLoggedIn={isLoggedIn} 
                                setIsLoggedIn={setIsLoggedIn} 
                                userData={userData} 
                                setUserData={setUserData}
                                productData={productData}
                                setProductData={setProductData}
                                getProductData={getProductData}
                                orderData={orderData}
                                setOrderData={setOrderData}
                                getOrderData={getOrderData}
                                counter={counter}
                                setCounter={setCounter}
                            />}/>
                            <Route path="/single/:id" element={<Single 
                                isLoggedIn={isLoggedIn} 
                                setIsLoggedIn={setIsLoggedIn} 
                                userData={userData} 
                                setUserData={setUserData}
                                productData={productData}
                                setProductData={setProductData}
                                getProductData={getProductData}
                                orderData={orderData}
                                setOrderData={setOrderData}
                                getOrderData={getOrderData}
                                counter={counter}
                                setCounter={setCounter}
                            />}/>
                            <Route path="/profile" element={<Profile 
                                isLoggedIn={isLoggedIn} 
                                setIsLoggedIn={setIsLoggedIn} 
                                userData={userData} 
                                setUserData={setUserData}
                                getUserData={getUserData}
                                productData={productData} 
                                setProductData={setProductData} 
                                getProductData={getProductData}
                                
                            />}/>
                            <Route path="/cart" element={<CartCheckout
                                isLoggedIn={isLoggedIn} 
                                setIsLoggedIn={setIsLoggedIn} 
                                userData={userData} 
                                setUserData={setUserData}
                                getUserData={getUserData}
                                productData={productData} 
                                setProductData={setProductData} 
                                getProductData={getProductData}
                                counter={counter}
                                setCounter={setCounter}
                            />}/>

                            <Route path="/register" element={<Register />}/>
                            <Route path="/login" element={<Login 
                                counter={counter}
                                setCounter={setCounter}
                            />}/>
                            <Route path="/logout" element={<Logout
                                setIsLoggedIn={setIsLoggedIn}
                                counter={counter}
                                setCounter={setCounter}
                            />}/>
                        </Routes>
                    </div>
			        <footer><Footer /></footer>
		        </section>

                
            </div>
        </BrowserRouter>
)};



const appElement = document.getElementById("app");
const root = createRoot(appElement);
root.render(<App/>);