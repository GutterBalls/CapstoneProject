import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DATABASE_URL = 'http://localhost:1337/api';

const Profile = (props) => {
    const { getUserData, userData, setUserData, isLoggedIn, setIsLoggedIn } = props;

    const nav = useNavigate();

//User Button (Edit Form)
    const [editUserBtn, setEditUserBtn] = useState (false);
//User Button (Order History List)
    const [orderHistoryBtn, setOrderHistoryBtn]= useState(false);

//Admin Button (List All Users) 
    const [listUsersBtn, setListUsersBtn] = useState (false);
//Admin Button (Edit User Form)    
    const [editUserAdminBtn, setEditUserAdminBtn] = useState (false);

//User Edit Form State 
    const [editUsername, setEditUsername ] = useState("");
    const [editPassword, setEditPassword ] = useState("");
    const [editEmail, setEditEmail] = useState("");
//User Order History State
    const [orderData, setOrderData] = useState([]);

//Admin - List Users State 
    const [allUsers, setAllUsers] = useState([]);

// User - toggle edit user form (button) 
    function toggleEditUserForm() {
        setEditUserBtn(!editUserBtn)
    };
// User - toggle Order History(button) 
    function toggleOrderHistory() {
        setOrderHistoryBtn(!orderHistoryBtn)
    };

// Admin - toggle list users(button)
    function toggleListUsers() {
        setListUsersBtn(!listUsersBtn)
    };
// Admin - toggle edit users(button)
    function toggleEditUserAdmin() {
        setEditUserAdminBtn(!editUserAdminBtn)
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setIsLoggedIn(true);
            getUserData();
            getOrderHistory();
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

// Admin - Disable user
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
            const translatedData = await response.json();
            // console.log("Translated Data", translatedData);
            if(!translatedData){
                alert("User was not disabled. Please try again.")
            } else{
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


    return (
        <section className="main-container profile-mc">
            {
                userData.isAdmin === false ? 
                    <div key={userData.id} className="main-full-width profile-fw">
                        <div className="">
                            <h1> Profile</h1>
                            <h3> Welcome {userData.username},</h3>
                            <button onClick={ toggleEditUserForm} className="atc-btn eu-btn">Edit User</button>
                            <br />
                            {
                                editUserBtn ? (
                                    <div className="form">
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
                            <button onClick={ toggleOrderHistory } className="atc-btn oh-btn">Order History</button>
                            <div>
                                {
                                    orderHistoryBtn ? orderData.map((singleOrder)=>{
                                        return(
                                            <div key={singleOrder.id}>
                                                <hr></hr>
                                                <h3>ID: {singleOrder.id}</h3>
                                                <h3>Order Date: {singleOrder.order_date}</h3>
                                                <h3>Order Status: {singleOrder.order_status}</h3>
                                                <hr></hr>
                                            </div>
                                        )
                                    }) : ""
                                }
                            </div>
                        </div>
                    </div>
                : 
                <div>
                    <h1> Welcome Administrator</h1>
                    <h3> Username: {userData.username}</h3>
                    <button onClick={ toggleListUsers}>List All Users</button>
                    <div>
                        {
                            listUsersBtn ? allUsers.map((singleUser)=>{
                                return(
                                    <div key={singleUser.id}>
                                        <hr></hr>
                                        <h3>ID: {singleUser.id}</h3>
                                        <h3>Username: {singleUser.username}</h3>
                                        <h3>Status: {singleUser.isActive ? "Active" : "Inactive"}</h3>
                                        <button onClick={(event) => disableUser(singleUser.id, event)}>Disable Account</button>
                                        <button onClick={ toggleEditUserAdmin }>Edit User</button>
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
                                        <hr></hr>
                                    </div>
                                    
                                )
                            }): ""
                        }
                    </div>
                </div>
            }
        </section>
    )
}

export default Profile;