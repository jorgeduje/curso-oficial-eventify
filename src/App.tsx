import { FC } from "react";
import { AppProvider } from "./routes/AppProvider";
import { AppRouter } from "./routes/AppRouter";

const App: FC = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};

export default App;
