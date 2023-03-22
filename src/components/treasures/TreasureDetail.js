import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getTreasureMemories, treasureDetail } from "../ApiManager";
import "./treasures.css";

export const TreasureDetails = () => {
  const { treasureId } = useParams();
  const [treasure, updateTreasure] = useState({});
  const [treasureMemories, setMemories] = useState([]);

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
      <header className="treasure_header">{treasure.name}</header>
      <div>Description: {treasure.description}</div>
      <div>Valuation: ${treasure.valuation}</div>
      <div>Memories:</div>
      <ul>
     {treasureMemories.map(memory => (
        <li key={memory?.id}><p>"{memory?.description}"<br/>from {memory?.user?.fullName}</p>
        {memory?.photo ? <img src= {memory.photo}/> : ""}
        {memory?.videoLink ? <iframe width="560" height="315" src={memory.videoLink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> : ""} </li>
      ))}
      </ul>
      <Link to={`/treasure/${treasure.id}/createMemory`}>Have A Memory to Add?</Link>
    </section>
  )
};