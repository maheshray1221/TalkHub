import {
    Route,
    BrowserRouter as Router,
    Routes
} from "react-router-dom"
import LandingPage from './pages/LandingPage.jsx'
import Authentication from "./pages/authantication.jsx"
import { AuthProvider } from "./contexts/AuthContext.jsx"
import VideoMeet from "./pages/VideoMeet.jsx"

export default function App() {
    return (
        <Router>

            <AuthProvider>

                <Routes>

                    <Route path="/" element={<LandingPage />} />

                    <Route path="/auth" element={<Authentication />} />

                    <Route path="/:url" element={<VideoMeet />} />

                </Routes>

            </AuthProvider>

        </Router>
    )
}

