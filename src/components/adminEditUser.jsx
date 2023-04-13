import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DATABASE_URL = 'http://localhost:1337/api';

const AdminEditUser = (props) => {
    const { setIsLoggedIn, getUserData, getAllUsersData, userData, editUserAdminBtn, allUsers, setUserData, setEditUserAdminBtn  } = props;

    const [searchAdmin, setSearchAdmin] = useState([]);
    const [selectUser, setSelectUser] = useState([]);

    const nav = useNavigate();

        useEffect(() => {
            // getProductData();
        if (localStorage.getItem("token")) {
            setIsLoggedIn(true);
            getUserData();
            // getOrderHistory();
        if(userData.isAdmin === true){
            getAllUsersData();
        }    
            
        } else {
            setIsLoggedIn(false)
            console.log("No Token!")
        }
    }, [])

    function selectUserById(singleUser){
        setSelectUser(singleUser);

    }


    //Admin Edit User Form State 
    const [editUsername, setEditUsername ] = useState("");
    const [editPassword, setEditPassword ] = useState("");
    const [editEmail, setEditEmail] = useState("");

    // Admin - Edit/Update User
    const editUserAdmin = async (selectUser, event) => {
        event.preventDefault();

        const tokenKey = localStorage.getItem("token");

        try {
            const response = await fetch(`${DATABASE_URL}/users/${selectUser}`, {
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

            if (!transData){
                alert("User edit was not successful. Please try again. ");
            } else {

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
        <div>
            <div className='del-prod-form-cont'>
                {
                    editUserAdminBtn ? (
                        <div className="del-prod-form" onMouseLeave={() => document.getElementsByClassName('adm-search')[0].style.visibility = 'hidden'}>
{/* SEARCHBOX */}
                            <div className='adm-del'>
                                <h5>Choose User to edit/update:</h5>
                                <div> 
                                    <input className="adm-searchbox"
                                    type="search"
                                    placeholder="Search..."
                                    onChange={(event) => {
                                    setSearchAdmin(
                                        allUsers.filter((singleUser) => singleUser.username.toLowerCase().includes(event.target.value.toLowerCase())
                                        ));
                                    document.getElementsByClassName('adm-search')[0].style.visibility = 'visible'
                                    }} />
                                    
                                    <ul className="adm-search">
                                        { searchAdmin.map((singleUser) => {
                                            return(
                                                <li className="adm-indSearchItem" key={singleUser.id}>
                                                    <button onClick={() => { selectUserById(singleUser), document.getElementsByClassName('adm-search')[0].style.visibility = 'hidden' }} className='admin-upd-sb-res'>
                                                            {singleUser.id}
                                                            {' '}
                                                            {singleUser.username}
                                                            {' '}
                                                        </button>
                                                </li>
                                        )})}
                                    </ul>
                                    <h6>User ID selected: { selectUser.id }</h6>
                                    <h6>Username selected: { selectUser.username }</h6>
                                </div>
                            </div>
{/* ADMIN EDIT USER FORM */}   
                            <div>
                                <div className="form__title">
                                    Update user to:
                                </div>
                                <hr />
                                <div>
                                    <form action="" onSubmit={ (event) => editUserAdmin(selectUser.id, event) } >
                                        <div className="e-u-form-input">
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
                                        <div className="e-u-form-input">
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
                                        <div className="e-u-form-input">
                                            <i className="ri-mail-line"></i>
                                            <input 
                                                type="email"
                                                value={ editEmail } 
                                                onChange={(event)=>{
                                                    setEditEmail(event.target.value);
                                                }}
                                                placeholder="New Email"
                                            />
                                        </div>
                                        <hr />
                                        <button type="submit" className="form__button" >Submit</button>
                                    </form>
                                </div>
                            </div>  
                        </div>  
                    ): ""
                }
            </div>
        </div>
    )
}

export default AdminEditUser;





