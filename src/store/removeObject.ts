// import {EditorType} from "./EditorType.ts";

// export function removeObject(editor: EditorType): EditorType {
//     let newSelectedObjId = null
//     const newSlides = editor.presentation.slides.map(slide => {
//         if (slide.id === editor.selection?.selectedSlideId) {
//             const updatedContent = slide.objects?.filter(element => element.id !== editor.selection?.selectedObjId)
//             return {
//                 ...slide,
//                 objects: updatedContent
//             }
//         }
//         return slide
//     })
//     return { 
//         ...editor,
//         presentation: {
//             ...editor.presentation,
//             slides: newSlides,    
//         },
//         selection: {
//             ...editor.selection,
//             selectedObjId: newSelectedObjId,
//         }
//     }
// }

import { EditorType } from "./EditorType.ts";

export function removeObject(editor: EditorType): EditorType {
    const newSlides = editor.presentation.slides.map(slide => {
        if (slide.id === editor.selection?.selectedSlideId) {
            const updatedContent = slide.objects?.filter(
                element => element.id !== editor.selection?.selectedObjId
            ) || [];
            return {
                ...slide,
                objects: updatedContent,
            };
        }
        return slide;
    });

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
        selection: editor.selection
            ? {
                ...editor.selection,
                selectedObjId: null,
            }
            : undefined,
    };
}
