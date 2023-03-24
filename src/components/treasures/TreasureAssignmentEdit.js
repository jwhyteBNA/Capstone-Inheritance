import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getApprovedAssignments, getHeirUsers, saveEditedTreasureAssignment } from "../ApiManager"

export const TreasureAssignmentEdit = () => {
    const [heirUsers, setHeirUsers] = useState([]);
    const [treasureAssignment, assignTreasureAssignment] = useState({
        userId: ""
    })
      const { treasureId } = useParams()
      const navigate = useNavigate()
        
    useEffect(() => {
            getApprovedAssignments(treasureId)
            .then((data) => {
              assignTreasureAssignment(data);
            })
        }, [treasureId])

    
    useEffect(() => {
            getHeirUsers()
            .then((heirUsersArray) => {
              setHeirUsers(heirUsersArray);
            });
          },
          []
        );

    const handleSaveButtonClick = (event) => {
        event.preventDefault()   
     
saveEditedTreasureAssignment(treasureAssignment)
.then(() => {
    navigate(`/treasure/${treasureId}`)

    })
}

return <form className="treasureForm">
<h2 className="treasureForm__title">Edit Treasure Assignment</h2>
<fieldset>
        <div className="form-group">
          <label htmlFor="heir">Assigned Heir:</label>
          <select
            value={treasureAssignment?.userId}
            onChange={(evt) => {
              const copy = { ...treasureAssignment };
              copy.userId = evt.target.value;
              assignTreasureAssignment(copy);
            }}
          >
            {" "}
            <option value="">Select An Assigned Heir</option>
            {heirUsers.map((heirUser) => (
              <option key={heirUser.id} value={heirUser.id}>
                {heirUser.fullName}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
<button
  onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
  className="btn btn-primary"
>
  Update Treasure Assignment
</button>
</form>

}