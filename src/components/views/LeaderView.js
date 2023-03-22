import { Outlet, Route, Routes } from "react-router-dom"
import { NewMemoryForm } from "../memories/Memory Form"
import { ProfileDetails } from "../profile/ProfileDetail"
import { UserProfileList } from "../profile/ProfileList"
import { RequestList } from "../requests/RequestList"
import { NewTreasureForm } from "../treasures/NewTreasureForm"
import { TreasureContainer } from "../treasures/TreasureContainer"
import { TreasureDetails } from "../treasures/TreasureDetail"

export const LeaderViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Inheritance</h1>
                    <div>Leave A Legacy</div>

                    <Outlet />
                </>
            }>
            <Route path="/" element={
            <UserProfileList/> }>
            </Route>
                
                <Route path="/users/:userId" element={ <ProfileDetails /> } />
                <Route path="treasure" element={ <TreasureContainer /> } />
                <Route path="treasure/create" element={ <NewTreasureForm /> } />
                <Route path="treasure/:treasureId" element={ <TreasureDetails /> } />
                <Route path="treasure/:treasureId/createMemory" element={ <NewMemoryForm /> } />
                <Route path="requests" element={ <RequestList/> } />
            </Route>
        </Routes>
    )
}