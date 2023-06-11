import { Sandpack } from "@codesandbox/sandpack-react";
import { useMemo,useState } from "react";

const files = await getAllFiles();

const Editor = (props) => {
    
    const { type } = props;

  return (
    <Sandpack
      theme="dark"
      files={files}
      template="vite"
      options={{
        showTabs: true,
        closableTabs: true,
        showConsole: true,
        showConsoleButton: true,
        editorHeight: 500,
      }}
    />
  );
};


export const getAllFiles = async (type : string)=>{
    const allFiles = await import.meta.glob("../sample-codes/singleton-pattern/**/*", { eager: true, as : "raw" });
    const files = {};
    Object.keys(allFiles).forEach(key => {
        files[key.replace("../sample-codes/singleton-pattern","")] = allFiles[key];
    });

    return files;
};

export default Editor;
