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
        (treasure) => treasure.assignedTreasures.find((assignedTreasure) => (assignedTreasure.userId === familyUserObject.id) &&(assignedTreasure.itemApproval === "approved"))
      )
      setFiltered(reservedTreasures);
    }
    else {
      setFiltered(treasures)
    }
  }, [reservedByHeir]);


  //TODO: Filter by all not yet claimed treasures
  useEffect(() => {
    if (availableToRequest) {
      const availableTreasures = treasures.filter(
        (treasure) => treasure.assignedTreasures.find((assignedTreasure) => (assignedTreasure.userId === familyUserObject.id))
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
    filteredTreasureByAssignment = treasures.filter((treasure) => treasure.assignedTreasures.find((assignedTreasure) => assignedTreasure.userId === parseInt(filteredAssignmentState))
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
    <>
      {familyUserObject.leader ? (
        ""
      ) : (
        <>
          <button
            onClick={() => {
              setReserved(false);
            }}
          >
            All Treasures
          </button>
          <button
            onClick={() => {
              setReserved(true);
            }}
          >
            My Treasures
          </button>
          <button onClick={() => {
            setAvailable(true)
          }}>Not Yet Claimed</button>
        </>
      )}

      <button onClick={() => navigate("/treasure/create")}>
        Create New Treasure
      </button>

      <h2>List of Treasures</h2>

      <article className="treasures">
        {filteredTreasures.map((treasure) => (
          <Treasure
            key={`treasure --${treasure.id}`}
            getAllTreasures={getAllTreasures}
            currentUser={familyUserObject}
            treasureObject={treasure}
          />
        ))}
      </article>
    </>
  );
};

