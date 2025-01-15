// import {EditorType} from "./EditorType.ts";
// import {TextObjectType} from "./PresentationType.ts";
// import {nanoid} from 'nanoid';

// export function addContent(editor: EditorType, element: TextObjectType): EditorType {
//     const newId = nanoid();
//     const updatedElement = { 
//         ...element, 
//         id: newId 
//     }

//     const newSlides = editor.presentation.slides.map(slide => {
//         if (slide.id === editor.selection.selectedSlideId) {
//             return {
//                 ...slide,
//                 objects: slide.objects ? [...slide.objects, updatedElement] : [updatedElement]
//             }
//         }
//         return slide
//     })

//     return { 
//         ...editor,
//         presentation: {
//             ...editor.presentation,
//             slides: newSlides,    
//         }
//     }
// }    