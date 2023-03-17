import { Outlet, Route, Routes } from "react-router-dom"
import { About } from "../information/About"
import { HeirProfile } from "../profile/HeirProfile"
import { NewTreasureForm } from "../treasures/NewTreasureForm"
import { TreasureContainer } from "../treasures/TreasureContainer"
import { TreasureDetails } from "../treasures/TreasureDetail"
import { TreasureList } from "../treasures/TreasuresList"

export const HeirViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Inheritance</h1>
                    <div>Leave A Legacy</div>

                    <Outlet />
                </>
            }>

                <Route path="treasure" element={ <TreasureContainer /> } />
                <Route path="about" element={ <About /> } />
                <Route path="treasure/create" element={ <NewTreasureForm /> } />
                {/* <Route path="treasure/:treasureId" element={ <TreasureDetails  /> }/> */}
                <Route path="profile" element={ <HeirProfile  /> }/>
            	{/* <Route path="requests" element={ <RequestList /> } />
                
                <Route path="customers" element={ <CustomerList  /> }/>
                <Route path="customers/:customerId" element={ <CustomerDetails /> }/> */}
            </Route>
        </Routes>
    )
}