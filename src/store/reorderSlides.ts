import { EditorType } from "./EditorType";
import { ReorderSlidesAction } from "./redux/actions";

export function reorderSlides(editor: EditorType, action: ReorderSlidesAction): EditorType {
    const { fromIndex, toIndex } = action.payload
    // Проверка наличия презентации и слайдов
    if (!editor.presentation || !editor.presentation.slides) {
        console.warn("No presentation or slides available for reordering.");
        return editor;
    }

    const slides = editor.presentation.slides;

    // Проверка на корректность индексов
    if (fromIndex < 0 || fromIndex >= slides.length || toIndex < 0 || toIndex >= slides.length) {
        console.warn("Invalid slide indices for reordering.");
        return editor;
    }

    // Создаем новый массив слайдов
    const newSlides = [...slides];
    const [movedSlide] = newSlides.splice(fromIndex, 1); // Удаляем слайд с исходного места
    newSlides.splice(toIndex, 0, movedSlide); // Вставляем на новое место

    // Возвращаем обновленное состояние редактора
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
    };
}
