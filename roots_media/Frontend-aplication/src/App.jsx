import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./styles/theme";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <AppRouter />
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
