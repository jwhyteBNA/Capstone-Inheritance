import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { updateUserDetail } from "../ApiManager"
import { UserForm } from "./ProfileForm"

export const ProfileDetails = () => {
const {userId} = useParams()
const [user, updateUser]= useState({})
const localFamilyUser = localStorage.getItem("family_user");
const familyUserObject = JSON.parse(localFamilyUser);


useEffect(
    () => {
        updateUserDetail(userId)
        .then((data) => {
            const singleUser = data[0]
            updateUser(singleUser)
        })
    },
    [userId]
)
    return  <section className="member">
    <header className="member_header">{user?.fullName}</header>
    <div>Email: {user?.email}</div>
    <div>Phone Number: {user?.phoneNumber}</div>
    
    {familyUserObject.leader ? 
    (<>
    <div>User Leader? {String(user?.isLeader)}</div>
    <div>User Executor? {String(user?.isExecutor)}</div>
    <div><UserForm/></div></>) : ("")}
    </section>
   
}