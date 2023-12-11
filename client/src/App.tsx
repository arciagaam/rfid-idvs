import { Route, Routes } from "react-router-dom"

// Layouts
import { RootLayout } from "./layout/RootLayout"

// Pages
import { Home } from "./pages/home"
import { Login } from "./pages/login"

function App() {
    return (
        <Routes>
            <Route element={<RootLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
            </Route>
        </Routes>
    )
}

export default App
