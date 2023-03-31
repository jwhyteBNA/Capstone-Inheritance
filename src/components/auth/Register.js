import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register, registration } from "../ApiManager";
import {
  FaLock,
  FaUser,
  FaCameraRetro,
  FaPhoneAlt,
  FaHome,
  FaRegAddressBook,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import "./Login.css";
import waveImage from "../../images/wave.png";
import avatar from "../../images/avatar.svg";
import logo from "../../images/logo.svg";

export const Register = (props) => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    photo: "",
    phoneNumber: "None Available",
    address: "None Available",
    isLeader: false,
    isExecutor: false,
  });
  let navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const registerNewUser = () => {
    register(user).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "family_user",
          JSON.stringify({
            id: createdUser.id,
            leader: createdUser.isLeader,
          })
        );

        navigate("/login/");
        window.alert("You are now a registered user.");
      }
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    registration(user).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("An account with that email address already exists");
      } else {
        // Good email, create user.
        registerNewUser();
      }
    });
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };

  return (
    <main className ="login-background">
      <img className="wave" src={waveImage} />
      <div className="login-container">
        <div className="logo-img">
          <img src={logo} />
        </div>
        <div className="login-content">
          <form className="login-form" onSubmit={handleRegister}>
            <img src={avatar} />
            <h2 className="title">Sign Up</h2>
            <Link className="login-link" to="/login">
              Back to Login
            </Link>
            
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user">
                  <FaUser />
                </i>
              </div>
              <div className="div">
                <input
                  onChange={updateUser}
                  type="text"
                  id="fullName"
                  className="input"
                  placeholder="Full Name"
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user">
                  <FaRegAddressBook />
                </i>
              </div>
              <div className="div">
                <input
                  onChange={updateUser}
                  type="email"
                  id="email"
                  className="input"
                  placeholder="Email Address"
                  required
                />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock">
                  <FaLock />
                  <div className="fas" onClick={() => setVisible(!visible)}>
                    {visible ? <FaEye /> : <FaEyeSlash />}
                  </div>
                </i>
              </div>
              <div className="div">
                <input
                  onChange={updateUser}
                  type={visible ? "text" : "password"}
                  id="password"
                  className="input"
                  placeholder="Password"
                  required
                />
              </div>
            </div>
            <div className="input-div photo">
              <div className="i">
                <i className="fas fa-photo">
                  <FaCameraRetro />
                </i>
              </div>
              <div className="div">
                <input
                  onChange={updateUser}
                  type="text"
                  id="photo"
                  className="input"
                  placeholder="Profile Photo Link"
                  required
                />
              </div>
            </div>
            <div className="input-div phone">
              <div className="i">
                <i className="fas fa-phone">
                  <FaPhoneAlt />
                </i>
              </div>
              <div className="div">
                <input
                  onChange={updateUser}
                  type="text"
                  id="phoneNumber"
                  className="input"
                  placeholder="(Optional) Phone Number"
                />
              </div>
            </div>
            <div className="input-div phone">
              <div className="i">
                <i className="fas fa-phone">
                  <FaHome />
                </i>
              </div>
              <div className="div">
                <input
                  onChange={updateUser}
                  type="text"
                  id="addressr"
                  className="input"
                  placeholder="(Optional) Address"
                />
              </div>
            </div>
            <input
              type="submit"
              className="login-btn"
              value="Submit Registration"
            />
          </form>
        </div>
      </div>
    </main>
  );
};
