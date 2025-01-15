import {EditorType} from "./EditorType.ts";
import {SlideObject} from "./PresentationType.ts";
import {nanoid} from 'nanoid';
import { AddObjectAction } from "./redux/actions.ts";

export function addObject(editor: EditorType, action: AddObjectAction): EditorType {
    const newId = nanoid();
    const updatedElement = { 
        ...action.payload, 
        id: newId 
    }

    const newSlides = editor.presentation.slides.map(slide => {
        if (slide.id === editor.selection?.selectedSlideId) {
            return {
                ...slide,
                objects: slide.objects ? [...slide.objects, updatedElement] : [updatedElement]
            }
        }
        return slide
    })

    return { 
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,    
        }
    }
}    