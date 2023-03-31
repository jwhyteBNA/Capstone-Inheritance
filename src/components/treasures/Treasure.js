import { Link } from "react-router-dom";
import { createTreasureRequest, deleteTreasure } from "../ApiManager";
import "./treasures.css";

export const Treasure = ({ treasureObject, getAllTreasures, currentUser
}) => {

const requestButton = () => {
  if (currentUser.leader) {
    return ""
  } else {
    const requestedAlready = treasureObject.assignedTreasures.find((assignedTreasure) => {
return assignedTreasure.userId === currentUser.id || assignedTreasure.itemApproval === "Approved"
    }) 
    if (!requestedAlready){
      return (
      <button
      className="btn btn_request"
      onClick={() => {
        createTreasureRequest(currentUser, treasureObject)
      .then(() => {
        getAllTreasures()
    })
  }}
  >
    Request
    </button>
  )}}}

  const deleteButton = () => {
    if (currentUser.leader) {
      return (
        <button className="btn btn__deleteTreasure"
          onClick={() => {
            deleteTreasure(treasureObject).then(() => {
              getAllTreasures()
            })
    }}   
          
        >
          {" "}
          Delete Treasure
        </button>
      );
    } else {
      return "";
    }
  };

const randomRotate = () => {
    const deg = Math.random() * (5 - -5) + -5;
    return 'rotate(' + deg + 'deg)';
    }

  return <section className="treasure" key={`treasure--${treasureObject.id}`} style={{transform: randomRotate()}}>
      <figure className="treasure__figure"><Link to={`/treasure/${treasureObject.id}`}><img className="treasure_img" src={treasureObject?.photoLink}/></Link></figure>
      <Link to={`/treasure/${treasureObject.id}`}><h3>{treasureObject?.name}</h3></Link>
      <span className="treasure_type">{treasureObject?.treasureType?.name}</span>
      <footer className="treasure__footer">
       {deleteButton()}
       {treasureObject.id===treasureObject.assignedTreasures?.treasureId ? ("") : (requestButton())}
      </footer>
    </section>
};