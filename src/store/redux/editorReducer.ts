import { EditorType } from "../EditorType";
import { addSlide } from "../addSlide";
import { setSelection } from "../setSelection";
import { ActionType, EditorAction } from "./actions";
import { defaultEditor } from "../data";
import { removeSlide } from "../removeSlide";
import { renamePresentation } from "../renamePresentation"
import { addObject } from "../addObject"
import { removeObject } from "../removeObject";
import { changeBackground } from "../changeBackground";
import { updateContentPosition } from "../updateContentPosition";
import { updateContentSize } from "../updateContentSize";
import { reorderSlides } from "../reorderSlides";
import { updateTextSlideObject } from "../updateTextSlideObject";

function editorReducer(editor: EditorType = defaultEditor, action: EditorAction): EditorType {
    switch (action.type) {
        case ActionType.ADD_SLIDE:
            return addSlide(editor)
        case ActionType.REMOVE_SLIDE:
            return removeSlide(editor)
        case ActionType.RENAME_PRESENTATION:
            return renamePresentation(editor, action)
        case ActionType.ADD_OBJECT:
            return addObject(editor, action)
        case ActionType.REMOVE_OBJECT:
            return removeObject(editor)
        case ActionType.CHANGE_BACKGROUND:
            return changeBackground(editor, action)
        case ActionType.IMPORT_EDITOR:
            return action.payload
        case ActionType.SET_SELECTION:
            return setSelection(editor, action)
        case ActionType.SET_EDITOR:
            return action.payload
        case ActionType.MOVE_CONTENT:
            return updateContentPosition(editor, action)
        case ActionType.RESIZE_CONTENT:
            return updateContentSize(editor, action)
        case ActionType.REORDER_SLIDES:
            return reorderSlides(editor, action)
        case ActionType.UPDATE_TEXT:
            return updateTextSlideObject(editor, action)
        default:
            return editor
    }
}

export {
    editorReducer,
}