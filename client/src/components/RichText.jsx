import { useCallback, useEffect, useState } from "react";
import {
  Editor,
  Transforms,
  createEditor,
  Element as SlateElement,
} from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import Toolbar from "./Toolbar";
import { TOOLBAR_BUTTONS } from "../utils/constants";
import React from "react";
import isHotkey from "is-hotkey";

const RichText = ({ data, setData, readOnly = false }) => {
  const [editor] = useState(() => withReact(createEditor()));
  const LIST_TYPES = ["list-ul", "list-ol"];
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

  const Element = ({ attributes, children, element }) => {
    const style = { textAlign: element.align };
    switch (element.type) {
      case "block-quote":
        return (
          <blockquote style={style} {...attributes}>
            {children}
          </blockquote>
        );
      case "list-ul":
        return (
          <ul style={style} {...attributes}>
            {children}
          </ul>
        );
      case "chevron-up":
        return (
          <h1 style={style} {...attributes}>
            {children}
          </h1>
        );
      case "chevron-down":
        return (
          <h2 style={style} {...attributes}>
            {children}
          </h2>
        );
      case "list-item":
        return (
          <li style={style} {...attributes}>
            {children}
          </li>
        );
      case "list-ol":
        return (
          <ol style={style} {...attributes}>
            {children}
          </ol>
        );
      default:
        return (
          <span style={style} {...attributes}>
            {children}
          </span>
        );
    }
  };

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  const renderElement = useCallback((props) => {
    return <Element {...props} />;
  }, []);

  const isBlockActive = (editor, format, blockType = "type") => {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n[blockType] === format,
      })
    );

    return !!match;
  };

  const toggleBlock = (editor, format, e) => {
    const isActive = isBlockActive(editor, format);
    if (isActive) {
      e.classList.remove("text-light");
      e.classList.remove("bg-dark");
    } else {
      e.classList.add("text-light");
      e.classList.add("bg-dark");
    }
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        LIST_TYPES.includes(n.type),
      split: true,
    });
    let newProperties;
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
    Transforms.setNodes(editor, newProperties);

    if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  };

  const isMarkActive = (editor, mark) => {
    const marks = Editor.marks(editor);
    return marks ? marks[mark] === true : false;
  };

  const toggleMark = (editor, mark, e) => {
    if (isMarkActive(editor, mark)) {
      Editor.removeMark(editor, mark);
      e.classList.remove("text-light");
      e.classList.remove("bg-dark");
    } else {
      Editor.addMark(editor, mark, true);
      e.classList.add("text-light");
      e.classList.add("bg-dark");
    }
  };

  return (
    <Slate
      editor={editor}
      initialValue={data || []}
      onChange={(value) => {
        const isAstChange = editor.operations.some(
          (op) => "set_selection" !== op.type
        );
        if (isAstChange) {
          setData(JSON.stringify(value));
        }
      }}
    >
      {!readOnly && (
        <Toolbar
          toggleMark={toggleMark}
          isMarkActive={isMarkActive}
          toggleBlock={toggleBlock}
          isBlockActive={isBlockActive}
        />
      )}
      <Editable
        placeholder="Your text goes here..."
        readOnly={readOnly}
        renderPlaceholder={({ children, attributes }) => (
          <div {...attributes}>
            <p style={{ color: "black" }}>{children}</p>
          </div>
        )}
        renderLeaf={renderLeaf}
        renderElement={renderElement}
        style={{
          outline: "none",
          paddingTop: "0.8rem",
        }}
        onKeyDown={(event) => {
          for (let { key, mark } of TOOLBAR_BUTTONS) {
            if (key && isHotkey(key, event)) {
              event.preventDefault();
              toggleMark(editor, mark);
            }
          }
        }}
      />
      {/* {readOnly ? (
        <div>
          {data.map((node, index) => (
            <Element key={index} attributes={{}}>
              {node.children.map((text, textIndex) => (
                <Leaf key={textIndex} attributes={{}}>
                  {text.text}
                </Leaf>
              ))}
            </Element>
          ))}
        </div>
      ) : (
        <>
        </>
      )} */}
    </Slate>
  );
};

export default RichText;
