import { useState } from "react";

import { CssBaseline, ThemeProvider } from "@mui/material";

import { Header, CocomoForm, Footer } from "./components";

import { getTheme } from "./utils/theme/theme.js";

import "./App.css";
import "./components/styles.js"

export const App = () => {
    const [darkMode, setDarkMode] = useState(false);
    const theme = getTheme(darkMode);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="app">
                <Header darkMode={darkMode} setDarkMode={setDarkMode} />
                <CocomoForm />
                <Footer />
            </div>
        </ThemeProvider>
    );
}