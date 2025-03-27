import { FC, useRef } from "react";
import MonacoEditor, { OnMount } from "@monaco-editor/react";
import editor from "monaco-editor";
import prettier from "prettier/standalone";
import parser from "prettier/plugins/babel";
import esTree from "prettier/plugins/estree";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import MonacoJSXHighlighter from "monaco-jsx-highlighter";
import { CodeEditorProps } from "../../interfaces";

const CodeEditor: FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<editor.editor.IStandaloneCodeEditor>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    const babelParse = (code: string) =>
      parse(code, {
        sourceType: "module",
        plugins: ["jsx"],
      });

    const monacoJSXHighlighter = new MonacoJSXHighlighter(
      monaco,
      babelParse,
      traverse,
      editor
    );

    monacoJSXHighlighter.highLightOnDidChangeModelContent(
      100,
      () => {},
      () => {},
      undefined,
      () => {}
    );
    monacoJSXHighlighter.addJSXCommentCommand();
  };

  const handleFormatCode = async () => {
    // Get current value from the editor
    const unformattedCode = editorRef.current?.getValue() as string;
    // Format that value
    const formattedCode = await prettier.format(unformattedCode, {
      parser: "babel",
      plugins: [parser, esTree],
      useTabs: false,
      semi: true,
      singleQuote: false,
    });
    // Set the formatted value back in the editor
    editorRef.current?.setValue(formattedCode.replace(/\n$/, ""));
  };

  return (
    <div className="relative h-full group w-[calc(100%-1rem)]">
      <button
        className="btn btn-sm btn-primary absolute top-2.5 right-2.5 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        onClick={handleFormatCode}
      >
        Format
      </button>
      <MonacoEditor
        height="100%"
        defaultLanguage="javascript"
        language="javascript"
        theme="vs-dark"
        value={initialValue}
        onChange={(value) => onChange(value as string)}
        onMount={handleEditorDidMount}
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
    </div>
  );
};

export default CodeEditor;
