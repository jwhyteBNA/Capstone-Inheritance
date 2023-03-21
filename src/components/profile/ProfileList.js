import { useEffect, useState } from "react"
import { getExecutorUsers, getHeirUsers, getLeaderUsers } from "../ApiManager"
import { UserProfile } from "./Profile"
import "./profile.css"

export const UserProfileList = () => {
 const [heirUsers, setHeirUsers] = useState([])
 const [leaderUsers, setLeaderUsers] = useState([])
 const [executorUsers, setExecUsers] = useState([])
 const localFamilyUser = localStorage.getItem("family_user");
const familyUserObject = JSON.parse(localFamilyUser);


 useEffect(
    () => {
        getHeirUsers()
        .then((userArray) => {
            setHeirUsers(userArray)
        })
    }, []
 )

 useEffect(
    () => {
        getLeaderUsers()
        .then((userArray) => {
            setLeaderUsers(userArray)
        })
    }, []
 )

 useEffect(
    () => {
        getExecutorUsers()
        .then((userArray) => {
            setExecUsers(userArray)
        })
    }, []
 )

 return <article className="familyList">
    <h2>Family List</h2>
    <h3>Family Leaders</h3>
    <article className="familyMembers">
    {leaderUsers.map(user => <UserProfile key={`user--${user.id}`}
    id={user.id}
    fullName={user.fullName}
    photo={user.photo}
    />)
    }
    </article>
    <h3>Family Members</h3>
    <article className="familyMembers">
    {heirUsers.map(user => <UserProfile key={`user--${user.id}`}
    id={user.id}
    fullName={user.fullName}
    photo={user.photo}
    />)
    }
    </article>
     {familyUserObject.leader ? 
    (<>
    <h3>Executors</h3>
    <article className="familyMembers">
    {executorUsers.map(user => <UserProfile key={`user--${user.id}`}
    id={user.id}
    fullName={user.fullName}
    photo={user.photo}
    />)}</article></>) : ("")}
    
 </article>

}