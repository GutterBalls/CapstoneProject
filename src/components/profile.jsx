import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AdminEditProduct, AdminDeleteProduct } from "../components/index";

const DATABASE_URL = 'http://localhost:1337/api';

const Profile = (props) => {
    const { getUserData, userData, setUserData, isLoggedIn, setIsLoggedIn, productData, setProductData, getProductData } = props;

    const nav = useNavigate();

//User Button (Edit Form)
    const [editUserBtn, setEditUserBtn] = useState (false);
//User Button (Order History List)
    const [orderHistoryBtn, setOrderHistoryBtn]= useState(false);
//User Button (Disable Account Form)
    const [disableAccountBtn, setDisableAccountBtn] = useState(false);

//Admin Button (List All Users) 
    const [listUsersBtn, setListUsersBtn] = useState (false);
//Admin Button (Edit User Form)    
    const [editUserAdminBtn, setEditUserAdminBtn] = useState (false);
//Admin Button (Add New Product Form)    
    const [addProductBtn, setAddProductBtn] = useState (false);    
//Admin Button (List Products )    
    const [listProductsBtn, setListProductsBtn] = useState (false);
//Admin Button (Edit/update Product )    
    const [editProductBtn, setEditProductBtn] = useState (false);
//Admin Button (Delete Product )    
    const [deleteProductBtn, setDeleteProductBtn] = useState (false);

//User Edit Form State 
    const [editUsername, setEditUsername ] = useState("");
    const [editPassword, setEditPassword ] = useState("");
    const [editEmail, setEditEmail] = useState("");
//User Order History State
    const [orderData, setOrderData] = useState([]);

//Admin - List Users State 
    const [allUsers, setAllUsers] = useState([]);
//Admin - Add Product State
    const [ addImage, setAddImage ] = useState("");
    const [ addBrand, setAddBrand ] = useState("");
    const [ addName, setAddName ] = useState("");
    const [ addDescription, setAddDescription ] = useState("");
    const [ addPrice, setAddPrice ] = useState("");
    const [ addSale, setAddSale ] = useState("");
    const [ addClearance, setAddClearance ] = useState("");
    const [ addCatId, setAddCatId ] = useState("");

// User - toggle edit user form (button) 
    function toggleEditUserForm() {
        setEditUserBtn(!editUserBtn)
    };
// User - toggle Order History(button) 
    function toggleOrderHistory() {
        setOrderHistoryBtn(!orderHistoryBtn)
    };
// User - toggle Disable Account Form (button) 
    function toggleDisableAccountForm(){
        setDisableAccountBtn(!disableAccountBtn)
    }

// Admin - toggle list users(button)
    function toggleListUsers() {
        setListUsersBtn(!listUsersBtn)
    };
// Admin - toggle edit users(button)
    function toggleEditUserAdmin() {
        setEditUserAdminBtn(!editUserAdminBtn)
    };
// Admin - toggle Add Product(button)
    function toggleAddProduct() {
        setAddProductBtn(!addProductBtn)
    };
// Admin - toggle List Product(button)
    function toggleListProducts() {
        setListProductsBtn(!listProductsBtn)
    };
// Admin - toggle List Product(button)
    function toggleEditProduct() {
        setEditProductBtn(!editProductBtn)
    };
 // Admin - toggle List Product(button)
    function toggleDeleteProduct() {
        setDeleteProductBtn(!deleteProductBtn)
    };   

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setIsLoggedIn(true);
            getUserData();
            getOrderHistory();
            getProductData();
        if(userData.isAdmin === true){
            getAllUsersData();
        }    
            
        } else {
            setIsLoggedIn(false)
            console.log("No Token!")
        }
    }, [])

