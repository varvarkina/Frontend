// import {EditorType, SelectionType} from "./EditorType.ts";

// function setSelection(editor: EditorType, newSelection: SelectionType): EditorType {
//     return {
//         ...editor,
//         selection: {
//             ...editor.selection, 
//             ...newSelection
//         }
//     }
// }

// export {
//     setSelection,
// }

import {EditorType} from "./EditorType.ts";
import { SetSelectionAction } from "./redux/actions.ts";

function setSelection(editor: EditorType, action: SetSelectionAction): EditorType {
    return {
        ...editor,
        selection: action.payload,
    }
}

export {
    setSelection,
}