import { EditorType, SelectionType } from "../EditorType"
import { PositionType, SizeType, SlideObject } from "../PresentationType.ts";

enum ActionType {
    ADD_SLIDE = 'addSlide',
    REMOVE_SLIDE = 'removeSlide',
    RENAME_PRESENTATION = 'renamePresentation',
    ADD_OBJECT = 'addObject',
    REMOVE_OBJECT = 'removeObject',
    CHANGE_BACKGROUND = 'changeBackground',
    IMPORT_EDITOR = 'importEditor',
    MOVE_CONTENT = 'updateContentPosition',
    RESIZE_CONTENT = 'updateContentSize',
    REORDER_SLIDES = 'reorderSlides',
    UPDATE_TEXT = 'updateText',

    SET_SELECTION = 'setSelection',
    SET_EDITOR = 'setEditor',
}

type AddSlideAction = {
    type: ActionType.ADD_SLIDE,
}

type RemoveSlideAction = {
    type: ActionType.REMOVE_SLIDE,
}

type RenamePresentationAction = {
    type: ActionType.RENAME_PRESENTATION,
    payload: string,
}

type AddObjectAction = {
    type: ActionType.ADD_OBJECT,
    payload: SlideObject,
}

type RemoveObjectAction = {
    type: ActionType.REMOVE_OBJECT,
}

type ChangeBackgroundAction = {
    type: ActionType.CHANGE_BACKGROUND,
    payload: string,
}

type ImportEditorAction = {
    type: ActionType.IMPORT_EDITOR,
    payload: EditorType,
}

type SetSelectionAction = {
    type: ActionType.SET_SELECTION,
    payload: SelectionType,
}

type SetEditorAction = {
    type: ActionType.SET_EDITOR,
    payload: EditorType,
}

type MoveContentAction = {
    type: ActionType.MOVE_CONTENT,
    payload: { slideId: string; contentId: string; position: PositionType,  }
}

type ResizeContentAction = {
    type: ActionType.RESIZE_CONTENT,
    payload: { slideId: string; contentId: string; size: SizeType }
}    

type ReorderSlidesAction = {
    type: ActionType.REORDER_SLIDES,
    payload: { fromIndex: number, toIndex: number }
}   

type UpdateTextAction = {
    type: ActionType.UPDATE_TEXT,
    payload: { slideId: string, slideObjectId: string, newText: string }
}   

type EditorAction = AddSlideAction | RemoveSlideAction | RenamePresentationAction | AddObjectAction |
    RemoveObjectAction | ChangeBackgroundAction | ImportEditorAction | SetSelectionAction | SetEditorAction | 
    MoveContentAction | ResizeContentAction | ReorderSlidesAction | UpdateTextAction


export {
    ActionType,
    type SetSelectionAction,
    type EditorAction,
    type RenamePresentationAction,
    type AddObjectAction,
    type ChangeBackgroundAction,
    type MoveContentAction,
    type ResizeContentAction,
    type ReorderSlidesAction,
    type UpdateTextAction
}