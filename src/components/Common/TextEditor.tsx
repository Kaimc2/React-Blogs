import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import {
  RiBold,
  RiItalic,
  RiStrikethrough,
  RiCodeFill,
  RiMarkPenFill,
  RiParagraph,
  RiH1,
  RiH2,
  RiListCheck,
  RiListOrdered,
  RiCodeBoxLine,
  RiSeparator,
  RiDoubleQuotesL,
  RiArrowGoBackLine,
  RiArrowGoForwardLine,
  RiTextWrap,
  RiFormatClear,
} from "react-icons/ri";

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="flex items-center justify-evenly text-xl flex-wrap p-[0.5rem] mt-3 bg-black rounded-tl-md rounded-tr-md">
      <button
        title="Bold"
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={
          editor.isActive("bold") ? "is-active menu-item" : "menu-item"
        }
      >
        <RiBold />
      </button>
      <button
        title="Italic"
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic") ? "is-active menu-item" : "menu-item"
        }
      >
        <RiItalic />
      </button>
      <button
        title="Strike"
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={
          editor.isActive("strike") ? "is-active menu-item" : "menu-item"
        }
      >
        <RiStrikethrough />
      </button>
      <button
        title="Code"
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={
          editor.isActive("code") ? "is-active menu-item" : "menu-item"
        }
      >
        <RiCodeFill />
      </button>
      <button
        title="Highlight"
        type="button"
        onClick={() => editor.chain().toggleHighlight().run()}
        disabled={!editor.chain().toggleHighlight().run()}
        className={
          editor.isActive("highlight") ? "is-active menu-item" : "menu-item"
        }
      >
        <RiMarkPenFill />
      </button>

      {/* Divider */}
      <div className="h-[1.25rem] mx-[0.5rem] w-[1px] bg-gray-500"></div>

      <button
        title="Heading 1"
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 })
            ? "is-active menu-item"
            : "menu-item"
        }
      >
        <RiH1 />
      </button>
      <button
        title="Heading 2"
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 })
            ? "is-active menu-item"
            : "menu-item"
        }
      >
        <RiH2 />
      </button>
      <button
        title="Paragraph"
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={
          editor.isActive("paragraph") ? "is-active menu-item" : "menu-item"
        }
      >
        <RiParagraph />
      </button>
      <button
        title="Bullet List"
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList") ? "is-active menu-item" : "menu-item"
        }
      >
        <RiListCheck />
      </button>
      <button
        title="Ordered List"
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive("orderedList") ? "is-active menu-item" : "menu-item"
        }
      >
        <RiListOrdered />
      </button>
      <button
        title="Code Block"
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={
          editor.isActive("codeBlock") ? "is-active menu-item" : "menu-item"
        }
      >
        <RiCodeBoxLine />
      </button>

      {/* Divider */}
      <div className="h-[1.25rem] mx-[0.5rem] w-[1px] bg-gray-500"></div>

      <button
        title="Blockquote"
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={
          editor.isActive("blockquote") ? "is-active menu-item" : "menu-item"
        }
      >
        <RiDoubleQuotesL />
      </button>
      <button
        title="Horizontal Rule"
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="menu-item"
      >
        <RiSeparator />
      </button>

      {/* Divider */}
      <div className="h-[1.25rem] mx-[0.5rem] w-[1px] bg-gray-500"></div>

      <button
        title="Hard Break"
        type="button"
        onClick={() => editor.chain().focus().setHardBreak().run()}
        className="menu-item"
      >
        <RiTextWrap />
      </button>
      <button
        title="Clear Format"
        type="button"
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className="menu-item"
      >
        <RiFormatClear />
      </button>

      {/* Divider */}
      <div className="h-[1.25rem] mx-[0.5rem] w-[1px] bg-gray-500"></div>

      <button
        title="Undo"
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="menu-item"
      >
        <RiArrowGoBackLine />
      </button>
      <button
        title="Redo"
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="menu-item"
      >
        <RiArrowGoForwardLine />
      </button>
    </div>
  );
};

const extensions = [
  StarterKit,
  Placeholder.configure({ placeholder: "Write Something..." }),
  Highlight,
];

export const TextEditor = ({ body, onChange, setError, clearErrors }: any) => {
  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      extensions={extensions}
      content={body}
      onUpdate={({ editor }) => {
        const editorContent = editor.getHTML();

        if (
          editorContent === "<p></p>" ||
          editorContent === "<h1></h1>" ||
          editorContent === "<h2></h2>"
        ) {
          setError("body", { message: "body is a required field" });
        } else {
          onChange(editorContent);
          clearErrors("body");
        }
      }}
      editorProps={{
        attributes: {
          class:
            "text-editor border shadow-md rounded-bl-md rounded-br-md min-h-[5rem] max-h-[10rem] overflow-y-scroll overflow-x-hidden",
        },
      }}
      children={``}
    ></EditorProvider>
  );
};
