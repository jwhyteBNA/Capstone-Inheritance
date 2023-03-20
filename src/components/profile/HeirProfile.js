import { useEffect, useState } from "react"
import { getHeirProfile, updateHeirProfile } from "../ApiManager";

export const HeirProfile = () => {
    const[profile, updateProfile] = useState({
     email: "",
     address: "",
     phoneNumber:"",
    })

    const localFamilyUser = localStorage.getItem("family_user");
    const familyUserObject = JSON.parse(localFamilyUser);
    const [feedback, setFeedback] = useState("")

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    useEffect(
        () => {
            getHeirProfile(familyUserObject)
            .then((data) => {
                const singleProfile= data[0]
                updateProfile(singleProfile)
            })
        },
        []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        
updateHeirProfile(profile)
.then(() => {
    setFeedback("Your profile has successfully saved")
})
// .then(() => {
// })
    }

    return (
        <article>
        <div id="feedback_profile" className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
    {feedback}
</div>
        <form className="profile">
            <h2 className="profile__title">Profile Contact Information</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="email">Email Address:</label>
                    <input type="text"
                        className="form-control"
                        value={profile.email}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.email = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.address}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.address = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input type="text"
                        className="form-control"
                        value={profile.phoneNumber}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.phoneNumber = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
        </article>
    )
}