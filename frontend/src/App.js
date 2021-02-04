import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./themeConfig";
import { AppRouter } from "./routers/AppRouter";
import { store } from "./store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
