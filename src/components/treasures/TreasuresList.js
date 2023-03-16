import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReservedTreasures, listTreasures } from "../ApiManager";
import { Treasure } from "./Treasure";
import "./treasures.css";

export const TreasureList = ({ searchTermState }) => {
  const [treasures, setTreasures] = useState([]);
  const [filteredTreasures, setFiltered] = useState([]);
  const navigate = useNavigate();
  const [reservedByHeir, setReserved] = useState(false);

  const localFamilyUser = localStorage.getItem("family_user");
  const familyUserObject = JSON.parse(localFamilyUser);

  useEffect(() => {
    if (reservedByHeir) {
      const reservedTreasures = treasures.filter(
        (treasure) => treasure.assignedTreasures.find((assignedTreasure) => assignedTreasure.userId === familyUserObject.id)
      );
      setFiltered(reservedTreasures);
    }
    else {
      setFiltered(treasures)
    }
  }, [reservedByHeir]);

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
        </>
      )}

      <button onClick={() => navigate("/treasure/create")}>
        Create New Treasure
      </button>

      <h2>List of Treasures</h2>

      <article className="treasures">
        {filteredTreasures.map((treasure) => (
          <Treasure
            key={treasure.id}
            getAllTreasures={getAllTreasures}
            treasureObject={treasure}
          />
        ))}
      </article>
    </>
  );
};

