import { EditorType } from "./EditorType";
import { MoveContentAction } from "./redux/actions";

export function updateContentPosition(
    editor: EditorType,
    action: MoveContentAction,
): EditorType {
    const { slideId, contentId, position } = action.payload;

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(slide => {
                if (slide.id === slideId) {
                    return {
                        ...slide,
                        objects: slide.objects.map(object => {
                            if (object.id === contentId) {
                                return {
                                    ...object,
                                    x: position.x,
                                    y: position.y,
                                };
                            }
                            return object;
                        }),
                    };
                }
                return slide;
            }),
        },
    };
}
