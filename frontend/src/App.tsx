import { Navigate, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import AppLayout from "./components/layout/AppLayout";

import DashboardPage from "./pages/DashboardPage";
import ProjectsPage from "./pages/ProjectsPage";
import TasksPage from "./pages/TasksPage";
import CalendarPage from "./pages/CalendarPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";

import ProtectedRoute from "./features/auth/components/ProtectedRoute";
import GuestRoute from "./features/auth/components/GuestRoute";


export default function App() {

    return (

        <>

            <Routes>


                {/* Guest Routes */}

                <Route
                    path="/login"
                    element={
                        <GuestRoute>
                            <LoginPage />
                        </GuestRoute>
                    }
                />


                <Route
                    path="/register"
                    element={
                        <GuestRoute>
                            <RegisterPage />
                        </GuestRoute>
                    }
                />



                {/* Protected Routes */}

                <Route
                    element={
                        <ProtectedRoute>
                            <AppLayout />
                        </ProtectedRoute>
                    }
                >

                    <Route
                        path="/"
                        element={
                            <Navigate
                                to="/dashboard"
                                replace
                            />
                        }
                    />


                    <Route
                        path="/dashboard"
                        element={<DashboardPage />}
                    />


                    <Route
                        path="/projects"
                        element={<ProjectsPage />}
                    />


                    <Route
                        path="/tasks"
                        element={<TasksPage />}
                    />


                    <Route
                        path="/calendar"
                        element={<CalendarPage />}
                    />


                    <Route
                        path="/settings"
                        element={<SettingsPage />}
                    />

                </Route>



                {/* Catch-all */}

                <Route
                    path="*"
                    element={<NotFoundPage />}
                />


            </Routes>


            <Toaster
                position="top-right"
                richColors
                theme="dark"
            />

        </>

    );

}