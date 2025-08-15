import { BrowserRouter as Router } from "react-router-dom"
import { CssBaseline } from "@mui/material"
import { ThemeContextProvider } from "./contexts/ThemeContext"
import { LanguageContextProvider } from "./contexts/LanguageContext"
import { AuthContextProvider } from "./contexts/AuthContext"
import { LayoutContextProvider } from "./contexts/LayoutContext"
import AppRoutes from "./routes/AppRoutes"
import "./styles/index.css"

function App() {
  return (
    <ThemeContextProvider>
      <LanguageContextProvider>
        <AuthContextProvider>
          <LayoutContextProvider>
            <Router>
              <CssBaseline />
              <AppRoutes />
            </Router>
          </LayoutContextProvider>
        </AuthContextProvider>
      </LanguageContextProvider>
    </ThemeContextProvider>
  )
}

export default App
