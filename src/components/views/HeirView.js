import { Outlet, Route, Routes } from "react-router-dom";
import { About } from "../information/About";
import { NewMemoryForm } from "../memories/Memory Form";
import { HeirProfile } from "../profile/HeirProfile";
import { ProfileDetails } from "../profile/ProfileDetail";
import { UserProfileList } from "../profile/ProfileList";
import { RequestList } from "../requests/RequestList";
import { NewTreasureForm } from "../treasures/NewTreasureForm";
import { TreasureContainer } from "../treasures/TreasureContainer";
import { TreasureDetails } from "../treasures/TreasureDetail";

export const HeirViews = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <h1>The Living Legend</h1>
            <div>Leave A Legacy</div>

            <Outlet />
          </>
        }
      >
        <Route path="/family_tree" element={<UserProfileList />}></Route>
        <Route path="/family_tree/:userId" element={<ProfileDetails />} />
        <Route path="treasure" element={<TreasureContainer />} />
        <Route path="about" element={<About />} />
        <Route path="treasure/create" element={<NewTreasureForm />} />
        <Route path="treasure/:treasureId" element={<TreasureDetails />} />
        <Route
          path="treasure/:treasureId/createMemory"
          element={<NewMemoryForm />}
        />
        <Route path="requests" element={<RequestList />} />
        <Route path="profile" element={<HeirProfile />} />
      </Route>
    </Routes>
  );
};
