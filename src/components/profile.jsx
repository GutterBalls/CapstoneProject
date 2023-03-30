const Profile = () => {

    return (
        <div className="homepage">
            <p>1 - Profile</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>

            <div class="form">
                <span class="form__title">Sign up</span>
                <form action="">
                    <div class="form__input">
                        <i class="ri-user-line"></i>
                        <input type="text" placeholder="Name"/>
                        <span class="bar"></span>
                    </div>
                    <div class="form__input">
                        <i class="ri-mail-line"></i>
                        <input type="text" placeholder="Email"/>
                        <span class="bar"></span>
                    </div>
                    <div class="form__input">
                        <i class="ri-lock-line"></i>
                        <input type="text" placeholder="Password"/>
                        <span class="bar"></span>
                    </div>
                    <div class="form__input">
                        <i class="ri-lock-line"></i>
                        <input type="text" placeholder="Confirm password"/>
                        <span class="bar"></span>
                    </div>
                    <button type="submit" class="form__button">Sign up</button>
                    <span class="form__switch">
                        Already have an account? <a href="#">Login</a>
                    </span>
                </form>
            </div>

        </div>
    )
}

export default Profile;