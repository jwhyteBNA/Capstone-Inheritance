import { LeaderViews } from "./LeaderView"
import { HeirViews } from "./HeirView"

export const ApplicationViews = () => {

    const localFamilyUser = localStorage.getItem("family_user")
    const familyUserObject = JSON.parse(localFamilyUser)

	if (familyUserObject.leader) {
        return <LeaderViews/>
    } 
    else {
        return <HeirViews/>
    }

}
