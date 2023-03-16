import { useState } from "react"
import { TreasureSearch } from "./TreasureSearch";
import { TreasureList } from "./TreasuresList";


export const TreasureContainer = () => {
  const [searchTerms, setSearchTerms] = useState("")

  return <>
      <TreasureSearch setterFunction={setSearchTerms} />
      <TreasureList searchTermState={searchTerms}/>
    </>
}