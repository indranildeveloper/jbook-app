import { FC } from "react";
import { CodeCell, TextEditor } from "./components";

const App: FC = () => {
  return (
    <div>
      <CodeCell />
      <div className="my-10" />
      <TextEditor />
    </div>
  );
};

export default App;
