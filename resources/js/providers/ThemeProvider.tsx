import CssBaseline from "@mui/material/CssBaseline";
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { PropsWithChildren } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <MUIThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
