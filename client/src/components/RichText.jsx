import { useState } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import Toolbar from "./Toolbar";

import React from "react";

const RichText = () => {
  const [editor] = useState(() => withReact(createEditor()));
  const initialValue = [
    {
      type: "paragraph",
      children: [
        {
          text: "",
        },
      ],
    },
  ];

  return (
    <div id="texteditor">
      <Slate editor={editor} initialValue={initialValue}>
        <Toolbar />
        <Editable
          placeholder="Add your question here..."
          style={{
            outline: "none",
          }}
        />
      </Slate>
    </div>
  );
};

export default RichText;
