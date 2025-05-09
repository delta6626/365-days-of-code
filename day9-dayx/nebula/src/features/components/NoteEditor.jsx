import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { useEditTargetNoteStore } from "../../store/editTargetNoteStore";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";

function NoteEditor() {
  const { editTargetNote, setEditTargetNote } = useEditTargetNoteStore();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: APP_CONSTANTS.NOTE_EDITOR_PLACEHOLDER,
      }),
    ],
  });

  return (
    <>
      <EditorContent className="" editor={editor} />
    </>
  );
}

export default NoteEditor;
