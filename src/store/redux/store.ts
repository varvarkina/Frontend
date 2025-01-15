import { legacy_createStore as createStore } from "redux";
import { editorReducer } from "./editorReducer";
import { getEditorFromStorage, setEditor } from "../editor"

const persistedState = getEditorFromStorage(); 
const store = createStore(editorReducer, persistedState); 

store.subscribe(() => {
    setEditor(store.getState());
    console.log("subscribe", store.getState())
});

export {
    store
}