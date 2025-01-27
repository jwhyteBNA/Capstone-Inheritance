import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getHeirUsers, createAssignedTreasure } from "../ApiManager";
import "./treasureForms.css";

export const TreasureAssignmentEdit = () => {
  const [users, setUsers] = useState([]);
  const [assignedTreasure, setAssigned] = useState({
    userId: "",
    treasureId: "",
    dateRequested:"",
    dateReviewed: Date.now(),
    itemApproval: "Approved"
  })
  const { treasureId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getHeirUsers().then((usersArray) => {
      setUsers(usersArray);
    });
  }, []);

  const handleSaveButtonClick = (event) => {
    event.preventDefault();
  
    const assignedTreasureToSendToAPI = {
      userId: parseInt(assignedTreasure.userId),
      dateRequested: "",
      dateReviewed: Date.now(),
      itemApproval: "Approved",
      treasureId: parseInt(treasureId),
    };

    createAssignedTreasure(assignedTreasureToSendToAPI)  
    .then(() => {
      navigate(`/treasure/${treasureId}`);
    })
  };

   return (
    <main className="treasure-content">
      <form className="treasure-form">
        <h2 className="treasure-formTitle">Edit Treasure Assignment</h2>
        <div className="form-group-treasure-type">
          <label className="treasureTypeLabel" htmlFor="treasure-type">
            Assigned User:
          </label>
          {users.map((user) => (
            <div key={user.id}>
              <input
                type="radio"
                id={`user-${user.id}`}
                name="user"
                value={user.id}
                onChange={(event) => {
                  const copy = { ...assignedTreasure };
                  copy.userId = event.target.value;
                  setAssigned(copy);
                }}
              />
              <label className="treasureTypeLabel" htmlFor={`user-${user.id}`}>{user.fullName}</label>
            </div>
          ))}
        </div>
        
        <button
          onClick={(clickEvent) =>
              handleSaveButtonClick(clickEvent)
            }
          className="btn__treasureForm"
        >
          Update Treasure Assignment
        </button>
      </form>
    </main>
  );
};
