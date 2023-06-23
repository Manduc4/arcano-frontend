import Router from "./routes";
import { createTheme } from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";

function App() {
  const theme = createTheme();
  return (
    <ThemeProvider {...{ theme }}>
      <SnackbarProvider>
        <Router />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
