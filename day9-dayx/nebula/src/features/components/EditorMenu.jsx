import { useCurrentEditor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Subscript,
  Superscript,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListOrdered,
  ListChecks,
  Code,
  SquareCode,
  TextQuote,
  Table,
  Video,
  Link,
  Minus,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Undo,
  Redo,
  PaintBucket,
  TableCellsMerge,
  TableCellsSplit,
  SquareX,
} from "lucide-react";
import AddRowIcon from "../../assets/AddRowIcon";
import AddColumnIcon from "../../assets/AddColumnIcon";
import DeleteRowIcon from "../../assets/DeleteRowIcon";
import DeleteColumnIcon from "../../assets/DeleteColumnIcon";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import EditorLinkModal from "../components/EditorLinkModal";
import EditorYouTubeLinkModal from "../components/EditorYouTubeLinkModal";
import GenericModal from "../components/GenericModal";
import { useState } from "react";
import EditorMenuTopBar from "./EditorMenuTopBar";

function EditorMenu() {
  const fonts = [
    "Plus Jakarta Sans",
    "Arial",
    "Verdana",
    "Tahoma",
    "Trebuchet MS",
    "Times New Roman",
    "Georgia",
    "Courier New",
    "Monospace",
    "Sans serif",
    "Serif",
  ];

  const { editor } = useCurrentEditor();

  function Section({ title, children, className }) {
    return (
      <div className="w-fit">
        <h3 className="font-bold mb-2 text-gray-400">{title}</h3>
        <div className={className}>{children}</div>
      </div>
    );
  }

  function getActiveFont() {
    for (let font of fonts) {
      if (editor.isActive("textStyle", { fontFamily: font })) {
        return font; // Return the first active font
      }
    }
    return fonts[0]; // Default to the first font if none is active
  }

  function addLinkToEditor(url) {
    if (editor.view.state.selection.empty) {
      const domain = url.split("//")[1].split("/")[0];
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .insertContent(domain)
        .run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  }

  function addYouTubeLinkToEditor(youtubeURL) {
    editor.commands.setYoutubeVideo({ src: youtubeURL });
  }

  return (
    <div className="">
      <EditorLinkModal addLinkToEditor={addLinkToEditor}></EditorLinkModal>
      <EditorYouTubeLinkModal
        addYouTubeLinkToEditor={addYouTubeLinkToEditor}
      ></EditorYouTubeLinkModal>
      <GenericModal></GenericModal>
      <EditorMenuTopBar></EditorMenuTopBar>
      <div className="flex flex-wrap justify-between w-full select-none">
        {/* Headings */}
        <Section
          title="Headings"
          className={"grid grid-cols-3 grid-rows-2 gap-1"}
        >
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 1 }).run();
            }}
            className={
              editor.isActive("heading", { level: 1 })
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <Heading1></Heading1>
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 2 }).run();
            }}
            className={
              editor.isActive("heading", { level: 2 })
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <Heading2 />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 3 }).run();
            }}
            className={
              editor.isActive("heading", { level: 3 })
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <Heading3 />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 4 }).run();
            }}
            className={
              editor.isActive("heading", { level: 4 })
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <Heading4 />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 5 }).run();
            }}
            className={
              editor.isActive("heading", { level: 5 })
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <Heading5 />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 6 }).run();
            }}
            className={
              editor.isActive("heading", { level: 6 })
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <Heading6 />
          </button>
        </Section>

        {/* Font */}
        <Section title="Font styles" className={"grid gap-1"}>
          <select
            className="select w-fit bg-base-200"
            value={getActiveFont()}
            onChange={(e) => {
              editor.chain().focus().setFontFamily(e.target.value).run();
            }}
          >
            {fonts.map((font, id) => {
              return (
                <option key={id} value={font}>
                  {font}
                </option>
              );
            })}
          </select>
          {/* <button className="btn btn-square"> // Implement later.
            <PaintBucket />
          </button> */}
        </Section>

        {/* Text Formatting */}
        <Section
          title="Text Formatting"
          className={"grid grid-cols-4 grid-rows-2 gap-1"}
        >
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleBold().run();
            }}
            className={
              editor.isActive("bold")
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <Bold />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleItalic().run();
            }}
            className={
              editor.isActive("italic")
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <Italic />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleUnderline().run();
            }}
            className={
              editor.isActive("underline")
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <Underline />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleStrike().run();
            }}
            className={
              editor.isActive("strike")
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <Strikethrough />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleSubscript().run();
            }}
            className={
              editor.isActive("subscript")
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <Subscript />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleSuperscript().run();
            }}
            className={
              editor.isActive("superscript")
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <Superscript />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleBlockquote().run();
            }}
            className={
              editor.isActive("blockquote")
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <TextQuote />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().setHorizontalRule().run();
            }}
            className={"btn btn-square"}
          >
            <Minus />
          </button>
        </Section>

        {/* Lists */}
        <Section title="Lists" className={"grid grid-cols-2 grid-rows-1 gap-1"}>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleBulletList().run();
            }}
            className={
              editor.isActive("bulletList")
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <List />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleOrderedList().run();
            }}
            className={
              editor.isActive("orderedList")
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <ListOrdered />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleTaskList().run();
            }}
            className={
              editor.isActive("taskList")
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <ListChecks />
          </button>
        </Section>

        {/* Code & Block Formatting */}
        <Section title="Code" className={"grid grid-cols-2 grid-rows-1 gap-1"}>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleCode().run();
            }}
            className={
              editor.isActive("code")
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <Code />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleCodeBlock().run();
            }}
            className={
              editor.isActive("codeBlock")
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <SquareCode />
          </button>
        </Section>

        {/* Alignment */}
        <Section
          title="Alignment"
          className={"grid grid-cols-2 grid-rows-2 gap-1"}
        >
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().setTextAlign("left").run();
            }}
            className={
              editor.isActive({ textAlign: "left" })
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <AlignLeft />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().setTextAlign("center").run();
            }}
            className={
              editor.isActive({ textAlign: "center" })
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <AlignCenter />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().setTextAlign("right").run();
            }}
            className={
              editor.isActive({ textAlign: "right" })
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <AlignRight />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().setTextAlign("justify").run();
            }}
            className={
              editor.isActive({ textAlign: "justify" })
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <AlignJustify />
          </button>
        </Section>

        {/* Table */}
        <Section title="Table" className={"grid grid-cols-4 grid-rows-2 gap-1"}>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor
                .chain()
                .focus()
                .insertTable({ rows: 2, cols: 2, withHeaderRow: false })
                .run();
            }}
            className={"btn btn-square"}
          >
            <Table />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().addRowAfter().run();
            }}
            className={"btn btn-square"}
            disabled={!editor.isActive("table")}
          >
            <AddRowIcon></AddRowIcon>
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().addColumnAfter().run();
            }}
            className={"btn btn-square"}
            disabled={!editor.isActive("table")}
          >
            <AddColumnIcon></AddColumnIcon>
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().deleteRow().run();
            }}
            className={"btn btn-square"}
            disabled={!editor.isActive("table")}
          >
            <DeleteRowIcon></DeleteRowIcon>
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().deleteColumn().run();
            }}
            className={"btn btn-square"}
            disabled={!editor.isActive("table")}
          >
            <DeleteColumnIcon></DeleteColumnIcon>
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().mergeCells().run();
            }}
            className={"btn btn-square"}
            disabled={!editor.isActive("table")}
          >
            <TableCellsMerge></TableCellsMerge>
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().splitCell().run();
            }}
            className={"btn btn-square"}
            disabled={!editor.isActive("table")}
          >
            <TableCellsSplit></TableCellsSplit>
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().deleteTable().run();
            }}
            className={"btn btn-square"}
            disabled={!editor.isActive("table")}
          >
            <SquareX></SquareX>
          </button>
        </Section>

        {/* Embeds */}
        <Section title="Links" className={"grid grid-cols-2 grid-rows-1 gap-1"}>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              document
                .getElementById(APP_CONSTANTS.EDITOR_LINK_MODAL)
                .showModal();
            }}
            className={
              editor.isActive("youtube")
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <Link></Link>
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              document
                .getElementById(APP_CONSTANTS.EDITOR_YOUTUBE_LINK_MODAL)
                .showModal();
            }}
            className={
              editor.isActive("link")
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <Video></Video>
          </button>
        </Section>

        {/* History */}
        <Section
          title="History"
          className={"grid grid-cols-2 grid-rows-1 gap-1"}
        >
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().undo().run();
            }}
            className={"btn btn-square"}
            disabled={!editor.can().undo()}
          >
            <Undo />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().redo().run();
            }}
            className={"btn btn-square"}
            disabled={!editor.can().redo()}
          >
            <Redo />
          </button>
        </Section>
      </div>
      <div className="divider"></div>
    </div>
  );
}

export default EditorMenu;
