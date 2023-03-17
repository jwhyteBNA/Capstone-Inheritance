import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createMemory } from "../ApiManager";

export const NewMemoryForm = () => {
  const { treasureId } = useParams();
  const navigate = useNavigate();
  const [memory, setMemory] = useState({
    userId: "",
    treasureId: "",
    description: "",
  });

  const memoryTreasureId = treasureId
  const localFamilyUser = localStorage.getItem("family_user");
  const familyUserObject = JSON.parse(localFamilyUser);

  const handleSaveButtonClick = (event) => {
    event.preventDefault();

    const memoryToSendToAPI = {
      userId: parseInt(familyUserObject.id),
      treasureId: parseInt(memoryTreasureId),
      description: memory.description,
    };

     createMemory(memoryToSendToAPI)
    .then(() => {
      navigate(`/treasure/${treasureId}`);
    })
  };

  return (
    <form className="memoryForm">
      <h2 className="memoryForm__title">Add Your Memory!</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Memory Description:</label>
          <textarea
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="Share your Memory - the more detail, the better!"
            value={memory.description}
            onChange={(event) => {
              const copy = { ...memory };
              copy.description = event.target.value;
              setMemory(copy);
            }}
          />
        </div>
      </fieldset>
      <button
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="btn btn-primary"
      >
        Submit Your Memory
      </button>
    </form>
  );
};
