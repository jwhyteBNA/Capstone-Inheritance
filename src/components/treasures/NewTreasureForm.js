import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAssignedTreasure, createTreasureItem, getAllTreasureTypes, getHeirUsers } from "../ApiManager";
import {  
  FaCameraRetro,
  FaComment, FaMapPin, FaDollarSign } from "react-icons/fa";
import "./treasureForms.css";

export const NewTreasureForm = () => {
  const [treasureTypes, setTreasureTypes] = useState([]);
  const [ heirUsers, setHeirUsers ] = useState([]);
  const navigate = useNavigate();
  const [treasure, setTreasure] = useState({
    userId: "",
    name: "",
    description: "",
    treasureTypeId: "",
    photoLink: "",
    valuation: "",
  });
const [assignedTreasure, setAssigned] = useState({
  userId: "",
  treasureId: "",
  dateRequested:"",
  dateReviewed: Date.now(),
  itemApproval: "Approved"
})

  const localFamilyUser = localStorage.getItem("family_user");
  const familyUserObject = JSON.parse(localFamilyUser);

  const handleSaveButtonClick = (event) => {
    event.preventDefault();

    const treasureToSendToAPI = {
      userId: parseInt(familyUserObject.id),
      name: treasure.name,
      description: treasure.description,
      treasureTypeId: parseInt(treasure.treasureTypeId),
      photoLink: treasure.photoLink,
      valuation: parseFloat(treasure.valuation),
    };

    const assignedTreasureToSendToAPI = {
      userId: parseInt(familyUserObject.id),
      dateRequested: "",
      dateReviewed: Date.now(),
      itemApproval: "Approved"
    };

    createTreasureItem(treasureToSendToAPI)
    .then((treasure) => {
      assignedTreasureToSendToAPI.treasureId = treasure.id
      return createAssignedTreasure(assignedTreasureToSendToAPI)
    })
    .then(() => {
      navigate("/treasure");
    })
  };

  const handleHeirSaveButtonClick = (event) => {
    event.preventDefault();

    const treasureToSendToAPI = {
      userId: parseInt(familyUserObject.id),
      name: treasure.name,
      description: treasure.description,
      treasureTypeId: parseInt(treasure.treasureTypeId),
      photoLink: treasure.photoLink,
      valuation: parseFloat(treasure.valuation),
    };

    const requestedTreasureToSendToAPI = {
      userId: parseInt(familyUserObject.id),
      dateRequested: Date.now(),
      dateReviewed: "",
      itemApproval: "Pending"
    };

    createTreasureItem(treasureToSendToAPI)
    .then((treasure) => {
      requestedTreasureToSendToAPI.treasureId = treasure.id
      return createAssignedTreasure(requestedTreasureToSendToAPI)
    })
    .then(() => {
      navigate("/treasure");
    })
  };

  useEffect(() => {
      getAllTreasureTypes()
      .then((treasureTypesArray) => {
        setTreasureTypes(treasureTypesArray);
      });
    },
    []
  );

  useEffect(() => {
    getHeirUsers().then((heirUserArray) => {
      setHeirUsers(heirUserArray)
    })
  },
  []
  )

  return (
    <main className="treasure-content">
    <form className="treasure-form">
      <h2 className="treasure-formTitle">Add A New Treasure</h2>
      
      <div className="form-group">
      <div className="icon">
                <i className="fas fa-user">
                  <FaMapPin />
                </i>
              </div>
        <div className="div">
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="Name of item?"
            value={treasure.name}
            onChange={(event) => {
              const copy = { ...treasure };
              copy.name = event.target.value;
              setTreasure(copy);
            }}
          />
           </div>
        </div>
      
   
        <div className="form-group">
        <div className="icon">
                <i className="fas fa-user">
                  <FaComment />
                </i>
              </div>
          <div className="treasure-form-input">
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="Brief description of item/where it can be found"
            value={treasure.description}
            onChange={(event) => {
              const copy = { ...treasure };
              copy.description = event.target.value;
              setTreasure(copy);
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
          <div className="treasure-form-input">
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="Image Link"
            value={treasure.photoLink}
            onChange={(event) => {
              const copy = { ...treasure };
              copy.photoLink = event.target.value;
              setTreasure(copy);
            }}
          />
          </div>
        </div>
      
      
        <div className="form-group">
        <div className="icon">
                <i className="fas fa-user">
                  <FaDollarSign />
                </i>
              </div>
          <div className="treasure-form-input">
          <input
            required
            autoFocus
            type="number"
            className="form-control"
            placeholder="Monetary Value"
            value={treasure.valuation}
            onChange={(event) => {
              const copy = { ...treasure };
              copy.valuation = parseFloat(event.target.value, 2);
              setTreasure(copy);
            }}
          />
           </div>
        </div>
      
  <div className="form-group-treasure-type">
    <label className="treasureTypeLabel" htmlFor="treasure-type">Treasure Type:</label>
    {treasureTypes.map((treasureType) => (
      <div key={treasureType.id}>
        <input
          type="radio"
          id={`treasureType-${treasureType.id}`}
          name="treasureType"
          value={treasureType.id}
          onChange={(event) => {
            const copy = { ...treasure };
            copy.treasureTypeId = event.target.value;
            setTreasure(copy);
          }}
        />
        <label className="treasureTypeLabel" htmlFor={`treasureType-${treasureType.id}`}>
          {treasureType.name}
        </label>
      </div>
    ))}
  </div>

      {familyUserObject.leader? (
      
        <div className="form-group-heir">
          <label htmlFor="heir"></label>
          <select
            value={assignedTreasure.heirUserId}
            onChange={(evt) => {
              const copy = { ...assignedTreasure };
              copy.userId = evt.target.value;
              setAssigned(copy);
            }}
          >
            {" "}
            <option value="">Select An Assigned Heir (Optional)</option>
            {heirUsers.map((heirUser) => (
              <option key={heirUser.id} value={heirUser.id}>
                {heirUser.fullName}
              </option>
            ))}
          </select>
        </div>
      
      ) : (
        <button
        onClick={(clickEvent) => handleHeirSaveButtonClick(clickEvent) } className="btn__treasureForm">Submit AND Request Treasure</button>
      )}
      <button
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="btn__treasureForm"
      >
        Submit Treasure
      </button>
    </form>
    </main>
  );
};
