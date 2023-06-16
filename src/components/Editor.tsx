import { SandpackProvider, SandpackLayout, SandpackFileExplorer, SandpackCodeEditor, SandpackPreview, SandpackConsole, SandpackTests } from "@codesandbox/sandpack-react";

const Editor = (props) => {
  const { files, testMode } = props;
  return (
    <SandpackProvider
      files={files} template={testMode ? "test-ts" : "vite"}>
      <SandpackLayout>
        {testMode ? "" : <SandpackPreview />}
        {testMode ? <SandpackTests /> : <SandpackConsole className="not-prose" />}
      </SandpackLayout>
      <SandpackLayout >
        <SandpackFileExplorer />
        <SandpackCodeEditor showTabs={false} />
      </SandpackLayout>

    </SandpackProvider>
  );
};

export default Editor;
