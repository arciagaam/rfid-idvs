import { Route, Routes } from "react-router-dom"

// Layouts
import { RootLayout } from "./layout/RootLayout"
import { AdminLayout } from "./layout/AdminLayout"
import { ProtectedLayout } from "./layout/ProtectedLayout"

// Pages
import { Home } from "./pages/home"
import { Login } from "./pages/login"
import { ForgotPassword } from "./pages/login/forgot_password"

// Admin pages
import { Dashboard } from "./pages/admin/dashboard"
import { UserManagement } from "./pages/admin/user_management"
import { StudentManagement } from "./pages/admin/student_management"
import { SchoolYearManagement } from "./pages/admin/school_year_management"
import { UserLayout } from "./layout/UserLayout"
import { StudentIDValidation } from "./pages/admin/student_id_validation"
import { Archived } from "./pages/admin/archived"

// User pages
import { Dashboard as UserDashboard } from "./pages/user/dashboard"
import { StudentIDValidation as UserStudentIDValidation } from "./pages/user/student_id_validation"
import { ManageAccount } from "./pages/common/manage_account"
import PrintReport from "./pages/admin/student_id_validation/components/PrintReport"

function App() {
    return (
        <Routes>

            <Route path="/print/validation" element={<PrintReport/>}/>

            <Route element={<RootLayout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                <Route element={<ProtectedLayout />}>
                    <Route path="/" element={<UserLayout />}>
                        <Route path="dashboard" element={<UserDashboard />} />
                        <Route path="departments/:slug" element={<UserStudentIDValidation />} />
                        <Route path="account" element={<ManageAccount />} />
                    </Route>

                    <Route path="/admin" element={<AdminLayout />}>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="user-management" element={<UserManagement />} />
                        <Route path="student-management" element={<StudentManagement />} />
                        <Route path="school-year-management" element={<SchoolYearManagement />} />
                        <Route path="archived" element={<Archived />} />
                        <Route path="departments/:slug" element={<StudentIDValidation />} />
                        <Route path="account" element={<ManageAccount />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    )
}

export default App
