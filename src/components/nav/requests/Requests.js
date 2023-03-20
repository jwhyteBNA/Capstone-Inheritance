import { Link } from "react-router-dom"

export const Request = ({ treasureObject, currentUser, users, getAllTreasures,
}) => {

    let assignedHeir = null

    if (treasureObject.assignedTreasures.length > 0) {
        const treasureHeirRelationship = treasureObject.assignedTreasures[0]
        assignedHeir = users.find(
            (user) => user.id === treasureHeirRelationship.userId 
        )
    }

const userHeir = users.find(
    (user) => user.id === currentUser.id
)

const canRequest = () => {
    if (
        userHeir && userHeir?.id === assignedTreasure?.userId && assignedTreasureObject.dateAssigned === ""
    ) {
        return (
            <button
            onClick={requestTreasure} className="treasure__request">Request Treasure</button>
        )
    }
}

}