import { FC, useEffect, useRef, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

const TextEditor: FC = () => {
  const [value, setValue] = useState<string>("# Header");
  const [isTextEditing, setIsTextEditing] = useState<boolean>(false);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const editingTextListener = (event: MouseEvent) => {
      if (
        editorRef.current &&
        event.target &&
        editorRef.current.contains(event.target as Node)
      ) {
        return;
      }

      setIsTextEditing(false);
    };

    document.addEventListener("click", editingTextListener, { capture: true });

    return () => {
      document.removeEventListener("click", editingTextListener, {
        capture: true,
      });
    };
  }, []);

  return (
    <div>
      {isTextEditing ? (
        <div className="text-editor" ref={editorRef}>
          <MDEditor
            value={value}
            onChange={(value: string | undefined) => setValue(value ?? "")}
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
            }}
          />
        </div>
      ) : (
        <div
          className="border border-slate-800 text-editor"
          onClick={() => setIsTextEditing(true)}
        >
          <MDEditor.Markdown source={value} />
        </div>
      )}
    </div>
  );
};

export default TextEditor;
