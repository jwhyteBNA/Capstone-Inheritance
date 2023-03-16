import { Link } from "react-router-dom";
import { deleteTreasure } from "../ApiManager";

export const Treasure = ({ treasureObject, getAllTreasures,
}) => {

const localFamilyUser = localStorage.getItem("family_user")
const familyUserObject = JSON.parse(localFamilyUser)

  const deleteButton = () => {
    if (familyUserObject.leader) {
      return (
        <button
          onClick={() => {
            deleteTreasure(treasureObject).then(() => {
              getAllTreasures()
            })
    }}   
          className="treasure__delete"
        >
          {" "}
          Delete Treasure
        </button>
      );
    } else {
      return "";
    }
  };

  return <section className="treasure" key={`treasure--${treasureObject.id}`}>
      <img className="treasure_img" src={treasureObject?.photoLink}/>
      <Link to={`/treasure/${treasureObject.id}`}>{treasureObject?.name}</Link>
      <span>{treasureObject?.treasureType?.name}</span>
      <footer className="treasure__footer">
       {deleteButton()}
      </footer>
    </section>
};