import { useEffect, useState } from "react"
import { getAllTreasureTypes, getHeirUsers } from "../ApiManager"
import "./treasures.css";

export const TreasureValueFilter = ({setterFunction}) => {
    const [treasureTypes, setTreasureTypes] = useState([])

    useEffect(
        () => {
           getAllTreasureTypes()
           .then((typesArray) => {
            setTreasureTypes(typesArray)
           })
        },
        []
    )

    return (
        <div className="treasure_filter">
            <select className="treasure_value_filter" onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
            >
            <option value="">Treasure Value?</option>
            {treasureTypes.map((treasureType) => (
                <option className="filter__options" key={treasureType.id} value={treasureType.id}>
                    {treasureType.name}
                </option>
        ))}
            </select>
        </div>
    )
}

export const TreasureAssignmentFilter = ({setterFunction}) => {
    const [ heirUsers, setHeirUsers ] = useState([]);

    useEffect(() => {
        getHeirUsers().then((heirUserArray) => {
          setHeirUsers(heirUserArray)
        })
      },
      []
      )

      return (
        <div className="treasure_filter">
            <select className="treasure_heir_filter" onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
            >
            <option value="">Assigned Heir</option>
            {heirUsers.map((heirUser) => (
                <option key={heirUser.id} value={heirUser.id}>
                    {heirUser.fullName}
                </option>
        ))}
            </select>
        </div>
    )
}