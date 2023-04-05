import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DATABASE_URL = 'http://localhost:1337/api';

const Profile = (props) => {
    const { getUserData, userData, setUserData, isLoggedIn, setIsLoggedIn } = props;

    const nav = useNavigate();

//User Button (Edit Form)
    const [editUserBtn, setEditUserBtn] = useState (false);
    const [orderHistoryBtn, setOrderHistoryBtn]= useState(false);
//Admin Button (List All Users) 
    const [listUsersBtn, setListUsersBtn] = useState (false);

//User Edit Form State 
    const [editUsername, setEditUsername ] = useState("");
    const [editPassword, setEditPassword ] = useState("");
    const [editEmail, setEditEmail] = useState("");
//User Order History State
    const [orderData, setOrderData] = useState([]);

//Admin - List Users State 
    const [allUsers, setAllUsers] = useState([]);

// toggle edit user form (button) 
    function toggleEditUserForm() {
        setEditUserBtn(!editUserBtn)
    };
// toggle Order History(button) 
    function toggleOrderHistory() {
        setOrderHistoryBtn(!orderHistoryBtn)
    };
// Admin - toggle list users(button)
    function toggleListUsers() {
        setListUsersBtn(!listUsersBtn)
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


// Edit/Update User
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
                console.log(transData);

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
                alert("User was successfully updated.");
// reset form
                setEditUserBtn(false);
                setEditUsername("");
                setEditPassword("");
                setEditEmail("");
                nav("/")
            }
        } catch (error){
            console.log(error);
        }
    };

// Get User order history
    async function getOrderHistory() {
        try{
            const response = await fetch(`${DATABASE_URL}/orders/${userData.id}`
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
            });
            const translatedData = await response.json();
            console.log("translated Data:",translatedData);
            setOrderData(translatedData);
            console.log(orderData);
            return translatedData

        } catch (error) {
            console.error("Error with orderHistory function", error);
        };
    }

//Admin - Get all users 
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
            console.log("Translated Data", translatedData);
            setAllUsers(translatedData);

            } catch (error) {
                console.error("Error with getAllUsersData function", error);
            };
        };

//Admin - Delete user
    async function deleteUser(event){
        try{
            const response = await fetch(`${DATABASE_URL}/users/${userData.id}`
            , {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
            });
            const translatedData = await response.json();
            console.log("Translated Data", translatedData);
            if(!translatedData){
                alert("User was not deleted. Please try again.")
            } else{
                alert("User was delete.")
            }
            
        } catch (error) {
            console.error("Error with deleteUser function", error);
        };
    };


    return (
        <div className="homepage">
            {
                userData.isAdmin === false ? 
                    <div key={userData.id} className="singleProduct">
                        <div className="itemInfoFlex">
                            <h1> Profile</h1>
                            <h3> Welcome {userData.username},</h3>
                            <button onClick={ toggleEditUserForm}>Edit User</button>
                            {
                                editUserBtn ? (
                                    <div class="form">
                                        <span class="form__title">Edit/Update</span>
                                        <form action="" onSubmit={ editUser } >
                                            <div class="form__input">
                                                <i class="ri-user-line"></i>
                                                <input 
                                                    type="text"
                                                    value={ editUsername }
                                                    onChange={(event)=>{
                                                        setEditUsername(event.target.value);
                                                    }}
                                                    placeholder="New Username"
                                                />
                                            </div>    
                                            <div class="form__input">
                                                <i class="ri-lock-line"></i>
                                                <input 
                                                    type="password"
                                                    value={ editPassword } 
                                                    onChange={(event)=>{
                                                        setEditPassword(event.target.value);
                                                    }}
                                                    placeholder="New Password"
                                                />
                                            </div>
                                            <div class="form__input">
                                                <i class="ri-mail-line"></i>
                                                <input 
                                                    type="text"
                                                    value={ editEmail } 
                                                    onChange={(event)=>{
                                                        setEditEmail(event.target.value);
                                                    }}
                                                    placeholder="New Email"
                                                />
                                            </div>
                                            <button type="submit" class="form__button" >Submit</button>
                                        </form>
                                    </div>    
                                ): ""
                            }
                            <button onClick={ toggleOrderHistory }>Order History</button>
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
                                        <h3>Username: {singleUser.username}
                                            <button onClick={ deleteUser }>Delete User</button>
                                        </h3>
                                        <hr></hr>
                                    </div>
                                    
                                )
                            }): ""
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Profile;