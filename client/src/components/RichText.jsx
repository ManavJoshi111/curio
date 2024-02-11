import { useCallback, useState } from "react";
import { Editor, createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import Toolbar from "./Toolbar";
import { HOTKEYS } from "../utils/constants";
import React from "react";
import isHotkey from "is-hotkey";

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

  const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
      children = <strong>{children}</strong>;
    }
    if (leaf.code) {
      children = <code>{children}</code>;
    }
    if (leaf.italic) {
      children = <em>{children}</em>;
    }
    if (leaf.underline) {
      children = <u>{children}</u>;
    }
    if (leaf.strikethrough) {
      children = <s>{children}</s>;
    }
    return <span {...attributes}>{children}</span>;
  };

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  const isMarkActive = (editor, mark) => {
    const marks = Editor.marks(editor);
    return marks ? marks[mark] === true : false;
  };

  const toggleMark = (editor, mark) => {
    isMarkActive(editor, mark)
      ? Editor.removeMark(editor, mark)
      : Editor.addMark(editor, mark, true);
  };

  return (
    <div id="texteditor">
      <Slate editor={editor} initialValue={initialValue}>
        <Toolbar toggleMark={toggleMark} isMarkActive={isMarkActive} />
        <Editable
          placeholder="Add your question here..."
          renderLeaf={renderLeaf}
          style={{
            outline: "none",
          }}
          onKeyDown={(event) => {
            for (let { key, mark } of HOTKEYS) {
              if (isHotkey(key, event)) {
                event.preventDefault();
                toggleMark(editor, mark);
              }
            }
          }}
        />
      </Slate>
    </div>
  );
};

export default RichText;
