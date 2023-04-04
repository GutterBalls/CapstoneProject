import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const DATABASE_URL = 'http://localhost:1337/api';

const Login = (props) =>{
    const { getUserData, isLoggedIn } = props;
    const [loginUser, setLoginUser] = useState("");
    const [loginPass, setLoginPass] = useState("");

    const nav = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")){
            getUserData();
            };
    }, [isLoggedIn]);

    async function logIn(event){
        event.preventDefault();
        try{

            const response = await fetch(`${DATABASE_URL}/users/login`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: loginUser,
                    password: loginPass
                })
            });
            const transData = await response.json();

            if(!transData){
                alert("Login was unsuccessful. Please try again. ");
            } else {
                const tokenKey = transData.token;
                console.log(tokenKey);
                localStorage.setItem("token", tokenKey);
                alert("Login was successful");
                nav("/")
            }
        } catch(error){
            console.log(error)
        }
    }

    return(
        <div className="homepage">

        <div class="form">
            <span class="form__title">Login</span>
            <form action="" onSubmit={ logIn }>
                <div class="form__input">
                    <i class="ri-user-line"></i>
                    <input 
                        type="text" 
                        placeholder="Username"
                        value={ loginUser }
                        onChange={(event)=> setLoginUser(event.target.value)}
                    />
                    <span class="bar"></span>
                </div>
                <div class="form__input">
                    <i class="ri-lock-line"></i>
                    <input 
                        type="password" 
                        placeholder="Password"
                        value={ loginPass }
                        onChange={(event)=> setLoginPass(event.target.value)}
                    />
                    <span class="bar"></span>
                </div>
                <button type="submit" class="form__button">Login</button>
                <span class="form__switch">
                </span>
            </form>
        </div>

    </div>
    )
}

export default Login;