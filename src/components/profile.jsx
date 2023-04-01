import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const DATABASE_URL = 'http://localhost:1337/api';

const Profile = () => {
    const [ newUser, setNewUser] = useState("");
    const [ newPass, setNewPass] = useState("");
    const [ newEmail, setNewEmail] = useState("");
    const [ confirmPass, setConfirmPass] = useState("");

    const nav = useNavigate();

    async function registerUser(event){
        event.preventDefault();
        
        try{
            if (newPass.length < 8){
                alert("Your password needs to be at least 8 characters");
                return
            } else if(newUser.length < 6){
                alert("Your username needs to be at least 6 characters")
                return
            }
            if(newPass != confirmPass){
                alert("Passwords do not match, Please try again.")
                setNewPass("");
                setConfirmPass("");
                return
            }
            const response = await fetch(`${DATABASE_URL}/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: newUser,
                    password: newPass,
                    email: newEmail,
                    isAdmin: false
                })
            })
            const transData = await response.json();
            console.log(transData);

            if(!transData){
                alert("Account Registration Unsuccessful")
            } else {
                const tokenKey = transData.token;
                console.log(tokenKey);
                localStorage.setItem("token", tokenKey);
                alert("New Account was successfully created.")
                nav("/")
            }
        } catch(error){
            console.log(error)
        }
    }

    return (
        <div className="homepage">

            <div class="form">
                <span class="form__title">Sign up</span>
                <form action="" onSubmit={ registerUser }>
                    <div class="form__input">
                        <i class="ri-user-line"></i>
                        <input 
                            type="text" 
                            placeholder="Username"
                            value={ newUser }
                            onChange={(event)=> setNewUser(event.target.value)}
                        />
                        <span class="bar"></span>
                    </div>
                    <div class="form__input">
                        <i class="ri-mail-line"></i>
                        <input 
                            type="text" 
                            placeholder="Email"
                            value={ newEmail }
                            onChange={(event)=> setNewEmail(event.target.value)}
                        />
                        <span class="bar"></span>
                    </div>
                    <div class="form__input">
                        <i class="ri-lock-line"></i>
                        <input 
                            type="password" 
                            placeholder="Password"
                            value={ newPass }
                            onChange={(event)=> setNewPass(event.target.value)}
                        />
                        <span class="bar"></span>
                    </div>
                    <div class="form__input">
                        <i class="ri-lock-line"></i>
                        <input 
                            type="password" 
                            placeholder="Confirm password"
                            value={ confirmPass }
                            onChange={(event)=> setConfirmPass(event.target.value)}
                        />
                        <span class="bar"></span>
                    </div>
                    <button type="submit" class="form__button">Sign up</button>
                    <span class="form__switch">
                        Already have an account? <Link to="/login">Login</Link>
                    </span>
                </form>
            </div>

        </div>
    )
}

export default Profile;