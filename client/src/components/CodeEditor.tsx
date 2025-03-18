import { FC } from "react";
import MonacoEditor from "@monaco-editor/react";
import { CodeEditorProps } from "../interfaces";

const CodeEditor: FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  return (
    <MonacoEditor
      height="500px"
      defaultLanguage="javascript"
      language="javascript"
      theme="vs-dark"
      value={initialValue}
      onChange={(value) => onChange(value as string)}
      options={{
        wordWrap: "on",
        minimap: {
          enabled: false,
        },
        showUnused: false,
        folding: true,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
      }}
    />
  );
};

export default CodeEditor;
