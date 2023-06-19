import { SandpackProvider, SandpackLayout, SandpackFileExplorer, SandpackCodeEditor, SandpackPreview, SandpackConsole, SandpackTests } from "@codesandbox/sandpack-react";
import { useMemo } from "react";

const Editor = (props) => {
  const { files, testMode } = props;

  const innerFiles = useMemo(() => {
    if (testMode) {

      return {
        ...files,
        '/add.test.ts': { hidden: true },
        '/add.ts': { hidden: true }
      }
    }

    return files;
  }, [testMode, files]);



  return (
    <SandpackProvider
      files={innerFiles}
      template={testMode ? "test-ts" : "vite"}
      options={{
        activeFile: Object.keys(files)[0],
        visibleFiles: Object.keys(files)
      }}
    >
      <SandpackLayout>
        {testMode ? "" : <SandpackPreview />}
        {testMode ? <SandpackTests /> : <SandpackConsole className="not-prose" />}
      </SandpackLayout>
      <SandpackLayout >
        <SandpackFileExplorer autoHiddenFiles />
        <SandpackCodeEditor showTabs={false} />
      </SandpackLayout>

    </SandpackProvider>
  );
};

export default Editor;
