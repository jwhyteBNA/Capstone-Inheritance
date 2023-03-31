import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { updateUserDetail } from "../ApiManager"
import { UserForm } from "./ProfileForm"
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import "./profile.css";

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
        <article className="member_info">
        <div><img className="member_pic" src={user?.photo}/></div>
    <section className="member_details">
    <header className="member_header"><strong>{user?.fullName}</strong></header>
    <div><strong>Email:</strong> {user?.email}</div>
    <div><strong>Phone Number:</strong> {user?.phoneNumber}</div>
       
    {familyUserObject.leader ? 
    (<>
    <div><strong>Leader?</strong>{(user?.isLeader) ? (<><i className="icon"><FaThumbsUp/></i></>) : (<><i className="icon"><FaThumbsDown/></i></>)}</div>
    <div><strong>Executor?</strong> {(user?.isExecutor) ? (<><i className="icon"><FaThumbsUp/></i></>) : (<><i className="icon"><FaThumbsDown/></i></>)}</div>
    </>) : ("")}
    </section>
    </article>

    {familyUserObject.leader ? 
    (<>
    <div><UserForm/></div></>) : ("")}
    </section>
   
}