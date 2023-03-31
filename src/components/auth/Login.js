import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../ApiManager";
import "./Login.css";
import { FaLock, FaRegAddressBook, FaEye, FaEyeSlash } from "react-icons/fa";
import waveImage from "../../images/wave.png"
import avatar from "../../images/avatar.svg"
import logo from "../../images/logo.svg"

export const Login = () => {
  const [email, set] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible]= useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    login(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0];
        localStorage.setItem(
          "family_user",
          JSON.stringify({
            id: user.id,
            leader: user.isLeader,
          })
        );

        navigate("/");
      } else {
        window.alert("Invalid login - try again or register");
      }
    });
  };

  return ( <main>
      <img className="wave" src={waveImage} />
      <div className="login-container">
        <div className="logo-img">
          <img src={logo} />
        </div>
        <div className="login-content">
          <form className="login-form" onSubmit={handleLogin}>
            <img src={avatar} />
            <h2 className="login-title">Welcome</h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user">
                  <FaRegAddressBook />
                </i>
              </div>
              <div className="div">
                <input
                  type="email"
                  value={email}
                  onChange={(evt) => set(evt.target.value)}
                  className="input"
                  placeholder="Email address"
                  required
                  autoFocus
                />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock">
                  <FaLock />
                  <div className ="fas" onClick={() => setVisible(!visible)
                }> 
                    {
                        visible ? <FaEye/> : <FaEyeSlash/>
                    }

                </div>
                </i>
              </div>
              <div className="div">
                <input
                  type= {visible ? "text" : "password"}
                  value={password}
                  onChange={(evt) => setPassword(evt.target.value)}
                  className="input"
                  placeholder="Password"
                  required
                  autoFocus
                />
              </div>
            </div>
            <Link className="login-link" to="/register">Need to Register?</Link>
            <input type="submit" className="login-btn" value="Login" />
          </form>
        </div>
      </div>
    </main>
  );
};