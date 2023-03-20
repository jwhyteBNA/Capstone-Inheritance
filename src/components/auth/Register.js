import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { register, registration } from "../ApiManager"
import "./Login.css"

export const Register = (props) => {
    const [user, setUser] = useState({
        fullName: "",
        email: "",
        password: "",
        photo: "",
        phoneNumber: "None Available",
        address: "None Available",
        isLeader: false,
        isExecutor: false
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        register(user)
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("family_user", JSON.stringify({
                        id: createdUser.id,
                        leader: createdUser.isLeader
                    }))

                    navigate("/login/")
                    window.alert("You are now a registered user.")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        registration(user)
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("An account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for Inheritance</h1>
                <fieldset>
                    <label htmlFor="fullName"> Full Name </label>
                    <input onChange={updateUser}
                           type="text" id="fullName" className="form-control"
                           placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateUser}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="password"> Password </label>
                    <input onChange={updateUser}
                        type="password" 
                        id="password" 
                        className="form-control"
                        placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="photo"> Photo </label>
                    <input onChange={updateUser}
                        type="text" 
                        id="photo" 
                        className="form-control"
                        placeholder="Profile Photo Link" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="phoneNumber"> Phone Number </label>
                    <input onChange={updateUser}
                        type="text" 
                        id="phoneNumber" 
                        className="form-control"
                        placeholder="Phone Number" />
                </fieldset>
                <fieldset>
                    <label htmlFor="address"> Address </label>
                    <input onChange={updateUser}
                        type="text" 
                        id="address" 
                        className="form-control"
                        placeholder="Address"/>
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

