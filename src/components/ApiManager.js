//Login.js
export const login = (email) => {
    return fetch(`http://localhost:8088/users?email=${email}`)
    .then(res => res.json())
 }

 //Register.js
export const register = (user) => {
    return fetch("http://localhost:8088/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
}

export const registration = (user) => {
    return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
}

//TreasureList.js
export const listTreasures = () => {
    return fetch("http://localhost:8088/treasures?&_expand=treasureType&_embed=assignedTreasures")
    .then((response) => response.json())
}

//HeirProfile.js
export const getHeirProfile = (familyUserObject) => {
    return fetch(`http://localhost:8088/users?id=${familyUserObject.id}`)
    .then(response => response.json())
}

export const updateHeirProfile = (profile) => {
    return fetch (`http://localhost:8088/users/${profile.id}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(profile)
})
.then(response => response.json())
}

//TreasureList, NewTreasureForm, Treasure, TreasureFilter
export const getAllTreasureTypes = () => {
    return fetch("http://localhost:8088/treasureTypes")
        .then((response) => response.json())
}

//NewTreasureForm, TreasureFilter, ProfileList
export const getHeirUsers = () => {
    return fetch("http://localhost:8088/users?isLeader=false")
        .then((response) => response.json())
}

//ProfileList
export const getLeaderUsers = () => {
    return fetch("http://localhost:8088/users?isLeader=true")
        .then((response) => response.json())
}

export const getExecutorUsers = () => {
    return fetch("http://localhost:8088/users?isExecutor=true")
        .then((response) => response.json())
}

export const updateUserDetail = (userId) => {
    return fetch(`http://localhost:8088/users?&id=${userId}`)
      .then((response) => response.json())
}

export const updateUserProfile = (profile) => {
    return fetch(`http://localhost:8088/users/${profile.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    })
      .then((response) => response.json())
}

export const deleteUser = (userId) => {
    return fetch(`http://localhost:8088/users/${userId}`, {
        method: "DELETE"
    })
}

//NewTreasureForm
export const createTreasureItem = (treasureToSendToAPI) => {
    return fetch (`http://localhost:8088/treasures`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(treasureToSendToAPI)
})
.then(response => response.json())
}

export const createTreasureRequestNew = (requestedTreasureToSendToAPI) => {
    return fetch (`http://localhost:8088/assignedTreasures`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(requestedTreasureToSendToAPI)
})
.then(response => response.json())
}

//AssignedTreasureByAdmin
export const createAssignedTreasure = (assignedTreasureToSendToAPI) => {
    return fetch (`http://localhost:8088/assignedTreasures`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(assignedTreasureToSendToAPI)
})
.then(response => response.json())
}

//Treasure
export const createTreasureRequest = (currentUser, treasureObject) => {
    return fetch (`http://localhost:8088/assignedTreasures`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        userId: parseInt(currentUser.id),
        treasureId: parseInt(treasureObject.id),
        dateRequested: Date.now(),
        dateReviewed: "",
        itemApproval: "Pending"
    })
})
.then(response => response.json())
}

export const deleteTreasure = (treasureObject) => {
    return fetch(`http://localhost:8088/treasures/${treasureObject.id}`, {
        method: "DELETE"
    })
}

//TreasureDetail
export const treasureDetail = (treasureId) => {
    return fetch(`http://localhost:8088/treasures?&id=${treasureId}&_embed=treasureMemories&_embed=assignedTreasures`)
        .then(response => response.json())
}

//TreasureMemoriesForm
export const getTreasureMemories= (treasureId) => {
    return fetch(`http://localhost:8088/treasureMemories?&_expand=user&treasureId=${treasureId}`)
        .then(response => response.json())
}

export const createMemory = (memoryToSendToAPI) => {
    return fetch (`http://localhost:8088/treasureMemories`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(memoryToSendToAPI)
})
.then(response => response.json())
}

//Requests
export const deleteTreasureRequest = (treasureRequest) => {
    return fetch(`http://localhost:8088/assignedTreasures/${treasureRequest.id}`, {
        method: "DELETE"
    })
}

export const respondTreasureRequest = (requestObject, copy) => {
    return fetch(`http://localhost:8088/assignedTreasures/${requestObject.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(copy),
      })
        .then((response) => response.json())
  }

export const listPendingRequests = () => {
    return fetch("http://localhost:8088/assignedTreasures?itemApproval=Pending&_sort=treasureId&_expand=treasure&_expand=user")
    .then((response) => response.json())
}

export const getTreasures = (treasureId) => {
    return fetch(`http://localhost:8088/treasures/${treasureId}`)
    .then((response) => response.json())
}

export const saveEditedTreasure = (treasure) => {
    return fetch (`http://localhost:8088/treasures/${treasure.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(treasure)
    })
    .then(response => response.json())
}

export const saveEditedTreasureAssignment = (assignedTreasure) => {
    return fetch (`http://localhost:8088/assignedTreasures/${assignedTreasure.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(assignedTreasure)
    })
    .then(response => response.json())
}

export const getApprovedAssignments= (treasureId) => {
    return fetch(`http://localhost:8088/assignedTreasures?itemApproval=Approved&treasureId=${treasureId}`)
        .then(response => response.json())
}

export const deleteTreasureAssignment = (assignment) => {
    return fetch(`http://localhost:8088/assignedTreasures/${assignment.id}`, {
        method: "DELETE"
    })
}