import { useState } from "react"
import { TreasureAssignmentFilter, TreasureValueFilter } from "./TreasureFilter";
import { TreasureSearch } from "./TreasureSearch";
import { TreasureList } from "./TreasuresList";


export const TreasureContainer = () => {
  const [searchTerms, setSearchTerms] = useState("")
  const [filteredValue, setFilteredValue] = useState("")
  const [filteredAssignment, setFilteredAssignment] = useState("")

  const localFamilyUser = localStorage.getItem("family_user");
  const familyUserObject = JSON.parse(localFamilyUser);

  return <>
      <TreasureSearch setterFunction={setSearchTerms} />
      <TreasureValueFilter setterFunction={setFilteredValue} />
      {familyUserObject.leader ? (<TreasureAssignmentFilter setterFunction={setFilteredAssignment} />
      ) : "" }
      <TreasureList searchTermState={searchTerms} filteredValueState={filteredValue} filteredAssignmentState={filteredAssignment}/>
      
    </>
}