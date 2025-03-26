import { FC, useEffect, useRef } from "react";
import { htmlTemplate } from "../../constants/htmlTemplate";
import { cn } from "../../utils/utils";
import { CodePreviewProps } from "../../interfaces";

const CodePreview: FC<CodePreviewProps> = ({ code, bundleCodeError }) => {
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
        "h-full relative code-preview-wrapper"
      )}
    >
      <iframe
        title="preview"
        ref={iframeRef}
        srcDoc={htmlTemplate}
        sandbox="allow-scripts"
        className="border w-full h-full transition-none animate-none"
      />
      {bundleCodeError && (
        <div className="absolute top-2.5 left-2.5 text-red-600">
          <h4 className="text-xl mb-2">Compilation Error:</h4>
          {bundleCodeError}
        </div>
      )}
    </div>
  );
};

export default CodePreview;
