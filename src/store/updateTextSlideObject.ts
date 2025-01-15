import { EditorType } from './EditorType'; 
import { TextObjectType } from './PresentationType';
import { UpdateTextAction } from "./redux/actions";

function updateTextSlideObject(editor: EditorType, action: UpdateTextAction): EditorType {
    const updatedPresentation = { ...editor.presentation };
    const {slideId, slideObjectId, newText} = action.payload
    const slideIndex = updatedPresentation.slides.findIndex((slide: { id: string; }) => slide.id === slideId);

    if (slideIndex === -1) {
        console.error(`Слайд с ID ${slideId} не найден.`);
        return editor;
    }

    const slide = updatedPresentation.slides[slideIndex];
    const objectIndex = slide.objects.findIndex((obj: { id: string; }) => obj.id === slideObjectId);

    if (objectIndex === -1) {
        console.error(`Объект с ID ${slideObjectId} не найден на слайде ${slideId}.`);
        return editor; 
    }

    const slideObject = slide.objects[objectIndex];
    
    if (slideObject.type === 'text') {
        const updatedTextObject: TextObjectType = {
            ...slideObject,
            text: newText,
        };
        const updatedObjects = [
            ...slide.objects.slice(0, objectIndex),
            updatedTextObject,
            ...slide.objects.slice(objectIndex + 1),
        ];

        updatedPresentation.slides[slideIndex] = {
            ...slide,
            objects: updatedObjects,
        };

        return {
            ...editor,
            presentation: updatedPresentation,
        };
    } else {
        console.error(`Объект с ID ${slideObjectId} не является текстовым объектом.`);
        return editor; 
    }
}

export { updateTextSlideObject };
