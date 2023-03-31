import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getApprovedAssignments,
  getHeirUsers,
  saveEditedTreasureAssignment,
} from "../ApiManager";

export const TreasureAssignmentEdit = () => {
  const [heirUsers, setHeirUsers] = useState([]);
  const [treasureAssignment, assignTreasureAssignment] = useState({
    userId: "",
  });
  const { treasureId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getApprovedAssignments(treasureId).then((data) => {
      assignTreasureAssignment(data);
    });
  }, [treasureId]);

  useEffect(() => {
    getHeirUsers().then((heirUsersArray) => {
      setHeirUsers(heirUsersArray);
    });
  }, []);

  const handleSaveButtonClick = (event) => {
    event.preventDefault();

    saveEditedTreasureAssignment(treasureAssignment).then(() => {
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
          {heirUsers.map((heirUser) => (
            <div key={heirUser.id}>
              <input
                type="radio"
                id={`hierUser-${heirUser.id}`}
                name="heirUser"
                value={heirUser.id}
                checked={heirUser.id}
                onChange={(event) => {
                  const copy = { ...treasureAssignment };
                  copy.userId = event.target.value;
                  assignTreasureAssignment(copy);
                }}
              />
              <label className="treasureTypeLabel" htmlFor={`heirUser-${heirUser.id}`}>{heirUser.fullName}</label>
            </div>
          ))}
        </div>
        
        <button
          onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
          className="btn btn-primary"
        >
          Update Treasure Assignment
        </button>
      </form>
    </main>
  );
};
