import { Route, Routes } from "react-router-dom"

// Layouts
import { RootLayout } from "./layout/RootLayout"
import { AdminLayout } from "./layout/AdminLayout"

// Pages
import { Home } from "./pages/home"
import { Login } from "./pages/login"
import { ProtectedLayout } from "./layout/ProtectedLayout"
import { Dashboard } from "./pages/admin/dashboard"

function App() {
    return (
        <Routes>
            <Route element={<RootLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />

                <Route element={<ProtectedLayout />}>
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="user-management" element={<Dashboard />} />
                        <Route path="student-management" element={<Dashboard />} />
                        <Route path="school-year-management" element={<Dashboard />} />
                    </Route>

                    <Route path="/test" element={<TestElement />}>
                    </Route>
                </Route>
            </Route>
        </Routes>
    )
}

const TestElement = () => {
    return (
        <div>
            <p>Test Protected route</p>
        </div>
    )
}

export default App
