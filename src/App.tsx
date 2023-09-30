import React from 'react';
import {
    Routes,
    Route
} from "react-router-dom";
import Projects from "./pages/projects";
import Tasks from "./pages/tasks";

function App() {
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={<Projects />}
                />
                <Route
                    path="/:uid"
                    element={<Tasks />}
                />
            </Routes>
        </>
    );
}

export default App;
