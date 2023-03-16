import { LeaderNavBar } from "./LeaderNavBar"
import { HeirNavBar } from "./HeirNavBar" 

export const NavBar = () => {

    const localFamilyUser = localStorage.getItem("family_user")
    const familyUserObject = JSON.parse(localFamilyUser)

	if (familyUserObject.leader) {
        return <LeaderNavBar/>
    } 
    else {
        return <HeirNavBar/>
    }
}