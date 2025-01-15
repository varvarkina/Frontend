import {EditorType} from "./EditorType.ts";
import { ChangeBackgroundAction } from "./redux/actions.ts";

export function changeBackground(editor: EditorType, action: ChangeBackgroundAction): EditorType {
    const updatedSlideCollection = editor.presentation.slides.map(slide => {
        if (slide.id === editor.selection?.selectedSlideId) {
            return {
                ...slide,
                background: action.payload
            }
        }
        return slide
    })

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlideCollection
        }
    }
}