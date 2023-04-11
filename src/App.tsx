import Router from "./routes";
import { BrowserRouter } from "react-router-dom";
import { createTheme } from "./theme";
import { ThemeProvider } from "@mui/material/styles";

function App() {
  const theme = createTheme();
  return (
    <ThemeProvider {...{ theme }}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
