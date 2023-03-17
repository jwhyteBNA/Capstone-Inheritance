import { Outlet, Route, Routes } from "react-router-dom"
import { NewMemoryForm } from "../memories/Memory Form"
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

                <Route path="treasure" element={ <TreasureContainer /> } />
                <Route path="treasure/create" element={ <NewTreasureForm /> } />
                <Route path="treasure/:treasureId" element={ <TreasureDetails /> } />
                <Route path="treasure/:treasureId/createMemory" element={ <NewMemoryForm /> } />
				{/* 
				<Route path="requests" element={ <RequestList /> } />
                <Route path="staff" element={ <EmployeeList  /> }/>
                <Route path="customers" element={ <CustomerList  /> }/>
                <Route path="customers/:customerId" element={ <CustomerDetails /> }/> */}
            </Route>
        </Routes>
    )
}