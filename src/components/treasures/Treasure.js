import { Link } from "react-router-dom";
import { createTreasureRequest, deleteTreasure } from "../ApiManager";

export const Treasure = ({ treasureObject, getAllTreasures, currentUser
}) => {

const requestButton = () => {
  if (currentUser.leader) {
    return ""
  } else {
      return (
      <button
      className="btn btn-request"
      onClick={() => {
        createTreasureRequest(currentUser, treasureObject)
      .then(() => {
        getAllTreasures()
    })
  }}
  >
    Request
    </button>
  )}}

  const deleteButton = () => {
    if (currentUser.leader) {
      return (
        <button
          onClick={() => {
            deleteTreasure(treasureObject).then(() => {
              getAllTreasures()
            })
    }}   
          className="btn btn__deleteTreasure"
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
       {treasureObject.id===treasureObject.assignedTreasures?.treasureId ? ("") : (requestButton())}
      </footer>
    </section>
};