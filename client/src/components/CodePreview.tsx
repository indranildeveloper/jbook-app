import { FC, useEffect, useRef } from "react";
import { CodePreviewProps } from "../interfaces";
import { htmlTemplate } from "../constants/htmlTemplate";

const CodePreview: FC<CodePreviewProps> = ({ code }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    iframeRef.current!.srcdoc = htmlTemplate;
    setTimeout(() => {
      iframeRef.current?.contentWindow?.postMessage(code, "*");
    }, 500);
  }, [code]);

  return (
    <div>
      <iframe
        title="preview"
        ref={iframeRef}
        srcDoc={htmlTemplate}
        sandbox="allow-scripts"
        className="border w-full"
      />
    </div>
  );
};

export default CodePreview;
