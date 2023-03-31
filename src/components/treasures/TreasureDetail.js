import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTreasureMemories, treasureDetail, getHeirUsers } from "../ApiManager";
import "./treasures.css";

export const TreasureDetails = () => {
  const { treasureId } = useParams();
  const [treasure, updateTreasure] = useState({});
  const [heirUsers, setHeirUsers] = useState([]);
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

  useEffect(
    () => {
      getHeirUsers()
      .then((heirsArray) => {
        setHeirUsers(heirsArray)
      })
    }, []
   )

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
    <article className="treasure_info">
      <section className="treasure_edit">
      <img className="treasure_image" src={treasure.photoLink} />
      {familyUserObject.leader ? (<>
      <div className="btn_treasureDetails"><button className="btn_details" onClick={routeChangeDetails}>Edit Details</button><button className="btn_details" onClick={routeChangeAssignment}>Edit Assignment</button></div></>) : ""}
      </section>
      <header className="treasure_header"><h2>{treasure.name}</h2>
      <div><strong>Description:</strong> {treasure.description}</div>
      <div><strong>Valuation:</strong> ${treasure.valuation}</div>
      </header>
      </article>

<article className="memories">
      <h2 className="memories_title">Memories:</h2>
      <ul>
     {treasureMemories.map(memory => (
        <section className="memory_detail">
        <li key={memory?.id}><p>"{memory?.description}"<br/>from <strong>{memory?.user?.fullName}</strong></p>
        {memory?.photo ? <img src= {memory.photo}/> : ""}
        {memory?.videoLink? <video width="560" height="315" src={memory.videoLink}></video> : ""}
        </li>
        </section>
      ))}
      </ul>
      <button className="btn_details" onClick={routeMemory}>Have A Memory to Add?</button>
      </article>
    </section>
    
  )
};