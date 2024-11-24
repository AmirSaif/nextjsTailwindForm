'use client';
import StarterKit from "@tiptap/starter-kit";
import {
  MenuButtonBold,
  MenuButtonItalic,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditor,
  type RichTextEditorRef,
} from "mui-tiptap";
import { useRef } from "react";

export default function Richtext(){
  const rteRef = useRef<RichTextEditorRef>(null);
  return (<RichTextEditor
    ref={rteRef}
    extensions={[StarterKit]}
    content="" // Initial content for the editor
    renderControls={() => (
      <MenuControlsContainer>
        <MenuSelectHeading />
        <MenuDivider />
        <MenuButtonBold />
        <MenuButtonItalic />
      </MenuControlsContainer>
    )}
  />)
}