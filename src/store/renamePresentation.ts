import {EditorType} from "./EditorType.ts";
import { RenamePresentationAction } from "./redux/actions.ts";

function renamePresentation(editor: EditorType, action: RenamePresentationAction): EditorType {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            title: action.payload,
        }
    }
}

export {
    renamePresentation,
}