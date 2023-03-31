import { deleteTreasureRequest, listPendingRequests, respondTreasureRequest } from "../ApiManager";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import "./request.css";

export const Request = ({ requestObject, currentUser, listOpenRequests }) => {

    const confirmRequest = () => {
        return (
          <button
            onClick={closeRequestYes}
            className="request__yes">
            <div className="request_icon">
                <i className="fas-thumb">
                  <FaThumbsUp />
                </i>
              </div>
          </button>
        );
      };
    

    const denyRequest = () => {
        return (
          <button
            onClick={closeRequestNo}
            className="request__no">
            <div className="request_icon">
                <i className="fas-thumb">
                  <FaThumbsDown />
                </i>
              </div>
          </button>
        );
      };
    
      const deleteRequest = () => {
        return (
            <button
            onClick={() => {
                deleteTreasureRequest(requestObject).then(() => {
                    listOpenRequests()
                    window.alert("This item is now available for others to request")
                })
            }}
            className="request__delete"
            > Delete From My List</button>
        )
    }
    
      const closeRequestYes = () => {
        const copy = {
          userId: requestObject.userId,
          treasureId: requestObject.treasureId,
          dateRequested: requestObject.dateRequested,
          dateReviewed: Date.now(),
          itemApproval: "Approved",
        };
        respondTreasureRequest(requestObject, copy)
        .then(() => {
            listOpenRequests()
            listPendingRequests()
        })
      };
    
      const closeRequestNo = () => {
        const copy = {
          userId: requestObject.userId,
          treasureId: requestObject.treasureId,
          dateRequested: requestObject.dateRequested,
          dateReviewed: Date.now(),
          itemApproval: "Denied",
        };
        respondTreasureRequest(requestObject, copy)
        .then(() => {
            listOpenRequests()
            listPendingRequests()
        })
      };

      const randomRotate = () => {
        const deg = Math.random() * (5 - -5) + -5;
        return 'rotate(' + deg + 'deg)';
        }

    return (
    <section className="request" key={`request--${requestObject.id}`} style={{transform: randomRotate()}}>
            <h3>{requestObject.treasure.name}</h3>
            <figure className="memory__figure"><img className="request__img" src={requestObject.treasure.photoLink}/></figure>
            <div><strong>Requested By:</strong> {requestObject.user.fullName}</div>
            <div><strong>Date Requested:</strong>  {new Date(requestObject.dateRequested).getMonth()}/{new Date(requestObject.dateRequested).getDate()}/{new Date(requestObject.dateRequested).getFullYear()}</div>
            
            {currentUser.leader ? (<>
            <section className="request_btns">
            <div className="request-btn">{confirmRequest()}</div> 
            <div className="request-btn">{denyRequest()}</div>
            </section>
            </>)
             : deleteRequest()}
             
            </section>
    )
}