// User - Edit/Update
    const editUser = async (event) => {
        event.preventDefault();

        const tokenKey = localStorage.getItem("token");

        try {
            const response = await fetch(`${DATABASE_URL}/users/${userData.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenKey}`
                },
                body: JSON.stringify({
                    username: editUsername,
                    password: editPassword,
                    email: editEmail
                })
            });
            const transData = await response.json();
                // console.log(transData);

            if (!transData){
                alert("User edit was not successful. Please try again. ");
            } else {
                // setUserData([...userData, transData]);

                function updateUserData(){
                    let updateArr = [];
                    for(let i=0; i<userData.length; i++){
                        let currentUser = userData[i];
                        if(currentUser.id !== userData.id){
                            updateArr.push(currentUser);
                        }else{
                            updateArr.push(transData);
                        }
                    }
                    return updateArr
                };
                const newUserData = updateUserData();
                setUserData(newUserData);
                // alert("User was successfully updated.");
// reset form
                setEditUserBtn(false);
                setEditUsername("");
                setEditPassword("");
                setEditEmail("");
                nav("/profile")
                return getUserData();
            }
        } catch (error){
            console.log(error);
        }
    };
// User - Disable account
    async function disableSingleUser(event){
        event.preventDefault();
        try{
            const response = await fetch(`${DATABASE_URL}/users/${userData.id}`
            , {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
            });
            const transData = await response.json();
            // console.log("transData ", translatedData);
            if(!transData){
                alert("User was not disabled. Please try again.")
            } else{
                function updateUserData(){
                    let updateArr = [];
                    for(let i=0; i<userData.length; i++){
                        let currentUser = userData[i];
                        if(currentUser.id !== userData.id){
                            updateArr.push(currentUser);
                        }else{
                            updateArr.push(translateData);
                        }
                    }
                    return updateArr
                };
                const newUserData = updateUserData();
                setUserData(newUserData);
                // alert("User was disabled.")
                nav("/logout")
                return getAllUsersData();
            }
            
        } catch (error) {
            console.error("Error with deleteUser function", error);
        };
    };

// User - Get order history
    async function getOrderHistory() {
        try{
            const response = await fetch(`${DATABASE_URL}/orders/me`
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
            });
            const translatedData = await response.json();
            // console.log("translated Data:",translatedData);
            setOrderData(translatedData);
            // console.log(orderData);


        } catch (error) {
            console.error("Error with orderHistory function", error);
        };
    }

// Admin - Get all users 
    async function getAllUsersData() {
        
        try {
            const response = await fetch(`${DATABASE_URL}/users`
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
            });
            const translatedData = await response.json();
            // console.log("Translated Data", translatedData);
            setAllUsers(translatedData);

            } catch (error) {
                console.error("Error with getAllUsersData function", error);
            };
        };

// Admin - Disable user account
    async function disableUser(singleUser, event){
        event.preventDefault();
        try{
            const response = await fetch(`${DATABASE_URL}/users/${singleUser}`
            , {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
            });
            const transData = await response.json();
            console.log("Translated Data", transData);
            console.log(singleUser);

            if(!transData){
                alert("User was not disabled. Please try again.")
            } else{
                function updateUserData(){
                    let updateArr = [];
                    for(let i=0; i<userData.length; i++){
                        let currentUser = userData[i];
                        // if(currentUser.id !== userData.id){
                        if(currentUser.id !== singleUser){
                            updateArr.push(currentUser);
                        }else{
                            updateArr.push(transData);
                        }
                    }
                    return updateArr
                };
                const newUserData = updateUserData();
                setUserData(newUserData);
                // alert("User was disabled.")
                nav("/profile")
                return getAllUsersData();
            }
            
        } catch (error) {
            console.error("Error with deleteUser function", error);
        };
    };

// Admin - Edit/Update User
const editUserAdmin = async (singleUser, event) => {
    event.preventDefault();

    const tokenKey = localStorage.getItem("token");

    try {
        const response = await fetch(`${DATABASE_URL}/users/${singleUser}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenKey}`
            },
            body: JSON.stringify({
                username: editUsername,
                password: editPassword,
                email: editEmail
            })
        });
        const transData = await response.json();
            // console.log(transData);

        if (!transData){
            alert("User edit was not successful. Please try again. ");
        } else {
            // setUserData([...userData, transData]);

            function updateUserData(){
                let updateArr = [];
                for(let i=0; i<userData.length; i++){
                    let currentUser = userData[i];
                    if(currentUser.id !== userData.id){
                        updateArr.push(currentUser);
                    }else{
                        updateArr.push(transData);
                    }
                }
                return updateArr
            };
            const newUserData = updateUserData();
            setUserData(newUserData);
            // alert("User was successfully updated.");
// reset form
            setEditUserAdminBtn(false);
            setEditUsername("");
            setEditPassword("");
            setEditEmail("");
            nav("/profile")
            return getAllUsersData();
        }
    } catch (error){
        console.log(error);
    }
};

