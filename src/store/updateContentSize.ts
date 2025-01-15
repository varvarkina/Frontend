import { EditorType } from "./EditorType";
import { SizeType } from "./PresentationType";
import { ResizeContentAction } from "./redux/actions";

export function updateContentSize(
    editor: EditorType,
    action: ResizeContentAction
): EditorType {
    const { slideId, contentId, size } = action.payload;

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
                                    width: size.width,
                                    height: size.height,
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
