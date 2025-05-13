import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import { useEditTargetNoteStore } from "../../store/editTargetNoteStore";
import { useCurrentNotesViewStore } from "../../store/currentNotesViewStore";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import EditorMenu from "./EditorMenu";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight, all } from "lowlight";
import TextAlign from "@tiptap/extension-text-align";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";

function NoteEditor() {
  const { editTargetNote, setEditTargetNote } = useEditTargetNoteStore();
  const { notesView, setNotesView } = useCurrentNotesViewStore();

  const [noteName, setNoteName] = useState();
  const [content, setContent] = useState();

  const lowlight = createLowlight(all);

  function handleNoteNameChange(e) {
    setNoteName(e.target.value);
  }

  function handleCloseButtonClick() {
    setNotesView(APP_CONSTANTS.VIEW_GRID);
  }

  const extensions = [
    StarterKit.configure({
      dropcursor: false,
      codeBlock: false,
      heading: false,
      gapcursor: true,
    }),
    Heading.configure({
      levels: [1, 2, 3, 4, 5, 6],
    }),
    Placeholder.configure({
      placeholder: APP_CONSTANTS.NOTE_EDITOR_PLACEHOLDER,
    }),
    Underline,
    Subscript,
    Superscript,
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
    CodeBlockLowlight.configure({
      lowlight: lowlight,
    }),
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
    Link.configure({
      openOnClick: true,
      autolink: true,
      defaultProtocol: "https",
      protocols: ["https", "http"],
    }),
    Youtube.configure({
      nocookie: true,
    }),
    TextStyle,
    FontFamily,
  ];

  useEffect(() => {
    setNoteName(editTargetNote.name);
    setContent(editTargetNote.content);
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <div className="flex-grow">
          <input
            type="text"
            className="input shadow-none border-none w-full text-2xl font-bold pl-0 focus:outline-none focus:shadow-none"
            placeholder="Untitled note"
            value={noteName}
            maxLength={150}
            onChange={handleNoteNameChange}
          />
        </div>
        <div className="flex gap-2">
          <div className="tooltip tooltip-bottom ml-2">
            <button className="btn btn-square"></button>
          </div>
          <div className="tooltip tooltip-bottom" data-tip={"Close"}>
            <button className="btn btn-square" onClick={handleCloseButtonClick}>
              <X></X>
            </button>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <EditorProvider
        content={content}
        extensions={extensions}
        slotBefore={<EditorMenu></EditorMenu>}
        autofocus={true}
        editorContainerProps={{
          className: "prose text-xl min-w-full",
        }}
      ></EditorProvider>
    </div>
  );
}

export default NoteEditor;
