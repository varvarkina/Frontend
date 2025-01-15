import {PresentationType} from "./PresentationType.ts";

type SelectionType = {
    selectedSlideId: string | null,
    selectedObjId?: string | null   
}

type EditorType = {
    presentation: PresentationType,
    selection?: SelectionType /*| null*/,
}

export type {
    EditorType,
    SelectionType,
}