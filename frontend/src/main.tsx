import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./styles/globals.css";
import App from "./App";
import { AuthProvider } from "./features/auth/context/AuthContext";
import { ProjectsProvider } from "./features/projects/context/ProjectsContext";
import { TasksProvider } from "./features/tasks/context/TasksContext";
import { supabase } from "./lib/supabase";

console.log(supabase);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <ProjectsProvider>
                    <TasksProvider>
                        <App />
                    </TasksProvider>
                </ProjectsProvider>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
);