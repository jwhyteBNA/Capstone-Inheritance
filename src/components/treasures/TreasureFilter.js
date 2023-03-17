import { useEffect, useState } from "react"
import { getAllTreasureTypes, getHeirUsers } from "../ApiManager"

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
        <div>
            <select onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
            >
            <option value="">Treasure Value?</option>
            {treasureTypes.map((treasureType) => (
                <option key={treasureType.id} value={treasureType.id}>
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
        <div>
            <select onChange={
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