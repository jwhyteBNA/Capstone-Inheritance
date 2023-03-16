import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { TreasureDetail } from "../ApiManager"


export const TreasureDetails = () => {
const {treasureObjectId} = useParams()
const [treasure, updateTreasure]= useState({})


// useEffect(
//     () => {
//         TreasureDetail(treasureObjectId)
//         .then((data) => {
//             const singleTreasure = data[0]
//             updateTreasure(singleTreasure)
//         })
//     },
//     [treasureObjectId]
// )
//     return  <section className="treasure">
//     <header className="Treasure_header">{Treasure?.user?.fullName}</header>
//     <div>Email: {Treasure?.user?.email}</div>
//     <div>Loyalty Number: {Treasure.loyaltyNumber}</div>
//     </section>
   
}