// Admin - Add New Product
    async function addProduct(event){
        event.preventDefault();

        const tokenKey = localStorage.getItem("token");
    
        try {
            const response = await fetch(`${DATABASE_URL}/products`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenKey}`
                },
                body: JSON.stringify({
                    image: addImage,
                    brand: addBrand,
                    name: addName,
                    description: addDescription,
                    price: addPrice,
                    sale: addSale,
                    clearance: addClearance,
                    category_id: addCatId
                })
            
            });
            const transData = await response.json();
                console.log("Add Product TransData:")
                console.log(transData);
    
            if (!transData){
                alert("Product was not created. Please try again. ");
            } else {
                setProductData([...productData, transData]);
                alert("Product was successfully created.");
    // reset form
                setAddProductBtn(false);
                setAddImage("");
                setAddBrand("");
                setAddName("");
                setAddDescription("");
                setAddPrice("");
                setAddSale("");
                setAddClearance("");
                setAddCatId("");
                nav("/profile");
                return getProductData();
            }
        } catch (error){
            console.log(error);
        }
    };

    return (
        <section className="main-container profile-mc">
{/* ----- NOT ADMIN ------ */}
            {
                userData.isAdmin === false ? 
                    <div key={userData.id} className="profile-lvl-1">
                        
                            <h1> Profile</h1>
                            <h3> Welcome {userData.username}</h3>
                            <button onClick={ toggleEditUserForm} className="atc-btn profile-btn">Edit User Details</button>
                            <button onClick={ toggleDisableAccountForm} className="atc-btn profile-btn">Disable Account Form</button>
                            <button onClick={ toggleOrderHistory } className="atc-btn profile-btn">Order History</button>
                                                              
{/* EDIT USER FORM */}
                            {
                                editUserBtn ? (
                                    <div className="del-acct">
                                        <span className="form__title">Edit/Update</span>
                                        <form action="" onSubmit={ editUser } >
                                            <div className="form__input">
                                                <i className="ri-user-line"></i>
                                                <input 
                                                    type="text"
                                                    value={ editUsername }
                                                    onChange={(event)=>{
                                                        setEditUsername(event.target.value);
                                                    }}
                                                    placeholder="New Username"
                                                />
                                            </div>    
                                            <div className="form__input">
                                                <i className="ri-lock-line"></i>
                                                <input 
                                                    type="password"
                                                    value={ editPassword } 
                                                    onChange={(event)=>{
                                                        setEditPassword(event.target.value);
                                                    }}
                                                    placeholder="New Password"
                                                />
                                            </div>
                                            <div className="form__input">
                                                <i className="ri-mail-line"></i>
                                                <input 
                                                    type="text"
                                                    value={ editEmail } 
                                                    onChange={(event)=>{
                                                        setEditEmail(event.target.value);
                                                    }}
                                                    placeholder="New Email"
                                                />
                                            </div>
                                            <button type="submit" className="form__button" >Submit</button>
                                        </form>
                                    </div>    
                                ): ""
                            }
                                                              
{/* DISABLE ACCOUNT */}
                            {
                                disableAccountBtn ? (
                                    <div className="prof-form">
                                        <form action="" onSubmit={ disableSingleUser } >
                                            <div className="del-acct">
                                                <h3>Disable Account</h3>
                                                <p>Are you sure you want to disable your account?</p>
                                                <p>You will need to contact an administrator to re-activate.</p>
                                                <p>Click "Submit" below to disable your account now.</p>
                                                <button type="submit" className="form__button" >Submit</button>
                                            </div>
                                        </form>
                                    </div>    
                                ): ""
                            }
                                                              
{/* ORDER HISTORY */}
                            <div className='flex-container'>
                            {
                                orderHistoryBtn ? orderData.map((singleOrder)=>{
                                    return(
                                        <div key={singleOrder.id} className='flex-item'>
                                                <h4>ID: {singleOrder.id}</h4>
                                                <h4>Order Date: {singleOrder.order_date}</h4>
                                                <h4>Order Status: {singleOrder.order_status ? "Completed" : "In Progress"}</h4>
                                        </div>
                                    )
                                }) : ""
                            }
                            </div>
                    </div>
                : 
                <div className='prof-admin'>
                    <div className='prof-admin-head'>
                        <h1> Administrator Dashboard</h1>
                        <h3> {userData.username}</h3>
                        <div className='prof-admin-btns'>
                            <button onClick={ toggleListUsers } className='pabi atc-btn'>List All Users</button>
                            <button onClick={ toggleAddProduct } className='pabi atc-btn'>Add New Product</button>
                            <button onClick={ toggleEditProduct } className='pabi atc-btn'>Edit/Update Product</button>
                            <button onClick={ toggleDeleteProduct } className='pabi atc-btn'>Delete Product</button>
                        </div>
                        
                    </div>
                    <div className='reviews-container'>
                                                                                      
{/* LIST USERS */}
                        {
                            listUsersBtn ? allUsers.map((singleUser)=>{
                                return(
                                    <div key={singleUser.id} className='reviews'>
                                        <h3>ID: {singleUser.id}</h3>
                                        <h3>Username: {singleUser.username}</h3>
                                        <h3>Status: {singleUser.isActive ? "Active" : "Inactive"}</h3>
                                        <button onClick={(event) => {
                                            disableUser(singleUser.id, event)
                                            // if(singleUser.isActive === false){
                                            //     enableUser(singleUser.id, event)
                                            // } else if(singleUser.isActive === true){
                                            //     disableUser(singleUser.id, event)
                                            // }
                                        }} className='atc-btn'>
                                            { singleUser.isActive ? "Disable Account" : "Enable Account"}
                                        </button>
                                        <br />
                                        <button onClick={ toggleEditUserAdmin } value={singleUser.id} className='atc-btn'>Edit User</button>
                                        {
                                            editUserAdminBtn ? (
                                                <div className="form">
                                                    <span className="form__title">Edit/Update</span>
                                                    <form action="" onSubmit={ (event) => editUserAdmin(singleUser.id, event) } >
                                                        <div className="form__input">
                                                            <i className="ri-user-line"></i>
                                                            <input 
                                                                type="text"
                                                                value={ editUsername }
                                                                onChange={(event)=>{
                                                                    setEditUsername(event.target.value);
                                                                }}
                                                                placeholder="New Username"
                                                            />
                                                        </div>    
                                                        <div className="form__input">
                                                            <i className="ri-lock-line"></i>
                                                            <input 
                                                                type="password"
                                                                value={ editPassword } 
                                                                onChange={(event)=>{
                                                                    setEditPassword(event.target.value);
                                                                }}
                                                                placeholder="New Password"
                                                            />
                                                        </div>
                                                        <div className="form__input">
                                                            <i className="ri-mail-line"></i>
                                                            <input 
                                                                type="text"
                                                                value={ editEmail } 
                                                                onChange={(event)=>{
                                                                    setEditEmail(event.target.value);
                                                                }}
                                                                placeholder="New Email"
                                                            />
                                                        </div>
                                                        <button type="submit" className="form__button" >Submit</button>
                                                    </form>
                                                </div>    
                                            ): ""
                                        }
                                    </div>
                                )
                            }): ""
                        }
                    </div>
                                                                                                      
{/* ADMIN ADD NEW PRODUCT */}
                    
                    <div>
                        {   
                            addProductBtn ? (
                                <div className="add-prod-form">
                                    <span className="form__title">Add A New Product</span>
                                    <br />
                                    <form action="" onSubmit={ addProduct } >
                                        <div className="form__input">
                                            <input 
                                                type="url"
                                                value={ addImage }
                                                onChange={(event)=>{
                                                    setAddImage(event.target.value);
                                                }}
                                                placeholder="Image URL"
                                            />
                                        </div>
                                        <div className="form__input">
                                            {/* <i className="ri-lock-line"></i> */}
                                            <input 
                                                type="text"
                                                value={ addBrand } 
                                                onChange={(event)=>{
                                                    setAddBrand(event.target.value);
                                                }}
                                                placeholder="Brand"
                                            />
                                        </div>
                                        <div className="form__input">
                                            {/* <i className="ri-mail-line"></i> */}
                                            <input 
                                                type="text"
                                                value={ addName } 
                                                onChange={(event)=>{
                                                    setAddName(event.target.value);
                                                }}
                                                placeholder="Name"
                                            />
                                        </div>
                                        <div className="form__input">
                                            {/* <i className="ri-mail-line"></i> */}
                                            <input 
                                                type="text"
                                                value={ addDescription } 
                                                onChange={(event)=>{
                                                    setAddDescription(event.target.value);
                                                }}
                                                placeholder="Description"
                                            />
                                        </div>
                                        <div className="form__input">
                                            {/* <i className="ri-mail-line"></i> */}
                                            <input 
                                                type="number"
                                                value={ addPrice } 
                                                onChange={(event)=>{
                                                    setAddPrice(event.target.value);
                                                }}
                                                placeholder="Price"
                                            />
                                        </div>
                                        <div className="form__input">
                                            {/* <i className="ri-mail-line"></i> */}
                                            <input 
                                                type="text"
                                                value={ addSale } 
                                                onChange={(event)=>{
                                                    setAddSale(event.target.value);
                                                }}
                                                placeholder="Sale: true or false"
                                            />
                                        </div>
                                        <div className="form__input">
                                            {/* <i className="ri-mail-line"></i> */}
                                            <input 
                                                type="text"
                                                value={ addClearance } 
                                                onChange={(event)=>{
                                                    setAddClearance(event.target.value);
                                                }}
                                                placeholder="Clearance: true or false"
                                            />
                                        </div>
                                        <div className="form__input">
                                            {/* <i className="ri-mail-line"></i> */}
                                            <input 
                                                type="number"
                                                value={ addCatId } 
                                                onChange={(event)=>{
                                                    setAddCatId(event.target.value);
                                                }}
                                                placeholder="Category ID"
                                            />
                                        </div>
                                        <button type="submit" className="form__button" >Submit</button>
                                    </form>
                                </div>    
                            ): ""
                        }   
                    </div>
                                                                                                      
{/* ADMIN DELETE PRODUCT */}
                    
                    <div>
                        < AdminDeleteProduct 
                            isLoggedIn={isLoggedIn} 
                            setIsLoggedIn={setIsLoggedIn} 
                            userData={userData} 
                            setUserData={setUserData}
                            getUserData={getUserData}
                            productData={productData} 
                            setProductData={setProductData} 
                            getProductData={getProductData}
                            deleteProductBtn={deleteProductBtn}
                            setDeleteProductBtn={setDeleteProductBtn}
                        />
                    </div>
                                                                                  
{/* ADMIN EDIT/UPDATE PRODUCT */}
                    
                    <div>
                        < AdminEditProduct 
                            isLoggedIn={isLoggedIn} 
                            setIsLoggedIn={setIsLoggedIn} 
                            userData={userData} 
                            setUserData={setUserData}
                            getUserData={getUserData}
                            productData={productData} 
                            setProductData={setProductData} 
                            getProductData={getProductData}
                            editProductBtn={editProductBtn}
                            setEditProductBtn={setEditProductBtn}
                        />
                    </div>
                </div>
            }
        </section>
    )
}

export default Profile;


// {
//     listProductsBtn ? productData.map((singleProduct)=>{
//         return(
//             <div key={singleProduct.id} className="main-singleProduct">
//                 <hr></hr>
//                 <h3>Product: {singleProduct.id}
//                 <br></br>
//                 {singleProduct.brand} {singleProduct.name}</h3>
//                 <Link to={`/single/${singleProduct.id}`}><img src={singleProduct.image} className="singleProductImage"/></Link>
//                 <button onClick={ toggleDeleteProduct }>Delete</button>
//                 {/* {
//                     deleteProductBtn ? (
//                         <div className="form">
//                             <span className="form__title">Delete Product</span>
//                             <form action="" onSubmit={ (event) => deleteProduct(singleProduct.id, event) } >
//                                 <div className="form__button">Are you sure you want to delete {singleProduct.name}? Click Delete to confirm selection. </div>
//                                 <button type="submit" className="form__button" >Delete</button>
//                             </form>
//                         </div>    
//                     ): ""
//                 } */}
//                 <hr></hr>
                
//             </div>
//         )
//     }): ""
// }