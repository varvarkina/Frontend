import { ActionType } from "./actions.ts"
import { PositionType, SizeType, SlideObject } from "../PresentationType.ts"

export function addSlide() {
    return {
        type: ActionType.ADD_SLIDE,
    }
}

export function removeSlide() {
    return {
        type: ActionType.REMOVE_SLIDE,
    }
}

export function renamePresentation(newTitle: string) {
    return {
        type: ActionType.RENAME_PRESENTATION,
        payload: newTitle,
    }
}

export function addObject(newObject: SlideObject) {
    return {
        type: ActionType.ADD_OBJECT,
        payload: newObject,
    }
}

export function removeObject() {
    return {
        type: ActionType.REMOVE_OBJECT,
    }
}

export function changeBackground(newBackground: string) {
    return {
        type: ActionType.CHANGE_BACKGROUND,
        payload: newBackground,
    }
}

export function updateContentPosition(slideId: string, contentId: string, position: PositionType) {
    return {
        type: ActionType.MOVE_CONTENT,
        payload: { slideId, contentId, position }
    }
}

export function updateContentSize(slideId: string, contentId: string, size: SizeType) {
    return {
        type: ActionType.RESIZE_CONTENT,
        payload: { slideId, contentId, size }
    }
}

export function reorderSlides(fromIndex: number, toIndex: number) {
    return {
        type: ActionType.REORDER_SLIDES,
        payload: { fromIndex, toIndex }
    }
}

export function updateText(slideId: string, slideObjectId: string, newText: string) {
    return {
        type: ActionType.UPDATE_TEXT,
        payload: { slideId, slideObjectId, newText }
    }
}