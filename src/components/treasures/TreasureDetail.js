import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTreasureMemories, treasureDetail } from "../ApiManager";
import "./treasures.css";

export const TreasureDetails = () => {
  const { treasureId } = useParams();
  const [treasure, updateTreasure] = useState({});
  const [treasureMemories, setMemories] = useState([]);
  const localFamilyUser = localStorage.getItem("family_user");
  const familyUserObject = JSON.parse(localFamilyUser);
  const navigate = useNavigate()

  const routeChangeDetails = () => {
    let path = `/treasure/${treasureId}/editDetails`
    navigate(path)
  }

  const routeChangeAssignment = () => {
    let path = `/treasure/${treasureId}/editAssignment`
    navigate(path)
  }

  const routeMemory = () => {
    let path = `/treasure/${treasureId}/createMemory`
    navigate(path)
  }

  useEffect(() => {
    treasureDetail(treasureId).then((data) => {
      const singleTreasure = data[0];
      updateTreasure(singleTreasure);
    });

    getTreasureMemories(treasureId)
    .then(data => {
        return setMemories(data)
    })
  }, [treasureId]);

  return ( 
  <section className="treasure_details">
      <img className="treasure_img" src={treasure.photoLink} />
      {familyUserObject.leader ? (<>
      <div><button onClick={routeChangeDetails}>Edit Details</button></div>
      <div><button onClick={routeChangeAssignment}>Edit Assignment</button></div></>) : ""}
      <header className="treasure_header">{treasure.name}</header>
      <div>Description: {treasure.description}</div>
      <div>Valuation: ${treasure.valuation}</div>
      <div>Memories:</div>
      <ul>
     {treasureMemories.map(memory => (
        <li key={memory?.id}><p>"{memory?.description}"<br/>from {memory?.user?.fullName}</p>
        {memory?.photo ? <img src= {memory.photo}/> : ""}
        {memory?.videoLink? <video width="560" height="315" src={memory.videoLink}></video> : ""}
        </li>
      ))}
      </ul>
      <button onClick={routeMemory}>Have A Memory to Add?</button>
    </section>
  )
};