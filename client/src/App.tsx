import { Route, Routes } from "react-router-dom"

// Layouts
import { RootLayout } from "./layout/RootLayout"

// Pages
import { Home } from "./pages/home"
import { Login } from "./pages/login"
import { AuthProvider } from "./providers/AuthProvider"

function App() {
    return (
        <Routes>
            <Route element={<RootLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route element={<AuthProvider />}>
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
