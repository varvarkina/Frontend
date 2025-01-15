import { useEffect } from "react";
import { useAppActions } from "../view/hooks/useAppActions";
import { HistoryType } from "../utils/history";
import { useAppSelector } from "../view/hooks/useAppSelector";

type ListenersProps = {
  history: HistoryType;
};

export function GlobalListeners({ history }: ListenersProps) {
  const { setEditor, removeObject } = useAppActions();
  const selectedObjectId = useAppSelector((editor => editor.selection?.selectedObjId)); 

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'z' || e.key === 'я') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        const newEditor = history.undo();
        if (newEditor) {
          setEditor(newEditor);
        }
      }

      if ((e.key === 'y' || e.key === 'н') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        const newEditor = history.redo();
        if (newEditor) {
          setEditor(newEditor);
        }
      }

      if (e.key === "Delete" && selectedObjectId) {
        e.preventDefault();
        removeObject();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [history, setEditor]);

  return null; 
}
