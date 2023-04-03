import { useState } from "react";
import { MemoryRouter, useNavigate, useParams } from "react-router-dom";
import { createMemory } from "../ApiManager";
import "./memory.css";
import { FaFileVideo, FaCameraRetro, FaComment } from "react-icons/fa";

export const NewMemoryForm = () => {
  const { treasureId } = useParams();
  const navigate = useNavigate();
  const [memory, setMemory] = useState({
    userId: "",
    treasureId: "",
    description: "",
    photoLink: "",
    videoLink: ""
  });

  const memoryTreasureId = treasureId;
  const localFamilyUser = localStorage.getItem("family_user");
  const familyUserObject = JSON.parse(localFamilyUser);

  const handleSaveButtonClick = (event) => {
    event.preventDefault();

    const memoryToSendToAPI = {
      userId: parseInt(familyUserObject.id),
      treasureId: parseInt(memoryTreasureId),
      description: memory.description,
      photoLink: memory.photoLink,
      videoLink: memory.videoLink
    };

    createMemory(memoryToSendToAPI).then(() => {
      navigate(`/treasure/${treasureId}`);
    });
  };

  return (
    <main className="memory-content">
    <form className="memory-form">
      <h2 className="memory-formTitle">Add Your Memory!</h2>
      
        <div className="form-textarea">
        <div className="icon">
                <i className="fas fa-user">
                  <FaComment />
                </i>
              </div>
          <textarea
            autoFocus
            rows="7"
            cols="75"
            type="text"
            className="form-controltext"
            placeholder="Share your Memory - the more detail, the better!"
            value={memory.description}
            onChange={(event) => {
              const copy = { ...memory };
              copy.description = event.target.value;
              setMemory(copy);
            }}
          />
        </div>
      
        <div className="form-group">
        <div className="icon">
                <i className="fas fa-user">
                  <FaFileVideo />
                </i>
              </div>
          <div className="memory-form-input">
          <input
          type="url"
          id="video"
          className="form-control"
          placeholder="Optional Video Link"
          value={memory.videoLink}
          onChange={(event) => {
            const copy = { ...memory };
            copy.videoLink = event.target.value;
            setMemory(copy);
          }}
        />
        </div>
        </div>
      
        <div className="form-group">
        <div className="icon">
                <i className="fas fa-user">
                  <FaCameraRetro />
                </i>
              </div>
          <div className="memory-form-input">
        <input
          type="text"
          id="photo"
          className="form-control"
          placeholder="Optional Photo Link"
          value={memory.photoLink}
          onChange={(event) => {
            const copy = { ...memory };
            copy.photoLink = event.target.value;
            setMemory(copy);
          }}
        />
        </div>
        </div>
      
      <button
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="btn btn__memory"
      >
        Submit Your Memory
      </button>
    </form>
    </main>
  );
};
