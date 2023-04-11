import Router from "./routes";
import { createTheme } from "./theme";
import { ThemeProvider } from "@mui/material/styles";

function App() {
  const theme = createTheme();
  return (
    <ThemeProvider {...{ theme }}>
      <Router />
    </ThemeProvider>
  );
}

export default App;
