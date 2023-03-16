import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { login } from "../ApiManager";
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        login(email)
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("family_user", JSON.stringify({
                        id: user.id,
                        leader: user.isLeader
                    }))

                    navigate("/")
                }
                else {
                    window.alert("Invalid login - try again or register")
                }
            })
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Inheritance</h1>
                    <h2>Sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail">Email address</label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                    <label htmlFor="inputPassword">Password:</label>
                    <input type="password"
                        value= {password}
                        onChange={evt => setPassword(evt.target.value)}
                        className="form-control"
                        placeholder="Password"
                        required autoFocus />
                </fieldset>
                    <fieldset>
                        <button type="submit">
                            Enter
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Need to Register?</Link>
            </section>
        </main>
    )
}

