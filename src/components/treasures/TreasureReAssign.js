import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getHeirUsers, saveEditedTreasureAssignment, getApprovedAssignments, deleteTreasureAssignment } from "../ApiManager";
import "./treasureForms.css";

export const TreasureReAssign = () => {
  const [users, setUsers] = useState([]);
  const [assignment, updateAssigned] = useState({
    userId: ""
  })
  const { treasureId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getApprovedAssignments(treasureId)
    .then((data) => {
        const singleAssignment = data[0]
      updateAssigned(singleAssignment);
    })
}, [])

  useEffect(() => {
    getHeirUsers().then((usersArray) => {
      setUsers(usersArray);
    });
  }, []);

  const handleSaveButtonClick = (event) => {
    event.preventDefault();
  
    saveEditedTreasureAssignment(assignment)  
      .then(() => {
        navigate(`/treasure/${treasureId}`);
      })
  };

  const handleDeleteButtonClick = (event) => {
    event.preventDefault();
    
    deleteTreasureAssignment(assignment)
          .then(() => {
            navigate(`/treasure/${treasureId}`);
          });
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
                checked={user.id === assignment.userId}
                onChange={(event) => {
                  const copy = { ...assignment };
                  copy.userId = parseInt(event.target.value);
                  updateAssigned(copy);
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
        <button
          onClick={(clickEvent) =>
              handleDeleteButtonClick(clickEvent)
            }
          className="btn__deleteAsmt"
        >
          Delete Treasure Assignment
        </button>
      </form>
    </main>
  );
};
