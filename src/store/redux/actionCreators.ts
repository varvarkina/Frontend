import * as PresentationActionCreators from './presentationActionCreators'
import * as SelectionActionCreators from './selectionActionCreators'
import * as EditorActionCreators from './editorActionCreators'

export default {
    ...PresentationActionCreators,
    ...SelectionActionCreators,
    ...EditorActionCreators,
}