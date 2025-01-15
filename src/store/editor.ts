import { ChangeEvent } from 'react';
//import {editor} from './data.ts'
import { EditorType } from './EditorType.ts'
import { ajv, editorSchema } from './editorSchema.ts';

let _editor = getDefaultEditor();
let _handler: Function | null = null

function getEditor() {
    return _editor;
}

export function getEditorFromStorage() {
    const settedEditor = localStorage.getItem('editorState');
    if (settedEditor) {
        try {
            const editorJSON = JSON.parse(settedEditor);
            const validateEditorData = ajv.validate(editorSchema, editorJSON)
            if (!validateEditorData) {
                console.error("Данные из localStorage не прошли валидацию.");
                localStorage.removeItem("editorState");
                return getDefaultEditor();
            }
            console.log("Validation succed")
            _editor = editorJSON;
        } catch (error) {
            console.error("Ошибка при парсинге JSON из localStorage:", error);
            localStorage.removeItem('editorState');
        }
    }
    return _editor || getDefaultEditor();
}

export function getDefaultEditor(): EditorType {
    return {
        presentation: {
            title: "New Presentation",
            slides: [],
        },
        selection: {
            selectedSlideId: null,
            selectedObjId: null,
        },
    };
}

export function setEditor(newEditor: EditorType) {
    const currentSize = JSON.stringify(localStorage).length;
    const maxSize = 5 * 1024 * 1024; // 5MB limit for localStorage
    if (currentSize >= maxSize || JSON.stringify(newEditor).length >= maxSize) {
        console.warn("LocalStorage is full.");
        return;
    }
    _editor = newEditor
    localStorage.setItem('editorState', JSON.stringify(_editor))
    if (_handler) {
        console.log('_handler')
        _handler()
    }
}

function dispatch(modifyFn: Function, payload?: Object): void {
    const newEditor = modifyFn(_editor, payload)
    setEditor(newEditor)
}

function addEditorChangeHandler(handler: Function): void {
    console.log('addEditorChangeHandler', handler)
    _handler = handler;
}

_editor = getEditorFromStorage();

export {
    getEditor,
    dispatch,
    addEditorChangeHandler,
}