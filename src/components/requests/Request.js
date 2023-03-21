import { useState } from "react";

export const RequestButton = () => {
  const localFamilyUser = localStorage.getItem("family_user");
  const familyUserObject = JSON.parse(localFamilyUser);
  const [assignedTreasure, setAssignedTreasure] = useState({
    userId: "",
    treasureId: "",
    dateAssigned: "",
    itemReviewed: false,
    itemApproval: "pending"
  });

  const handleSaveButtonClick = (event) => {
    event.preventDefault();

    const treasureRequestToSendToAPI = {
        userId: parseInt(familyUserObject.id),
        treasureId: parseInt(treasure.id),
        dateAssigned: "",
        itemReviewed: false,
        itemApproval: "pending"
    }

    createTreasureRequest(treasureRequestToSendToAPI)
    .then(() => {

    })

    if (familyUserObject.leader) {
      return ""
    } else {
    if (treasureObject.id === treasureObject.assigned.treasureId) {
      return ""
  }  else {
    return <button onClick={(clickEvent)=> handleSaveButtonClick(clickEvent)}
        className="btn btn-request">Request</button>
    }
    }}
}