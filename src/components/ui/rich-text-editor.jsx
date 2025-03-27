import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { Toggle } from './toggle';
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  Heading1,
  List,
  ListOrdered,
} from 'lucide-react';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="tw-flex tw-flex-wrap tw-gap-2 tw-p-2 tw-border-b">
      <Toggle
        size="sm"
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <BoldIcon className="tw-h-4 tw-w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <ItalicIcon className="tw-h-4 tw-w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('underline')}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
      >
        <UnderlineIcon className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('heading')}
        onPressedChange={() => {
          console.log('Toggle bullet list')
          return editor.chain().focus().toggleHeading({ level: 2 }).run()}
        }
      >
        <Heading1 className="tw-h-4 tw-w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="tw-h-4 tw-w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="tw-h-4 tw-w-4" />
      </Toggle>
    </div>
  );
};

export function RichTextEditor({ value, defaultValue, onChange, placeholder }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'tw-list-disc tw-pl-4',
          }
        },
        orderedList: {
          HTMLAttributes: {
            class: 'tw-list-decimal tw-pl-4',
          }
        },
      }),
      Underline,
    ],
    content: value || defaultValue,
    onUpdate: ({ editor }) => {
      setTimeout(() => {
        onChange(editor.getHTML());
      }, 0);
    },
    editorProps: {
      attributes: {
        class: 'tw-min-h-[150px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 tw-leading-relaxed',
      },
    },
    parseOptions: {
      preserveWhitespace: true,
    },
  });

  return (
    <div className="tw-w-full tw-rounded-md tw-border">
      <MenuBar editor={editor} />
      <div className="tiptap-content">
        <EditorContent editor={editor} placeholder={placeholder} />
        <style jsx global>{`
          .tiptap-content .ProseMirror {
            line-height: 0.9;
          }
          .tiptap-content .ProseMirror p {
            margin-bottom: 1em;
            line-height: 0.9;
          }
          .tiptap-content .ProseMirror ul li,
          .tiptap-content .ProseMirror ol li {
            margin-bottom: 0.5em;
            line-height: 0.9;
          }
        `}</style>
      </div>
    </div>
  );
}