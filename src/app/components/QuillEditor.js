import dynamic from "next/dynamic";
import { forwardRef } from "react";
// On change le chemin du CSS
import "react-quill-new/dist/quill.snow.css";

// On change le module importé
const QuillNoSSRWrapper = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] bg-zinc-50 animate-pulse border border-black" />
  ),
});

const QuillEditor = forwardRef((props, ref) => {
  return <QuillNoSSRWrapper {...props} ref={ref} />;
});

QuillEditor.displayName = "QuillEditor";

export default QuillEditor;
