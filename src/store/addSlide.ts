// import {EditorType} from "./EditorType.ts";
// import {nanoid} from 'nanoid';

// export function addSlide(editor: EditorType): EditorType {
//     let newSlideId = nanoid();

//     const newSlide = {
//         id: newSlideId,
//         background: '#FFFFFF',
//         objects: [] 
//     };

//     const slides = [...editor.presentation.slides, newSlide];
//     const selectedSlideId = slides.length === 1 ? newSlideId : editor.selection.selectedSlideId;

//     return {
//         ...editor,
//         presentation: {
//             ...editor.presentation,
//             slides: slides
//         },
//         selection: {
//             selectedSlideId: selectedSlideId 
//         }
//     };
// }

import { EditorType } from "./EditorType";
import { SlideType } from "./PresentationType";
import { createNewSlide } from "./redux/createNewSlide";

function addSlide(editor: EditorType): EditorType {
    const selection = editor.selection
    const newSlide = createNewSlide()
    const slides: SlideType[] = []
    if (selection && (selection.selectedSlideId != null)) {
        for (const slide of editor.presentation.slides) {
            slides.push(slide)
            if (slide.id === selection.selectedSlideId) {
                slides.push(newSlide)
            }
        }
    }
    else {
        slides.push(newSlide)
    }
    return {
        presentation: {
            ...editor.presentation,
            slides: slides,
        },
        selection: {
            selectedSlideId: newSlide.id,
        }
    }
}

export {
    addSlide,
}