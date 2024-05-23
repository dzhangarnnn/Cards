import React from "react";
import UserContainer from "../components/userContainer";
import { Navigate, Route, Routes } from "react-router-dom";
import UserPageContainer from "../components/userPageContainer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/users" element={<UserContainer />} />
        <Route path="/users/:id" element={<UserPageContainer />} />
        <Route path="*" element={<Navigate to="/users" />} />
      </Routes>
    </>
  );
}

export default App;
