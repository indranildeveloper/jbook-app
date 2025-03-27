import { FC, useEffect, useRef, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { useActions } from "../../hooks";
import { TextEditorProps } from "../../interfaces";

const TextEditor: FC<TextEditorProps> = ({ cell }) => {
  const [isTextEditing, setIsTextEditing] = useState<boolean>(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const { updateCell } = useActions();

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
            value={cell.content}
            onChange={(value: string | undefined) =>
              updateCell(cell.id, value ?? "")
            }
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
          <MDEditor.Markdown source={cell.content || "Click to edit"} />
        </div>
      )}
    </div>
  );
};

export default TextEditor;
