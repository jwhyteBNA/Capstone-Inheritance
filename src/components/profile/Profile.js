import { Link } from "react-router-dom";

export const UserProfile = ({ id, fullName, photo }) => {

  const randomRotate = () => {
    const deg = Math.random() * (5 - -5) + -5;
    return 'rotate(' + deg + 'deg)';
    }

  return <section className="profile" style={{transform: randomRotate()}}>
      <div>
      <Link to={`/family_tree/${id}`}> <img className="profile_img" src={photo}/></Link>
        <h2><Link to={`/family_tree/${id}`}>{fullName}</Link></h2>
        </div>
    </section>
};