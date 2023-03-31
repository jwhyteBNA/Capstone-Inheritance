import { useEffect, useState } from "react";
import { listPendingRequests} from "../ApiManager";
import { Request } from "./Request";
import "./request.css";

export const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFiltered] = useState([]);
  const localFamilyUser = localStorage.getItem("family_user");
  const familyUserObject = JSON.parse(localFamilyUser);

  const listOpenRequests = () => {
    listPendingRequests().then((requestArray) => {
      setRequests(requestArray);
    });
  }

  useEffect(() => {
    listOpenRequests()
  }, []);

  useEffect(() => {
    if(familyUserObject.leader) {
    const filteredRequests = requests.filter(
      (request) => request.dateReviewed === ""
    );
    setFiltered(filteredRequests)
    } else {
    const filteredRequests = requests.filter(
            (request) => request.userId === familyUserObject.id && request.itemApproval === "Pending"
        ); 
        setFiltered(filteredRequests)
    };
  }, [requests]);

  return <article className="all_requests">
  <h2>Requests</h2>
  <section className="requests">
  {filteredRequests.map(
      (request) => <Request key={`request --${request.id}`}
      requestObject={request}
      listOpenRequests={listOpenRequests}
      currentUser={familyUserObject}
      />
  )}
  </section>
</article>
};
