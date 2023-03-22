// //TODO: A list of all requests from a particular user, sorted by pending first, with ability to delete pending requests and see a list of approved and denied requests

// import { useEffect, useState } from "react"
// import { deleteTreasureRequest, listRequestsByTreasure } from "../ApiManager"
// import { Request } from "./Request"
// import "./request.css"


// export const RequestList = ({request}) => {
//     const [requests, setRequests] = useState([])
//     const [filteredRequests, setFiltered] = useState([])
//     const localFamilyUser = localStorage.getItem("family_user");
//     const familyUserObject = JSON.parse(localFamilyUser);

//     useEffect(
//         () => {
//            listRequestsByTreasure()
//            .then((requestArray) => {
//             setRequests(requestArray)
//            }) 
//         }, []
//     )

//     useEffect(
//         () => {
//             const myRequests = requests.filter(
//                 (request) => request.userId === familyUserObject.id
//             ); setFiltered(myRequests)
//         }, [requests]
//     )

//     const deleteRequest = () => {
//         return (
//             <button
//             onClick={() => {
//                 deleteTreasureRequest(request).then(() => {
//                     listRequestsByTreasure()
//                     // window.alert("This item is now available for others to request")
//                 })
//             }}
//             className="request__delete"
//             > Delete From My List</button>
//         )
//     }

    // return <article>
    //     <h2>My Requests</h2>
    //     <section className="requests">
    //     {filteredRequests.map(
    //         (request) => <Request requestObject={request}/>
    //     )}
    //     </section>
    // </article>
// }