import { Route, Routes } from "react-router-dom"

// Layouts
import { RootLayout } from "./layout/RootLayout"

// Pages
import { Login } from "./pages/Login"
import { Home } from "./pages/Home"

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
