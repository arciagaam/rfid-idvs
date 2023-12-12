import { Route, Routes } from "react-router-dom"

// Layouts
import { RootLayout } from "./layout/RootLayout"
import { AdminLayout } from "./layout/AdminLayout"
import { ProtectedLayout } from "./layout/ProtectedLayout"

// Pages
import { Home } from "./pages/home"
import { Login } from "./pages/login"

// Admin pages
import { Dashboard } from "./pages/admin/dashboard"
import { UserManagement } from "./pages/admin/user_management"
import { StudentManagement } from "./pages/admin/student_management"
import { SchoolYearManagement } from "./pages/admin/school_year_management"
import { UserLayout } from "./layout/UserLayout"

// User pages

function App() {
    return (
        <Routes>
            <Route element={<RootLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />

                <Route path="/app" element={<ProtectedLayout />}>
                    <Route path="" element={<UserLayout />}>
                        <Route path="dashboard" element={<Dashboard />} />
                    </Route>

                    <Route path="admin" element={<AdminLayout />}>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="user-management" element={<UserManagement />} />
                        <Route path="student-management" element={<StudentManagement />} />
                        <Route path="school-year-management" element={<SchoolYearManagement />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    )
}

export default App
