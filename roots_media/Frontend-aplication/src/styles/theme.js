import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {main: "#27382e"},// greenish tone for agri branding
    secondary: { main: "#ff9800" },
  },
  typography: {
    h4: { fontWeight: 700 },
  },
});

export default theme;
