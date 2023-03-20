export const login = (email) => {
    return fetch(`http://localhost:8088/users?email=${email}`)
    .then(res => res.json())
 }

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

export const listTreasures = () => {
    return fetch("http://localhost:8088/treasures?_expand=treasureType&_embed=assignedTreasures")
    .then((response) => response.json())
}

export const getReservedTreasures = () => {
    return fetch("http://localhost:8088/assignedTreasures")
        .then((response) => response.json())
}

export const treasuresByType = () => {
    return fetch("http://localhost:8088/treasures?_sort=name&_expand=treasureType")
    .then((response) => response.json())
}

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

export const getAllTreasureTypes = () => {
    return fetch("http://localhost:8088/treasureTypes")
        .then((response) => response.json())
}

export const getHeirUsers = () => {
    return fetch("http://localhost:8088/users?isLeader=false")
        .then((response) => response.json())
}

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

export const deleteTreasure = (treasureObject) => {
    return fetch(`http://localhost:8088/treasures/${treasureObject.id}`, {
        method: "DELETE"
    })
}

export const treasureDetail = (treasureId) => {
    return fetch(`http://localhost:8088/treasures?&id=${treasureId}&_embed=treasureMemories&embed=assignedTreasure`)
        .then(response => response.json())
}

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

export const getAllUsers= () => {
    return fetch(`http://localhost:8088/users?_sort=isLeader`)
        .then(response => response.json())
}

export const updateUserDetail = (userId) => {
    return fetch(`http://localhost:8088/users?&id=${userId}`)
      .then((response) => response.json())
}

export const getUsers = (userId) => { 
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