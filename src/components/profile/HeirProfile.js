import { useEffect, useState } from "react";
import { getHeirProfile, updateHeirProfile } from "../ApiManager";
import {
  FaRegAddressBook,
  FaPhoneAlt,
  FaHome,
  FaCameraRetro,
} from "react-icons/fa";
import "./profile.css";

export const HeirProfile = () => {
  const [profile, updateProfile] = useState({
    email: "",
    address: "",
    phoneNumber: "",
    photo: "",
  });

  const localFamilyUser = localStorage.getItem("family_user");
  const familyUserObject = JSON.parse(localFamilyUser);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (feedback !== "") {
      // Clear feedback to make entire element disappear after 3 seconds
      setTimeout(() => setFeedback(""), 3000);
    }
  }, [feedback]);

  useEffect(() => {
    getHeirProfile(familyUserObject).then((data) => {
      const singleProfile = data[0];
      updateProfile(singleProfile);
    });
  }, []);

  const handleSaveButtonClick = (event) => {
    event.preventDefault();

    updateHeirProfile(profile).then(() => {
      setFeedback("Your profile has successfully saved");
    });
    // .then(() => {
    // })
  };

  return (
    <article className="profile-content">
      <div
        id="feedback_profile"
        className={`${feedback.includes("Error") ? "error" : "feedback"} ${
          feedback === "" ? "invisible" : "visible"
        }`}
      >
        {feedback}
      </div>
      <form className="profile-form">
        <h2>Profile Contact Information</h2>

        <div className="form-group">
          <div className="icon">
            <i className="fas fa-user">
              <FaRegAddressBook />
            </i>
          </div>
          <div className="div">
            <input
              type="text"
              className="form-control"
              value={profile.email}
              onChange={(evt) => {
                const copy = { ...profile };
                copy.email = evt.target.value;
                updateProfile(copy);
              }}
            />
          </div>
        </div>

        <div className="form-group">
        <div className="icon">
                <i className="fas fa-user">
                  <FaHome />
                </i>
              </div>
          <div className="div">
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            value={profile.address}
            onChange={(evt) => {
              const copy = { ...profile };
              copy.address = evt.target.value;
              updateProfile(copy);
            }}
          />
        </div>
        </div>

        <div className="form-group">
        <div className="icon">
                <i className="fas fa-user">
                  <FaPhoneAlt />
                </i>
              </div>
          <div className="div">
          <input
            type="text"
            className="form-control"
            value={profile.phoneNumber}
            onChange={(evt) => {
              const copy = { ...profile };
              copy.phoneNumber = evt.target.value;
              updateProfile(copy);
            }}
          />
        </div>
        </div>

        <div className="form-group">
        <div className="icon">
                <i className="fas fa-user">
                  <FaCameraRetro />
                </i>
              </div>
          <div className="div">
          <input
            type="text"
            className="form-control"
            value={profile.photo}
            onChange={(evt) => {
              const copy = { ...profile };
              copy.photo = evt.target.value;
              updateProfile(copy);
            }}
          />
        </div>
        </div>

        <button
          onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
          className="btn btn__profile"
        >
          Save Profile
        </button>
      </form>
    </article>
  );
};
