//TODO: add list of all users and show their names and photos
//ToDo: when clicking on user, take the admin to thier profile to make edits and change them from a user to admin, user to executor, and edit their details.

import { useEffect, useState } from "react"
import { getAllUsers } from "../ApiManager"
import { UserProfile } from "./Profile"
import "./profile.css"

export const UserProfileList = () => {
 const [users, setUsers] = useState([])

 useEffect(
    () => {
        getAllUsers()
        .then((userArray) => {
            setUsers(userArray)
        })
    }, []
 )

 return <article className="familyMembers">
    <h2>Family List</h2>
    {users.map(user => <UserProfile key={`user--${user.id}`}
    id={user.id}
    fullName={user.fullName}
    photo={user.photo}
    />)
    }
 </article>

}