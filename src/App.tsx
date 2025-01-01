import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ThemeProviderWrapper } from "./contexts/themeContext";
import { Router } from "./routes/sections";

const App = () => {
  return (
    <ThemeProviderWrapper>
      <Router />
    </ThemeProviderWrapper>
  );
};

export default App;
