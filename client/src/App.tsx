import { FC } from "react";
import { Provider } from "react-redux";
import { store } from "./state";
import { CellList } from "./components";

const App: FC = () => {
  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

export default App;
