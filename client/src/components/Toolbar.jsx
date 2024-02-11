import React from "react";
import isHotKey from "is-hotkey";
import { useSlate } from "slate-react";
import { TOOLBAR_BUTTONS } from "../utils/constants";
import { isBlock } from "slate";

const Toolbar = ({ toggleMark, isMarkActive, toggleBlock, isBlockActive }) => {
  const editor = useSlate();
  const iconClassNames = [
    "underline",
    "bold",
    "italic",
    "strikethrough",
    "code",
    "list-ul",
    "list-ol",
  ];

  const buttonsData = {
    classNames: "btn m-1 p-1 border-0 rounded-0 fw-normal btn-secondary",
    onBtnMouseOver: (e) => {
      e.classList.add("text-light");
    },
    onBtnMouseOut: (e) => {
      e.classList.remove("text-light");
    },
  };

  return (
    <>
      <div className="m-0 p-0">
        <div className="btn-group" role="group" aria-label="Basic example">
          {iconClassNames.map((icon, index) => {
            return (
              <button
                key={index}
                type="button"
                className={
                  buttonsData.classNames +
                  ((
                    TOOLBAR_BUTTONS[index].mark
                      ? isMarkActive(editor, icon)
                      : isBlockActive(editor, icon)
                  )
                    ? " bg-dark text-light"
                    : "")
                }
                onMouseOver={(e) => buttonsData.onBtnMouseOver(e.target)}
                onMouseOut={(e) => buttonsData.onBtnMouseOut(e.target)}
                onClick={(e) => {
                  e.preventDefault();
                  TOOLBAR_BUTTONS[index].mark
                    ? toggleMark(editor, icon)
                    : toggleBlock(editor, icon);
                }}
              >
                <i className={`fas fa-${icon}`}></i>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Toolbar;
