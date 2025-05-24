import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { NewNavbar } from "./components/shared/Navbar";
import { AuthProvider } from "./contexts/AuthContext";
import AppRoutes from "./router/routes";

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <AuthProvider>
                    <NewNavbar />
                    <AppRoutes />
                </AuthProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
