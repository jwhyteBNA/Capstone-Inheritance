import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAssignedTreasure, createTreasureItem, getAllTreasureTypes, getHeirUsers } from "../ApiManager";

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
  dateAssigned: "",
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
      dateAssigned: Date.now(),
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
    <form className="treasureForm">
      <h2 className="treasureForm__title">Add And Assign A New Treasure</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Name:</label>
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="What is the item?"
            value={treasure.name}
            onChange={(event) => {
              const copy = { ...treasure };
              copy.name = event.target.value;
              setTreasure(copy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
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
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="photoLink">Photo Link:</label>
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
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="valuation">Valuation:</label>
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
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="treasureType">Treasure Type:</label>
          <select
            value={treasure.treasureTypeId}
            onChange={(event) => {
              const copy = { ...treasure };
              copy.treasureTypeId = event.target.value;
              setTreasure(copy);
            }}
          >
            <option value="">Select A Treasure Type</option>
            {treasureTypes.map((treasureType) => (
              <option key={treasureType.id} value={treasureType.id}>
                {treasureType.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      {familyUserObject.leader? (
      <fieldset>
        <div className="form-group">
          <label htmlFor="heir">Assigned Heir:</label>
          <select
            value={assignedTreasure.heirUserId}
            onChange={(evt) => {
              const copy = { ...assignedTreasure };
              copy.userId = evt.target.value;
              setAssigned(copy);
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
      ) : (
        ""
      )}
      <button
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="btn btn-primary"
      >
        Submit treasure
      </button>
    </form>
  );
};
