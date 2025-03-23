import { FC } from "react";
import { Provider } from "react-redux";
import { store } from "./state";
import { CodeCell, TextEditor } from "./components";

const App: FC = () => {
  return (
    <Provider store={store}>
      <div>
        <CodeCell />
        <div className="my-10" />
        <TextEditor />
      </div>
    </Provider>
  );
};

export default App;
