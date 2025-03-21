import { FC, useEffect, useRef } from "react";
import { CodePreviewProps } from "../interfaces";
import { htmlTemplate } from "../constants/htmlTemplate";
import { cn } from "../utils/utils";

const CodePreview: FC<CodePreviewProps> = ({ code }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    iframeRef.current!.srcdoc = htmlTemplate;
    setTimeout(() => {
      iframeRef.current?.contentWindow?.postMessage(code, "*");
    }, 100);
  }, [code]);

  return (
    <div
      className={cn(
        // TODO: only use tailwindcss
        "h-full grow relative code-preview-wrapper"
      )}
    >
      <iframe
        title="preview"
        ref={iframeRef}
        srcDoc={htmlTemplate}
        sandbox="allow-scripts"
        className="border w-full h-full bg-white"
      />
    </div>
  );
};

export default CodePreview;
