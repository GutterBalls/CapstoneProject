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
            // console.log("Login info...",loginUser, loginPass);
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
        
            if(!transData.token){

                alert("Login was unsuccessful. Please try again or contact support. ");

            } else {
                const tokenKey = transData.token;
                
                localStorage.setItem("token", tokenKey);
                
                nav("/")
            };
        } catch(error){
            console.log("Error w/ logIn login.jsx 50", error)
        };
    };

    return(
        <div className="sign-up-log-in">

        <div className="form">
            {/* <span className="form__title">Login</span> */}
            <form action="" onSubmit={ logIn }>
                <span className="form__switch">
                    Log in to your account
                </span>
                <div className="form__input">
                    <i className="ri-user-line"></i>
                    <input 
                        type="text" 
                        placeholder="Username"
                        value={ loginUser }
                        onChange={(event)=> setLoginUser(event.target.value)}
                    />
                    <span className="bar"></span>
                </div>
                <div className="form__input">
                    <i className="ri-lock-line"></i>
                    <input 
                        type="password" 
                        placeholder="Password"
                        value={ loginPass }
                        onChange={(event)=> setLoginPass(event.target.value)}
                    />
                    <span className="bar"></span>
                </div>
                <button type="submit" className="form__button">Login</button>
                <span className="form__switch">
                </span>
                <span className="form__switch">
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </span>
            </form>
        </div>

    </div>
    )
}

export default Login;