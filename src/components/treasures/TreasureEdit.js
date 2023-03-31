import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllTreasureTypes, getTreasures, saveEditedTreasure } from "../ApiManager"
import {  
  FaCameraRetro,
  FaComment, FaMapPin, FaDollarSign } from "react-icons/fa";

export const TreasureEdit = () => {
    const [treasureTypes, setTreasureTypes] = useState([]);
    const [treasure, assignTreasure] = useState({
        name: "",
        description: "",
        photoLink: "",
        treasureTypeId: "",
        valuation: ""
    })
      const { treasureId } = useParams()
      const navigate = useNavigate()
        
    useEffect(() => {
            getTreasures(treasureId)
            .then((data) => {
              assignTreasure(data);
            })
        }, [treasureId])

    
    useEffect(() => {
            getAllTreasureTypes()
            .then((treasureTypesArray) => {
              setTreasureTypes(treasureTypesArray);
            });
          },
          []
        );

    const handleSaveButtonClick = (event) => {
        event.preventDefault()   
     
saveEditedTreasure(treasure)
.then(() => {
    navigate(`/treasure/${treasureId}`)

    })
}

return <main className="treasure-content">
<form className="treasure-form2">
<h2 className="treasure-formTitle">Edit Treasure</h2>
  <div><img className="treasure-formImage" src={treasure.photoLink}/></div>
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
      value={treasure.name}
      onChange={(event) => {
        const copy = { ...treasure };
        copy.name = event.target.value;
        assignTreasure(copy);
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
    <div className="div">
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
        assignTreasure(copy);
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
    <div className="div">
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
        assignTreasure(copy);
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
    <div className="div">
    <input
      required
      autoFocus
      type="currency"
      className="form-control"
      placeholder="Monetary Value"
      value={`${treasure.valuation}`}
      onChange={(event) => {
        const copy = { ...treasure };
        copy.valuation = parseFloat(event.target.value, 2);
        assignTreasure(copy);
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
    checked={treasureType.id}
    onChange={(event) => {
      const copy = { ...treasure };
      copy.treasureTypeId = event.target.value;
      assignTreasure(copy);
    }}
  />
  <label className="treasureTypeLabel" htmlFor={`treasureType-${treasureType.id}`}>
    {treasureType.name}
  </label>
</div>
))}
</div>

<button
  onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
  className="btn__treasureForm"
>
  Update Treasure Details
</button>
</form>
</main>

}