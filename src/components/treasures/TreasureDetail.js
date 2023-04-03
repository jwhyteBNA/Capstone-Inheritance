import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  getTreasureMemories,
  treasureDetail,
  getHeirUsers
} from "../ApiManager";
import "./treasures.css";

export const TreasureDetails = () => {
  const { treasureId } = useParams();
  const [treasure, updateTreasure] = useState({});
  const [heirUsers, setHeirUsers] = useState([]);
  const [treasureMemories, setMemories] = useState([]);
  const localFamilyUser = localStorage.getItem("family_user");
  const familyUserObject = JSON.parse(localFamilyUser);
  const navigate = useNavigate();

  const routeChangeDetails = () => {
    let path = `/treasure/${treasureId}/editDetails`;
    navigate(path);
  };

  const routeMakeAssignment = () => {
    return <button onClick={ () => {
      navigate(`/treasure/${treasureId}/editAssignment`)
    }}
      className="btn_details">
    Assign to Family Member{" "}
  </button>
  };

  const routeChangeAssignment = () => {
    return <button onClick={ () => {
        navigate(`/treasure/${treasureId}/editAssignedHeir`);
      }}
    className="btn_details">
      Assigned to {itemAssignment(treasure)} - Edit?{" "}
                </button>
  };

  const routeMemory = () => {
    let path = `/treasure/${treasureId}/createMemory`;
    navigate(path);
  };

  useEffect(() => {
    getHeirUsers().then((heirsArray) => {
      setHeirUsers(heirsArray);
    });
  }, []);

  const itemAssignment = (treasure) => {
    let fullName = "";
    if (treasure.assignedTreasures) {
      const assignedTreasure = treasure.assignedTreasures.find(
        (treasure) => treasure.itemApproval === "Approved"
      );
      if (assignedTreasure) {
        const assignedUser = heirUsers.find(
          (user) => user.id === assignedTreasure.userId
        );
        if (assignedUser) {
          fullName = assignedUser.fullName;
        }
      }
    }
    return fullName;
  };

  useEffect(() => {
    treasureDetail(treasureId).then((data) => {
      const singleTreasure = data[0];
      updateTreasure(singleTreasure);
    });

    getTreasureMemories(treasureId).then((data) => {
      return setMemories(data);
    });
  }, [treasureId]);

  return (
    <section className="treasure_details">
      <article className="treasure_info">
        <section className="treasure_edit">
          <img className="treasure_image" src={treasure.photoLink} />
          {familyUserObject.leader ? (
            <>
              <div className="btn_treasureDetails">
                <button className="btn_details" onClick={routeChangeDetails}>
                  Edit Details
                </button>
                {itemAssignment(treasure) ? (routeChangeAssignment()) : ( routeMakeAssignment())}
              </div>
            </>
          ) : (
            ""
          )}
        </section>
        <header className="treasure_header">
          <h2>{treasure.name}</h2>
          <div>
            <strong>Description:</strong> {treasure.description}
          </div>
          <div>
            <strong>Valuation:</strong> ${treasure.valuation}
          </div>
          <div>
            <strong>Assigned To: </strong>         
             { itemAssignment(treasure) ? (itemAssignment(treasure)) : ("No Assignment Yet")
            }
          </div>
        </header>
      </article>

      <article className="memories">
        <h2 className="memories_title">Memories:</h2>
        <button className="btn_memory" onClick={routeMemory}>
          Have A Memory to Add?
        </button>
        {treasureMemories.map((memory) => (
          <section className="memory_detail" key={`memory--${memory?.id}`}>
            <div>
              <p className="memory_description">
                "{memory?.description}"<br />
                from <strong>{memory?.user?.fullName}</strong>
              </p>
              {memory?.photoLink ? (
                <img className="memory_photo" src={memory.photoLink} />
              ) : (
                ""
              )}
              {memory?.videoLink ? (
                <Container className="video-responsive">
                  <div className="ratio ratio-16x9">
  <iframe height="250" width="444" src={memory.videoLink} title="YouTube video" allowFullScreen></iframe>
</div>
                </Container>
              ) : (
                ""
              )}
            </div>
          </section>
        ))}
      </article>
    </section>
  );
};
