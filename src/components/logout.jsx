import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = ({ setIsLoggedIn }) => {
    const nav = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            nav("/");
        } else {
            console.log("No Token Exists");
        }
    }, [setIsLoggedIn, nav]);

    return <div></div>;
};

export default Logout;