import { FC, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./state";
import { CellList } from "./components";
import { initializeBundle } from "./bundler";

const App: FC = () => {
  useEffect(() => {
    initializeBundle();
  }, []);

  return (
    <Provider store={store}>
      <div className="container mx-auto">
        <CellList />
      </div>
    </Provider>
  );
};

export default App;
