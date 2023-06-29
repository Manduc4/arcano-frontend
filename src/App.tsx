import { SnackbarProvider } from "notistack";
import Router from "./routes";
import { createTheme } from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import Chart, { CategoryScale } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

function App() {
  const theme = createTheme();

  Chart.register(CategoryScale);

  return (
    <ThemeProvider {...{ theme }}>
      <SnackbarProvider
        dense
        maxSnack={5}
        preventDuplicate
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Router />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
