//TODO: A list of all requests from a particular user, sorted by pending first, with ability to delete pending requests and see a list of approved and denied requests

import { useEffect, useState } from "react"
import { listRequestsByUser } from "../ApiManager"

export const RequestList = () => {
    const [requests, setRequests] = useState([])

    useEffect(
        () => {
           listRequestsByUser()
           .then((requestArray) => {
            setRequests(requestArray)
           }) 
        }, []
    )

    return <>
        {requests.map(
            (request) => <section>
            <div>{request.treasure.name}</div>
            <div>Date Requested: {request.dateRequested}</div>
            <div>Item Status: {request.itemApproval}</div>
            </section>
        )}
    </>
}