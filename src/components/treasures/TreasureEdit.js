import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllTreasureTypes, getTreasures, saveEditedTreasure } from "../ApiManager"

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

return <form className="treasureForm">
<h2 className="treasureForm__title">Edit Treasure</h2>
<fieldset>
  <div className="form-group">
    <label htmlFor="description">Name:</label>
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
        assignTreasure(copy);
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
        assignTreasure(copy);
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
        assignTreasure(copy);
      }}
    />
  </div>
</fieldset>
<fieldset>
<div className="form-group">
<label htmlFor="treasure-type">Treasure Type:</label>
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
  <label htmlFor={`treasureType-${treasureType.id}`}>
    {treasureType.name}
  </label>
</div>
))}
</div>
</fieldset>
<button
  onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
  className="btn btn-primary"
>
  Update Treasure Details
</button>
</form>

}