import { Link } from "react-router-dom";

export const UserProfile = ({ id, fullName, photo }) => {
  return <section className="profile">
      <div>
        <img className="profilePhoto" src={photo}/>
        <Link to={`/users/${id}`}>{fullName}</Link>
        </div>
    </section>
};