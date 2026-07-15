import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import AppLayout from "./components/layout/AppLayout";

import DashboardPage from "./pages/DashboardPage";
import ProjectsPage from "./pages/ProjectsPage";
import TasksPage from "./pages/TasksPage";
import CalendarPage from "./pages/CalendarPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";

export default function App() {
    return (
        <>
            <Routes>

                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/register"
                    element={<RegisterPage />}
                />

                <Route
                    element={
                        <ProtectedRoute>

                            <AppLayout />

                        </ProtectedRoute>
                    }
                >
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/tasks" element={<TasksPage />} />
                    <Route path="/calendar" element={<CalendarPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Route>
            </Routes>

            <Toaster
                position="top-right"
                richColors
                theme="dark"
            />
        </>
    );
}