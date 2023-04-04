import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';

const DATABASE_URL = 'http://localhost:1337/api';

const Profile = (props) => {
    const { getUserData, userData, setUserData, isLoggedIn } = props;

    const nav = useNavigate();

    const [editUserBtn, setEditUserBtn] = useState (false);

    const [editUsername, setEditUsername ] = useState("");
    const [editPassword, setEditPassword ] = useState("");
    const [editEmail, setEditEmail] = useState("");

// toggle edit user form (button) 
    function toggleEditUserForm() {
        setEditUserBtn(!editUserBtn)
    };

    useEffect(() => {
        if (localStorage.getItem("token")){
            getUserData();
        };
    }, [isLoggedIn]);

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
                        if(currentUser.id != userData.id){
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
                            </div>
                        </div>
                : 
                <div>
                    <h1> Welcome Administrator</h1>
                    <h3> Username: {userData.username}</h3>
                    <div></div>
                </div>
            }
        </div>
    )
}

export default Profile;