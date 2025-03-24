import dynamic from "next/dynamic";
import { forwardRef } from "react";

// Chargement dynamique du module ReactQuill
const QuillNoSSRWrapper = dynamic(() => import("react-quill"), { ssr: false });

// Encapsulation avec forwardRef
const QuillEditor = forwardRef((props, ref) => {
  return <QuillNoSSRWrapper {...props} ref={ref} />;
});

QuillEditor.displayName = "QuillEditor"; // Évite un warning de React

export default QuillEditor;
