import { EditorType } from "../EditorType";
import { ActionType } from "./actions";

function setEditor(newEditor: EditorType) {
    return {
        type: ActionType.SET_EDITOR,
        payload: newEditor,
    }
}

function importEditor(newEditor: EditorType) {
    return {
        type: ActionType.IMPORT_EDITOR,
        payload: newEditor,
    };
}

export {
    setEditor, 
    importEditor
}