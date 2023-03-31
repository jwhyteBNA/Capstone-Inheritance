import { useState } from "react"
import { TreasureAssignmentFilter, TreasureValueFilter } from "./TreasureFilter";
import { TreasureSearch } from "./TreasureSearch";
import { TreasureList } from "./TreasuresList";
import "./treasures.css";

export const TreasureContainer = () => {
  const [searchTerms, setSearchTerms] = useState("")
  const [filteredValue, setFilteredValue] = useState("")
  const [filteredAssignment, setFilteredAssignment] = useState("")

  const localFamilyUser = localStorage.getItem("family_user");
  const familyUserObject = JSON.parse(localFamilyUser);

  return <>
  <h2 className="treasures_title">List of Treasures</h2>
  <section className="treasure_search"><TreasureSearch setterFunction={setSearchTerms} /></section>
      <article className="treasure_filters">
      <TreasureValueFilter setterFunction={setFilteredValue} />
      {familyUserObject.leader ? (<TreasureAssignmentFilter setterFunction={setFilteredAssignment} />
      ) : "" }
       </article>
      <TreasureList searchTermState={searchTerms} filteredValueState={filteredValue} filteredAssignmentState={filteredAssignment}/>
     </>
}