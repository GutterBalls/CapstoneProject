import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = (props) => {
    const nav = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
            localStorage.removeItem("token");
            props.setIsLoggedIn(false);
            props.setCounter(0)
            nav("/");
        } else {
            console.log("No Token Exists");
        }
    }, [props.setIsLoggedIn, nav]);

    return <div></div>;
};

export default Logout;