import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listTreasures } from "../ApiManager";
import { Treasure } from "./Treasure";
import "./treasures.css";

export const TreasureList = ({ searchTermState, filteredValueState, filteredAssignmentState }) => {
  const [treasures, setTreasures] = useState([]);
  const [filteredTreasures, setFiltered] = useState([]);
  const navigate = useNavigate();
  const [reservedByHeir, setReserved] = useState(false);
  const [availableToRequest, setAvailable] = useState(false)

  const localFamilyUser = localStorage.getItem("family_user");
  const familyUserObject = JSON.parse(localFamilyUser);

  useEffect(() => {
    if (reservedByHeir) {
      const reservedTreasures = treasures.filter(
        (treasure) => treasure.assignedTreasures.find((assignedTreasure) => (assignedTreasure.userId === familyUserObject.id) && (assignedTreasure.itemApproval === "Approved"))
      )
      setFiltered(reservedTreasures);
    }
    else {
      setFiltered(treasures)
    }
  }, [reservedByHeir]);

  useEffect(() => {
    if (availableToRequest) {
      const availableTreasures = treasures.filter(
        (treasure) => !treasure.assignedTreasures.some((assignedTreasure) => {
          return assignedTreasure.userId === familyUserObject.id || assignedTreasure.itemApproval === "Approved"
              }) 
      );
      setFiltered(availableTreasures);
    }
    else {
      setFiltered(treasures)
    }
  }, [availableToRequest]);

  useEffect(() => {
    const searchedTreasures = treasures.filter((treasure) => {
      return (
        treasure.description
          .toLowerCase()
          .includes(searchTermState.toLowerCase()) ||
        treasure.name.toLowerCase().includes(searchTermState.toLowerCase())
      );
    });
    setFiltered(searchedTreasures);
  }, [searchTermState]);

useEffect(() => {
  let filteredTreasureByType = treasures
  if (filteredValueState) {
    filteredTreasureByType = treasures.filter((treasure) => treasure.treasureTypeId === parseInt(filteredValueState))
  }
  setFiltered(filteredTreasureByType)
},
[filteredValueState]
)

useEffect(() => {
  let filteredTreasureByAssignment = treasures
  if (filteredAssignmentState) {
    filteredTreasureByAssignment = treasures.filter((treasure) => treasure.assignedTreasures.find((assignedTreasure) => assignedTreasure.itemApproval === "Approved" && assignedTreasure.userId === parseInt(filteredAssignmentState))
)}
  setFiltered(filteredTreasureByAssignment)
},
[filteredAssignmentState]
)

  const getAllTreasures = () => {
    listTreasures().then((treasureArray) => {
      setTreasures(treasureArray);
    });
  };

  useEffect(() => {
    getAllTreasures();
  }, []);

  useEffect(() => {
    if (familyUserObject) {
      setFiltered(treasures);
    }
  }, [treasures]);

  return (
    <section className="treasure__section">
    <section className="heir_filter">
      {familyUserObject.leader ? (
        ""
      ) : (
        <>
          <button className="user_btn"
            onClick={() => {
              setReserved(false)
              setAvailable(false);
            }}
          >
            All Treasures
          </button>
          <button className="user_btn"
            onClick={() => {
              setReserved(true);
            }}
          >
            My Treasures
          </button>
          <button className="user_btn" onClick={() => {
            setAvailable(true)
          }}>Not Yet Claimed</button>
        </>
      )}
      </section>
      <section className="create">
      <button className="btn btn__create" onClick={() => navigate("/treasure/create")}>
        Create New Treasure
      </button>
      </section>

      <article className="treasures">
        {filteredTreasures.sort((a, b) => b.id - a.id).map((treasure) => (
          <Treasure
            key={`treasure--${treasure.id}`}
            getAllTreasures={getAllTreasures}
            currentUser={familyUserObject}
            treasureObject={treasure}
          />
        ))}
      </article>
    </section>
  );
};

